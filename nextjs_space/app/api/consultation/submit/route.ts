import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAuditLog, AUDIT_ACTIONS, getClientInfo } from '@/lib/audit-log';
import { triggerWebhook, WEBHOOK_EVENTS } from '@/lib/webhook';
import { getTenantDrGreenConfig } from '@/lib/tenant-config';
import { getPlatformConfig } from '@/lib/platform-config';
import { prisma } from "@/lib/db";

/**
 * Generate ECDSA signature for API request (using Node.js crypto)
 */
function generateSignature(payload: string, secretKey: string): string {
  try {
    const crypto = require('crypto');

    // Decode the base64 private key - Handle both raw and base64 encoded keys if needed, 
    // but assuming standard base64 from config.
    const privateKeyPEM = Buffer.from(secretKey, 'base64').toString('utf-8');

    // Sign the payload with SHA256
    const sign = crypto.createSign('SHA256');
    sign.update(payload);
    sign.end();

    // Generate signature and return as base64
    const signature = sign.sign(privateKeyPEM);
    return signature.toString('base64');
  } catch (error) {
    console.error('Error generating signature:', error);
    throw new Error('Failed to generate API signature');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Save to database first
    const questionnaire = await prisma.consultationQuestionnaire.create({
      data: {
        tenantId: body.tenantId || null,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneCode: body.phoneCode,
        phoneNumber: body.phoneNumber,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : new Date(),
        gender: body.gender,
        password: hashedPassword,

        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country,
        countryCode: body.countryCode,

        businessType: body.businessType,
        businessName: body.businessName,
        businessAddress1: body.businessAddress1,
        businessAddress2: body.businessAddress2,
        businessCity: body.businessCity,
        businessState: body.businessState,
        businessPostalCode: body.businessPostalCode,
        businessCountry: body.businessCountry,
        businessCountryCode: body.businessCountryCode,

        medicalConditions: body.medicalConditions,
        otherCondition: body.otherCondition,
        prescribedMedications: body.prescribedMedications,
        prescribedSupplements: body.prescribedSupplements,

        hasHeartProblems: body.hasHeartProblems,
        hasCancerTreatment: body.hasCancerTreatment,
        hasImmunosuppressants: body.hasImmunosuppressants,
        hasLiverDisease: body.hasLiverDisease,
        hasPsychiatricHistory: body.hasPsychiatricHistory,

        hasAlcoholAbuse: body.hasAlcoholAbuse,
        hasDrugServices: body.hasDrugServices,
        alcoholUnitsPerWeek: body.alcoholUnitsPerWeek,
        cannabisReducesMeds: body.cannabisReducesMeds,
        cannabisFrequency: body.cannabisFrequency,
        cannabisAmountPerDay: body.cannabisAmountPerDay,
      },
    });

    // Determine Tenant and Config
    // If no tenantId, we cannot submit to Dr. Green as we need tenant credentials
    if (!body.tenantId) {
      console.warn('Consultation submitted without Tenant ID, skipping Dr. Green submission.');
      return NextResponse.json({
        success: true,
        message: 'Consultation saved (skipped Dr. Green submission due to missing Tenant ID)',
        questionnaireId: questionnaire.id,
      });
    }

    try {
      // Fetch Configuration dynamically
      // 1. Platform Config for API URL
      const platformConfig = await getPlatformConfig();
      const drGreenApiUrl = platformConfig.drGreenApiUrl || 'https://api.drgreennft.com/api/v1';

      // 2. Tenant Credentials
      const { apiKey, secretKey } = await getTenantDrGreenConfig(body.tenantId);

      // Format date for Dr. Green API (YYYY-MM-DD)
      const dobFormatted = body.dateOfBirth
        ? new Date(body.dateOfBirth).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      // Prepare Dr. Green API payload
      const drGreenPayload = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneCode: body.phoneCode,
        phoneNumber: body.phoneNumber,
        contactNumber: `${body.phoneCode}${body.phoneNumber}`,

        shipping: {
          address1: body.addressLine1,
          address2: body.addressLine2 || '',
          landmark: '',
          city: body.city,
          state: body.state,
          postalCode: body.postalCode,
          country: body.country,
          countryCode: body.countryCode,
        },

        ...(body.businessType && body.businessName ? {
          clientBusiness: {
            businessType: body.businessType,
            name: body.businessName,
            address1: body.businessAddress1 || '',
            address2: body.businessAddress2 || '',
            city: body.businessCity || '',
            state: body.businessState || '',
            postalCode: body.businessPostalCode || '',
            country: body.businessCountry || '',
            countryCode: body.businessCountryCode || '',
          },
        } : {}),

        medicalRecord: {
          dob: dobFormatted,
          gender: body.gender,
          medicalConditions: body.medicalConditions || [],
          ...(body.otherCondition ? { otherMedicalCondition: body.otherCondition } : {}),
          otherMedicalTreatments: '',
          prescribedSupplements: body.prescribedSupplements || '',

          medicalHistory1: body.hasHeartProblems ? 'yes' : 'no',
          medicalHistory2: body.hasCancerTreatment ? 'yes' : 'no',
          medicalHistory3: body.hasImmunosuppressants ? 'yes' : 'no',
          medicalHistory4: body.hasLiverDisease ? 'yes' : 'no',
          medicalHistory5: body.hasPsychiatricHistory ? 'yes' : 'no',
          medicalHistory6: body.hasAlcoholAbuse ? 'yes' : 'no',
          medicalHistory7: body.hasDrugServices ? 'yes' : 'no',
          medicalHistory8: body.alcoholUnitsPerWeek || '0',
          medicalHistory9: body.cannabisReducesMeds ? 'yes' : 'no',
          medicalHistory10: body.cannabisFrequency ? [body.cannabisFrequency] : ['never'],
        },
      };

      // Submit to Dr. Green API
      const payloadStr = JSON.stringify(drGreenPayload);
      console.log('Dr. Green API Request:', {
        url: `${drGreenApiUrl}/dapp/clients`,
        payload: drGreenPayload,
        hasApiKey: !!apiKey,
        hasSecretKey: !!secretKey
      });

      const signature = generateSignature(payloadStr, secretKey);

      const response = await fetch(`${drGreenApiUrl}/dapp/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-apikey': apiKey,
          'x-auth-signature': signature,
        },
        body: payloadStr,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        console.error('Dr. Green API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData,
          headers: Object.fromEntries(response.headers.entries())
        });

        throw new Error(
          `Dr.Green API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
        );
      }

      const drGreenResponse = await response.json();
      console.log('Dr. Green API Success:', drGreenResponse);

      // Extract KYC link and client ID from response
      // Handle potentially different response structures
      const clientId = drGreenResponse.data?.id || drGreenResponse.id;
      const kycLink = drGreenResponse.data?.kycLink || drGreenResponse.kycLink || null;

      // Update questionnaire with Dr. Green client ID and KYC link
      await prisma.consultationQuestionnaire.update({
        where: { id: questionnaire.id },
        data: {
          submittedToDrGreen: true,
          drGreenClientId: clientId,
          kycLink: kycLink,
          isKycVerified: false,
          adminApproval: 'PENDING',
        },
      });

      // Audit log for successful consultation submission
      const clientInfo = getClientInfo(request.headers);
      await createAuditLog({
        action: AUDIT_ACTIONS.CONSULTATION_SUBMITTED,
        entityType: 'ConsultationQuestionnaire',
        entityId: questionnaire.id,
        userEmail: body.email,
        tenantId: body.tenantId || undefined,
        metadata: {
          drGreenClientId: clientId,
          firstName: body.firstName,
          lastName: body.lastName,
        },
        ...clientInfo,
      });

      // Trigger webhook for consultation submitted
      await triggerWebhook({
        event: WEBHOOK_EVENTS.CONSULTATION_SUBMITTED,
        tenantId: body.tenantId || undefined,
        data: {
          questionnaireId: questionnaire.id,
          drGreenClientId: clientId,
          customerEmail: body.email,
          customerName: `${body.firstName} ${body.lastName}`,
          medicalConditions: body.medicalConditions || [],
          submittedAt: new Date().toISOString(),
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Consultation submitted successfully',
        questionnaireId: questionnaire.id,
        drGreenClientId: clientId,
        kycLink: kycLink,
        adminApproval: 'PENDING',
      });

    } catch (drGreenError: any) {
      console.error('Dr. Green API Error:', drGreenError);

      // Update questionnaire with error
      await prisma.consultationQuestionnaire.update({
        where: { id: questionnaire.id },
        data: {
          submittedToDrGreen: false,
          submissionError: drGreenError.message,
        },
      });

      // We return a 200 OK because the *questionnaire* was saved, but the external sync failed.
      // Or we can return 500. Logic here returns 500 to alert frontend.
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to submit to Dr. Green API',
          details: drGreenError.message,
          questionnaireId: questionnaire.id,
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
