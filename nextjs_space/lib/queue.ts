import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Reuse Redis connection
const connection = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
});

export const emailQueueName = 'email-sending';

export const emailQueue = new Queue(emailQueueName, {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
        removeOnComplete: {
            age: 7 * 24 * 3600, // Keep for 7 days
            count: 1000,
        },
        removeOnFail: {
            age: 7 * 24 * 3600, // Keep for 7 days
        },
    },
});

export const emailQueueEvents = new QueueEvents(emailQueueName, { connection });
