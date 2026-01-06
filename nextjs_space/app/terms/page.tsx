import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms and conditions for using our services',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

            <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-muted-foreground mb-6">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using our service, you accept and agree to be bound
                        by these Terms of Service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
                    <p>
                        You must be of legal age and have a valid medical prescription to
                        access our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Account Responsibilities</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account
                        and all activities under your account.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Prohibited Uses</h2>
                    <p>
                        You may not use our service for any unlawful purpose or in violation
                        of applicable regulations.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
                    <p>
                        We reserve the right to terminate or suspend access to our service
                        for violations of these terms.
                    </p>
                </section>
            </div>
        </div>
    );
}
