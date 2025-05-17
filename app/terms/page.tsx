import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <p className="samarkan text-4xl font-bold mb-8 text-center text-[#f9dd9c]">
          Terms and Conditions
        </p>
        
        <Card className="bg-[#0a0a0a] border border-gray-700 shadow-lg mb-8">
          <CardContent className="p-6">
            <p className="text-gray-400 mb-6">Effective Date: {currentDate}</p>
            
            <p className="mb-6">
              Welcome to 8th Mile, the official annual fest of RV College of Engineering (RVCE). 
              By accessing or using our website to purchase event passes, you agree to be bound 
              by the following Terms and Conditions:
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">1. General</p>
                <p>This website is operated by the 8th Mile Organizing Committee, RV College of Engineering.</p>
                <p>The website is intended solely for the purpose of selling entry passes to the 8th Mile fest and providing information about its events.</p>
              </div>
              
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">2. Eligibility</p>
                <p>By using this site, you confirm that you are legally capable of entering into a binding contract.</p>
                <p>Passes are intended for students and visitors who wish to participate in 8th Mile events.</p>
              </div>
              
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">3. Pass Purchase</p>
                <p>All passes are digital and delivered via email or QR code after successful payment.</p>
                <p>Payment can be made via Razorpay using UPI, Credit/Debit Cards, Netbanking, or Wallets.</p>
                <p>By making a payment, you acknowledge that all sales are final and non-refundable as outlined in our Refund Policy.</p>
              </div>
              
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">4. Event Details</p>
                <p>The schedule, pricing, or availability of events and passes may be subject to change without notice.</p>
                <p>Entry is permitted only with a valid pass and college ID or government-issued ID.</p>
                <p>The organizers reserve the right to refuse entry or ejection from the venue at their sole discretion.</p>
              </div>
              
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">5. User Conduct</p>
                <p>Users must not engage in illegal or unauthorized use of the website.</p>
                <p>Misuse of the platform, such as fraudulent payments or attempts to access restricted areas, will result in termination of access.</p>
                <p>Any attempt to disrupt the functioning of the website is strictly prohibited.</p>
              </div>
              
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">6. Intellectual Property</p>
                <p>All content on this website including logos, images, text, and design is the property of 8th Mile, RVCE.</p>
                <p>Unauthorized use, reproduction, or distribution of any content from this website is strictly prohibited.</p>
              </div>

              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">7. Privacy</p>
                <p>We collect and process personal information in accordance with our Privacy Policy.</p>
                <p>By using this website, you consent to the collection and use of your information as described in our Privacy Policy.</p>
              </div>
              
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">8. Limitation of Liability</p>
                <p>The organizers are not liable for any loss, damage, or injury during the fest.</p>
                <p>The website is provided "as is" without warranties of any kind.</p>
                <p>We do not guarantee uninterrupted or error-free operation of the website.</p>
              </div>

              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">9. Governing Law</p>
                <p>These Terms and Conditions are governed by the laws of India.</p>
                <p>Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.</p>
              </div>

              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">10. Amendments</p>
                <p>We reserve the right to modify these Terms and Conditions at any time without prior notice.</p>
                <p>Continued use of the website after any modifications constitutes acceptance of the updated terms.</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-[#f9dd9c]">For any queries, contact us at:</p>
              <p className="text-gray-400">events_8thmile@rvce.edu.in</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}