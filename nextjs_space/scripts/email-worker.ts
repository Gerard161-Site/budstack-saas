
import { Worker, Job } from 'bullmq';
import nodemailer from 'nodemailer';
import Redis from 'ioredis';
import { prisma as db } from '../lib/db';
import { decrypt } from '../lib/encryption';
import { emailQueueName } from '../lib/queue';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

console.log('Starting Email Worker...');

const worker = new Worker(emailQueueName, async (job: Job) => {
    console.log(`Processing job ${job.id} for tenant ${job.data.tenantId}`);
    const { tenantId, to, subject, html, templateName, from } = job.data;

    try {
        // 1. Fetch Tenant SMTP Config
        const tenantConfig = await db.tenantSmtpConfig.findUnique({
            where: { tenantId },
        });

        let transporter;
        let fromAddress = from;

        if (tenantConfig) {
            // Use Tenant SMTP
            const password = decrypt(tenantConfig.password);
            transporter = nodemailer.createTransport({
                host: tenantConfig.host,
                port: tenantConfig.port,
                secure: tenantConfig.secure,
                auth: {
                    user: tenantConfig.username,
                    pass: password,
                },
            });

            // Default from address if not provided
            if (!fromAddress) {
                fromAddress = tenantConfig.fromEmail
                    ? `"${tenantConfig.fromName || tenantConfig.fromEmail}" <${tenantConfig.fromEmail}>`
                    : tenantConfig.username;
            }
        } else {
            // Use System Default (Resend/SMTP via Env)
            // Check if we use Resend via SMTP or direct API? 
            // For uniformity with nodemailer, let's use SMTP for system too if possible, OR fallback to Resend API.
            // But here we want to use nodemailer for everything to be consistent in this worker.
            // If system config is missing, fail? Or use process.env.EMAIL_SERVER?

            if (process.env.EMAIL_SERVER) {
                // Expecting formatting like: smtp://user:pass@host:port
                // Or just standard env vars for host/port/user/pass
                transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);
            } else {
                throw new Error('No system email configuration found');
            }

            if (!fromAddress) {
                fromAddress = process.env.EMAIL_FROM || 'noreply@budstack.to';
            }
        }

        // 2. Send Email
        const info = await transporter.sendMail({
            from: fromAddress,
            to,
            subject,
            html,
        });

        console.log(`Email sent: ${info.messageId}`);

        // 3. Update Log
        // Find the log created by MailerService (if we had the ID, but we didn't pass it back easily without waiting)
        // Or just create a new log entry if we didn't wait. 
        // Plan: MailerService created a "QUEUED" log. We should probably update it if we had the ID. 
        // Since we didn't pass ID, let's look it up or create a new "SENT" entry.
        // Better: Update the *latest* QUEUED log for this recipient/template? No, race conditions.
        // Simplest: Create a *new* log entry for "SENT" or update status if we can find it.
        // Let's just create a new entry for now or try to update if we add ID to job data later.
        // For now: Create a new entry as "SENT" isn't strictly an update of the "QUEUED" one without an ID reference.
        // Actually, in MailerService we didn't wait for DB. 
        // Let's just write a "SENT" log. The "QUEUED" log remains as audit trail that it was requested.

        // WAIT: Duplicate logs? 
        // Start -> Queued Log. 
        // Finish -> Sent Log.
        // This is fine.

        await db.emailLog.create({
            data: {
                tenantId,
                recipient: Array.isArray(to) ? to.join(',') : to,
                subject,
                templateName,
                status: 'SENT',
                metadata: { messageId: info.messageId, provider: tenantConfig ? 'TENANT_SMTP' : 'SYSTEM' },
                sentAt: new Date(),
            }
        });

        return { success: true, messageId: info.messageId };

    } catch (error: any) {
        console.error(`Job ${job.id} failed:`, error);

        // Log failure
        await db.emailLog.create({
            data: {
                tenantId,
                recipient: Array.isArray(to) ? to.join(',') : to,
                subject,
                templateName,
                status: 'FAILED',
                error: error.message,
                metadata: { stack: error.stack },
            }
        });

        throw error;
    }
}, {
    connection: new Redis(REDIS_URL, { maxRetriesPerRequest: null }) as any,
});

worker.on('completed', job => {
    console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} has failed with ${err.message}`);
});
