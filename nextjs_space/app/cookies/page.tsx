import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Information about cookies and how we use them',
};

export default function CookiesPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

            <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-muted-foreground mb-6">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
                    <p>
                        Cookies are small text files stored on your device when you visit our website.
                        They help us provide you with a better experience.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                    <ul>
                        <li>Essential cookies for site functionality</li>
                        <li>Analytics cookies to understand how you use our site</li>
                        <li>Preference cookies to remember your settings</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                    <p>
                        You can control and delete cookies through your browser settings.
                        Note that disabling cookies may affect site functionality.
                    </p>
                </section>
            </div>
        </div>
    );
}
