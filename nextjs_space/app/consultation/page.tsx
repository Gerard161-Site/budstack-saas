
import { ConsultationForm } from '@/components/consultation/consultation-form';

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Cannabis Consultation
          </h1>
          <p className="text-lg text-gray-600">
            Complete this questionnaire to begin your journey towards medical cannabis treatment
          </p>
        </div>
        
        <ConsultationForm />
      </div>
    </div>
  );
}
