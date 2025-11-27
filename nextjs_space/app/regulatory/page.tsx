import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegulatoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Regulatory Compliance
          </h1>
          <p className="text-xl text-gray-600">
            Understanding Portugal's Medical Cannabis Framework
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>INFARMED Regulation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                INFARMED (National Authority of Medicines and Health Products) is the Portuguese regulatory authority responsible for overseeing the medical cannabis program. All medical cannabis prescriptions and products must be approved by INFARMED to ensure safety and quality standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EU-GMP Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                All cannabis products we recommend are certified under EU-GMP (Good Manufacturing Practice) standards, ensuring the highest quality pharmaceutical-grade medical cannabis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legal Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Medical cannabis was legalized in Portugal in 2018. The program allows licensed doctors to prescribe cannabis-based medications for specific medical conditions when conventional treatments have proven insufficient.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Prescriptions must be issued by registered medical practitioners</li>
                <li>Products must be purchased from licensed pharmacies</li>
                <li>Patients must renew prescriptions as specified by their doctor</li>
                <li>Quality control and safety monitoring by INFARMED</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                HealingBuds operates in full compliance with Portuguese law. We prioritize patient safety through rigorous medical evaluations, ongoing monitoring, and adherence to all regulatory requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
