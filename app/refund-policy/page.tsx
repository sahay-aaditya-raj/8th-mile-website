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
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">1. No Cancellation</h2>
                <p>All purchases made for 8th Mile event passes are final. Once a pass is booked, it cannot be canceled.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">2. No Refund</h2>
                <p>We do not offer any refunds, partial or full, under any circumstances, including but not limited to:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>Change of mind</li>
                  <li>Inability to attend the fest</li>
                  <li>Event rescheduling due to unforeseen circumstances</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">3. Exceptional Cases</h2>
                <p>In the rare case that the event is permanently canceled by the organizers, the refund process (if applicable) will be communicated through official channels.</p>
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