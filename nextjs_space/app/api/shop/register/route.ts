import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@/lib/doctor-green-api';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { personal, address, medicalRecord } = body;

    // Validate required fields
    if (!personal || !address || !medicalRecord) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create client in Dr. Green system
    const result = await createClient({
      firstName: personal.firstName,
      lastName: personal.lastName,
      email: personal.email,
      phone: personal.phone,
      dateOfBirth: personal.dateOfBirth,
      address: {
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      },
      medicalRecord: {
        conditions: medicalRecord.conditions,
        currentMedications: medicalRecord.currentMedications,
        allergies: medicalRecord.allergies,
        previousCannabisUse: medicalRecord.previousCannabisUse,
        doctorApproval: medicalRecord.doctorApproval,
      },
    });

    // Update user with additional info
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: `${personal.firstName} ${personal.lastName}`,
      },
    });

    return NextResponse.json({
      success: true,
      clientId: result.clientId,
      kycLink: result.kycLink,
    });
  } catch (error: any) {
    console.error('Patient registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to register patient' },
      { status: 500 }
    );
  }
}
