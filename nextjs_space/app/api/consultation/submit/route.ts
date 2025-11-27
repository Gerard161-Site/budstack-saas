
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createAuditLog, AUDIT_ACTIONS, getClientInfo } from '@/lib/audit-log';
import { triggerWebhook, WEBHOOK_EVENTS } from '@/lib/webhook';

const prisma = new PrismaClient();

// Dr. Green API Configuration
const API_URL = process.env.DOCTOR_GREEN_API_URL || 'https://stage-api.drgreennft.com/api/v1';
const API_KEY = process.env.DOCTOR_GREEN_API_KEY || '';
const SECRET_KEY = process.env.DOCTOR_GREEN_SECRET_KEY || '';

/**
 * Generate ECDSA signature for API request (using Node.js crypto)
 */
function generateSignature(payload: string): string {
  try {
    const crypto = require('crypto');
    
    // Decode the base64 private key
    const privateKeyPEM = Buffer.from(SECRET_KEY, 'base64').toString('utf-8');
    
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
    try {
      const payload = JSON.stringify(drGreenPayload);
      console.log('Dr. Green API Request:', {
        url: `${API_URL}/dapp/clients`,
        payload: drGreenPayload,
        hasApiKey: !!API_KEY,
        hasSecretKey: !!SECRET_KEY
      });
      
      const signature = generateSignature(payload);

      const response = await fetch(`${API_URL}/dapp/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-apikey': API_KEY,
          'x-auth-signature': signature,
        },
        body: payload,
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
          `Dr. Green API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
        );
      }

      const drGreenResponse = await response.json();
      console.log('Dr. Green API Success:', drGreenResponse);

      // Update questionnaire with Dr. Green client ID
      await prisma.consultationQuestionnaire.update({
        where: { id: questionnaire.id },
        data: {
          submittedToDrGreen: true,
          drGreenClientId: drGreenResponse.data?.id || drGreenResponse.id,
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
          drGreenClientId: drGreenResponse.data?.id || drGreenResponse.id,
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
          drGreenClientId: drGreenResponse.data?.id || drGreenResponse.id,
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
        drGreenClientId: drGreenResponse.data?.id || drGreenResponse.id,
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
