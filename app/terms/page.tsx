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
        <h1 className="samarkan text-4xl font-bold mb-8 text-center text-[#f9dd9c]">
          Terms and Conditions
        </h1>
        
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
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">1. General</h2>
                <p>This website is operated by the 8th Mile Organizing Committee, RVCE.</p>
                <p>The website is intended solely for the purpose of selling entry passes to the 8th Mile fest and providing information about its events.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">2. Eligibility</h2>
                <p>By using this site, you confirm that you are legally capable of entering into a binding contract.</p>
                <p>Passes are intended for students and visitors who wish to participate in 8th Mile events.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">3. Pass Purchase</h2>
                <p>All passes are digital and delivered via email or QR code after successful payment.</p>
                <p>Payment can be made via Razorpay using UPI, Credit/Debit Cards, Netbanking, or Wallets.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">4. Event Details</h2>
                <p>The schedule, pricing, or availability of events and passes may be subject to change without notice.</p>
                <p>Entry is permitted only with a valid pass and college ID or government-issued ID.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">5. User Conduct</h2>
                <p>Users must not engage in illegal or unauthorized use of the website.</p>
                <p>Misuse of the platform, such as fraudulent payments or attempts to access restricted areas, will result in termination of access.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">6. Limitation of Liability</h2>
                <p>The organizers are not liable for any loss, damage, or injury during the fest.</p>
                <p>The website is provided &quot;as is&quot; without warranties of any kind.</p>
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