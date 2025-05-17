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

            <p className="mb-6">
              This Shipping and Delivery Policy outlines the terms regarding the delivery of event passes purchased for 8th Mile, the official annual fest of RV College of Engineering. By purchasing passes through our website, you acknowledge and agree to the following terms:
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">1. No Physical Shipping</h2>
                <p>8th Mile does not ship any physical goods. All purchases made on the website are strictly for digital event passes.</p>
                <p>No physical tickets will be mailed to any address provided during registration.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">2. Delivery of Passes</h2>
                <p>After successful payment, the event pass will be delivered to the user's email address or made available as a QR code on the confirmation page.</p>
                <p className="mt-2">Email delivery typically occurs within 15 minutes of successful payment. In some cases, it may take up to 24 hours.</p>
                <p className="mt-2">Ensure that the email provided is correct at the time of purchase. We are not responsible for passes delivered to incorrectly entered email addresses.</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">3. Accessing Your Pass</h2>
                <p>You can access your digital pass in the following ways:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>Through the confirmation email sent to your registered email address</li>
                  <li>By logging into your account on our website</li>
                  <li>By visiting the verification page with your payment ID</li>
                </ul>
                <p className="mt-2">We recommend saving your QR code or keeping the email accessible on your mobile device for easy entry to the event.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">4. Delivery Issues</h2>
                <p>If you do not receive your pass within 24 hours of payment, please check your spam/junk folder first.</p>
                <p className="mt-2">If you still cannot locate your pass, please contact our support team with your transaction ID at the email address provided below.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f9dd9c] mb-2">5. Technical Requirements</h2>
                <p>To access and use your digital pass, you need:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-300">
                  <li>A smartphone with a functional display</li>
                  <li>Internet access to retrieve your pass</li>
                  <li>Sufficient battery life to display your pass at event entry</li>
                </ul>
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