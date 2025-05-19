import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <p className="samarkan text-4xl font-bold mb-8 text-center text-[#f9dd9c]">
          Terms & Conditions
        </p>
        
        <Card className="bg-[#0a0a0a] border border-gray-700 shadow-lg mb-8">
          <CardContent className="p-6">
            <p className="text-gray-400 mb-6">Last updated on May 8th 2025</p>
            
            <p className="mb-6">
              For the purpose of these Terms and Conditions, The term &quot;we&quot;, &quot;us&quot;, &quot;our&quot; used anywhere on this page shall mean MILAAP KREATIONS, 
              whose registered/operational office is B5 golden Enclave Apartment, #5th cross 2nd main road Soundarya layout Bengaluru KARNATAKA 560073. 
              &quot;you&quot;, &quot;your&quot;, &quot;user&quot;, &quot;visitor&quot; shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
            </p>
            
            <p className="mb-6">
              Your use of the website and/or purchase from us are governed by following Terms and Conditions:
            </p>
            
            <div className="space-y-6">
              <div>
                <p>The content of the pages of this website is subject to change without notice.</p>
              </div>
              
              <div>
                <p>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>
              </div>
              
              <div>
                <p className="text-xl font-bold text-[#f9dd9c] mb-2">3. Pass Purchase</p>
                <p>All passes are digital and delivered via email or QR code after successful payment.</p>
                <p>Payment can be made using UPI, Credit/Debit Cards, Netbanking, or Wallets.</p>
                <p>By making a payment, you acknowledge that all sales are final and non-refundable as outlined in our Refund Policy.</p>
              </div>
              
              <div>
                <p>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>
              </div>
              
              <div>
                <p>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</p>
              </div>
              
              <div>
                <p>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</p>
              </div>

              <div>
                <p>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</p>
              </div>
              
              <div>
                <p>You may not create a link to our website from another website or document without MILAAP KREATIONS's prior written consent.</p>
              </div>

              <div>
                <p>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</p>
              </div>

              <div>
                <p>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-[#f9dd9c]">Disclaimer:</p>
              <p className="text-gray-400">The above content is created at MILAAP KREATIONS's sole discretion. Payment Gateway shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}