import React from 'react'

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. General Terms</h2>
          <p className="mb-4">
            By accessing and using SkillMatchers, you agree to be bound by these terms and conditions. If you disagree with any part of these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Account</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You must provide accurate and up-to-date information</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must not share your account with others</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Usage Rules</h2>
          <p className="mb-4">When using SkillMatchers, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Not post illegal or harmful content</li>
            <li>Not spam or harass other users</li>
            <li>Not collect user information without authorization</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Content and Intellectual Property</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>All content on SkillMatchers is our property</li>
            <li>You retain ownership of content you post</li>
            <li>You grant us a license to use your posted content</li>
            <li>We reserve the right to remove any content that violates these terms</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="mb-4">
            SkillMatchers is provided "as is" and we make no warranty that the service will be uninterrupted or error-free. We are not liable for any damages arising from the use of our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these terms of service, please contact us:
          </p>
          <ul className="list-none mb-4">
            <li>Email: legal@skillmatchers.com</li>
            <li>Phone: (84) 123-456-789</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 