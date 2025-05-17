import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function RefundPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="samarkan text-4xl font-bold mb-8 text-center text-[#f9dd9c]">
          Cancellation and Refund Policy
        </h1>
        
        <Card className="bg-[#0a0a0a] border border-gray-700 shadow-lg">
          <CardContent className="p-6">
            <p className="text-gray-400 mb-6">Effective Date: {currentDate}</p>
            
            <p className="mb-6">
              This Cancellation and Refund Policy outlines the terms regarding cancellations and refunds for passes purchased for 8th Mile, the official annual fest of RV College of Engineering. By purchasing passes through our website, you acknowledge and agree to the following terms:
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">1. No Cancellation</h2>
                <p>All purchases made for 8th Mile event passes are final. Once a pass is booked, it cannot be canceled.</p>
                <p>We do not provide any option to cancel your registration after completing the payment process.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">2. No Refund</h2>
                <p>We maintain a strict no-refund policy. We do not offer any refunds, partial or full, under any circumstances, including but not limited to:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>Change of mind</li>
                  <li>Inability to attend the fest</li>
                  <li>Duplicate purchases</li>
                  <li>Event rescheduling due to unforeseen circumstances</li>
                  <li>Dissatisfaction with the event</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">3. Exceptional Cases</h2>
                <p>In the rare case that the entire event is permanently canceled by the organizers (not postponed or rescheduled), the refund process (if applicable) will be communicated through official channels.</p>
                <p>Any refund in such exceptional cases will be processed within 30 business days from the announcement of cancellation.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">4. Transfer of Passes</h2>
                <p>Event passes are non-transferable and cannot be resold. The name registered during purchase must match the ID presented at entry.</p>
                <p>Any attempt to transfer or resell passes may result in the invalidation of the pass without refund.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">5. Payment Issues</h2>
                <p>If you have been charged for a transaction that failed or if you have made multiple payments for the same pass due to technical issues, please contact our support team with transaction details within 48 hours.</p>
                <p>Such cases will be reviewed individually, and appropriate action will be taken after verification.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">6. Contact Information</h2>
                <p>For any payment-related queries or concerns, please contact us with your transaction details, including order ID and payment receipt.</p>
                <p>We will address your concerns as promptly as possible, typically within 3-5 business days.</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-[#f9dd9c]">For any queries related to our refund policy, contact us at:</p>
              <p className="text-gray-400">events_8thmile@rvce.edu.in</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}