import React from 'react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            This Cookie Policy explains how HealingBuds uses cookies and similar technologies when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Are Cookies?</h2>
          <p className="text-gray-700 mb-6">
            Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Types of Cookies We Use</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Essential Cookies</h3>
          <p className="text-gray-700 mb-4">
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Analytics Cookies</h3>
          <p className="text-gray-700 mb-4">
            We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Preference Cookies</h3>
          <p className="text-gray-700 mb-4">
            These cookies allow our website to remember your preferences, such as language settings or theme preferences.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Managing Cookies</h2>
          <p className="text-gray-700 mb-6">
            You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience and some features of the website may no longer be fully functional.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Cookies</h2>
          <p className="text-gray-700 mb-6">
            We may use third-party services that also set cookies on your device. These third parties have their own privacy policies and cookie policies.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Updates to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Cookie Policy from time to time. We encourage you to review this page periodically for any changes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about our Cookie Policy, please contact us at info@healingbuds.pt
          </p>
        </div>
      </div>
    </div>
  );
}
