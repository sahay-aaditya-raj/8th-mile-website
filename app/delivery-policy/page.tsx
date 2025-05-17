import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function DeliveryPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="samarkan text-4xl font-bold mb-8 text-center text-[#f9dd9c]">
          Shipping and Delivery Policy
        </h1>
        
        <Card className="bg-[#0a0a0a] border border-gray-700 shadow-lg">
          <CardContent className="p-6">
            <p className="text-gray-400 mb-6">Effective Date: {currentDate}</p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">1. No Physical Shipping</h2>
                <p>8th Mile does not ship any physical goods. All purchases made on the website are strictly for digital event passes.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">2. Delivery of Passes</h2>
                <p>After successful payment, the event pass will be delivered to the user&apos;s email address or made available as a QR code on the confirmation page.</p>
                <p className="mt-2">Ensure that the email provided is correct at the time of purchase.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">3. Delivery Issues</h2>
                <p>If you do not receive your pass within 24 hours of payment, please contact our support team with your transaction ID.</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-[#f9dd9c]">For any delivery-related issues, contact us at:</p>
              <p className="text-gray-400">events_8thmile@rvce.edu.in</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}