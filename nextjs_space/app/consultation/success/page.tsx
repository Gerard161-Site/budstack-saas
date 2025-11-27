
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function ConsultationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="h-20 w-20 text-emerald-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Consultation Submitted Successfully!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for completing your medical cannabis consultation questionnaire.
            </p>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                What happens next?
              </h2>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-emerald-600 text-white text-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span>Your information has been securely submitted to Dr. Green for review</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-emerald-600 text-white text-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span>A medical professional will review your application within 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-emerald-600 text-white text-center mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span>You will receive an email confirmation with next steps</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-emerald-600 text-white text-center mr-3 mt-0.5 flex-shrink-0">4</span>
                  <span>Once approved, you can browse and order from our medical cannabis catalog</span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
