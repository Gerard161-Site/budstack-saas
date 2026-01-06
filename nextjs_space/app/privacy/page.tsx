import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Our privacy policy and data protection practices',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-muted-foreground mb-6">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, including when you create an account,
                        place an order, or contact us for support.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services,
                        process your orders, and communicate with you.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your
                        personal data against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal information.
                        Contact us to exercise these rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
                    <p>
                        We use cookies and similar technologies to enhance your browsing experience
                        and analyze site traffic.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us through
                        our support channels.
                    </p>
                </section>
            </div>
        </div>
    );
}
