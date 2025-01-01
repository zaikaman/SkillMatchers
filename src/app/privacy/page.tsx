import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            When you use SkillMatchers, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal information (name, email, phone number)</li>
            <li>Professional information and skills</li>
            <li>Login information and website activity</li>
            <li>Data about your device and browser</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and improve our services</li>
            <li>Connect you with suitable opportunities</li>
            <li>Send important notifications and updates</li>
            <li>Analyze and enhance user experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Information Security</h2>
          <p className="mb-4">
            We are committed to protecting your information by:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Using advanced security measures</li>
            <li>Limiting access to personal information</li>
            <li>Regularly updating security measures</li>
            <li>Complying with data protection regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Rights</h2>
          <p className="mb-4">
            You have the following rights regarding your data:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Right to access and view personal information</li>
            <li>Right to request correction of inaccurate information</li>
            <li>Right to request deletion of information</li>
            <li>Right to object to information processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our privacy policy, please contact us:
          </p>
          <ul className="list-none mb-4">
            <li>Email: privacy@skillmatchers.com</li>
            <li>Phone: (84) 123-456-789</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 