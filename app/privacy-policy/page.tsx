import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="samarkan text-4xl font-bold mb-8 text-center text-[#f9dd9c]">
          Privacy Policy
        </h1>
        
        <Card className="bg-[#0a0a0a] border border-gray-700 shadow-lg">
          <CardContent className="p-6">
            <p className="text-gray-400 mb-6">Effective Date: {currentDate}</p>
            
            <p className="mb-6">
              This Privacy Policy describes how 8th Mile, the official annual fest of RV College of Engineering, collects, uses, and shares your personal information when you use our website or register for our events. By using this website, you agree to the collection and use of information in accordance with this policy.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">1. Information We Collect</h2>
                <p>We collect the following types of information:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>Personal Identification Information: Name, email address, phone number, and college/institution name when you register for events</li>
                  <li>Payment Information: We do not store your payment card details. All payment processing is conducted securely through our payment provider, Razorpay</li>
                  <li>Team Information: Names of team members if registering for team events</li>
                  <li>Usage Data: Information on how you access and use our website, including your IP address, browser type, and device information</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">2. How We Use Your Information</h2>
                <p>We use the collected information for various purposes:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>To process event registrations and issue digital passes</li>
                  <li>To verify your identity during event check-in</li>
                  <li>To communicate with you regarding your registration or event updates</li>
                  <li>To improve our website and services</li>
                  <li>To send you promotional content about future events (you can opt out)</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">3. Information Sharing and Disclosure</h2>
                <p>We may share your information with:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>Event organizers and volunteers for event management purposes</li>
                  <li>Service providers who assist us in operating our website and conducting our business</li>
                  <li>Law enforcement agencies when required by law</li>
                </ul>
                <p className="mt-2">We do not sell or rent your personal information to third parties for marketing purposes.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">4. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">5. Third-Party Services</h2>
                <p>Our website uses third-party services such as:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>Razorpay for payment processing</li>
                  <li>Email service providers for communication</li>
                </ul>
                <p className="mt-2">These third parties have their own privacy policies, and we recommend reviewing their policies as well.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal obligations)</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">7. Cookies and Tracking</h2>
                <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can set your browser to refuse cookies, but some features of our website may not function properly.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">8. Changes to This Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at the email address provided below.</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-[#f9dd9c]">For privacy-related inquiries, contact us at:</p>
              <p className="text-gray-400">events_8thmile@rvce.edu.in</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}