/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { getPass } from '@/data/passes';
import { AlertTriangle } from 'lucide-react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const passId = searchParams.get('passId');

  const [pass, setPass] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting,] = useState(false);

  useEffect(() => {
    if (!passId) {
      setError('No pass selected');
      setLoading(false);
      return;
    }

    const passData = getPass(passId);
    if (!passData) {
      setError('Invalid pass');
      setLoading(false);
      return;
    }

    setPass(passData);


    setLoading(false);
  }, [passId, name]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const merchantOrderId = `8THMILE_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      // Create a data object with all the collected information
      const paymentData = {
        type: 'pass',
        data: {
          passId: pass.id,
          name,
          email,
          phone,
          amount: pass.price,
          teamSize: 1,
          participants: [name],
          merchantOrderId
        }
      };

      // Call the PhonePe order creation endpoint
      const response = await fetch('/api/phonepe-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment order');
      }

      // Redirect to PhonePe checkout page
      window.location.href = data.checkoutPageUrl;

    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-200 bg-black">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500 bg-black">{error}</div>;
  if (!pass) return <div className="p-8 text-center text-gray-200 bg-black">No pass selected</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="samarkan text-6xl font-extrabold mb-10 text-center text-[#f9dd9c]">Checkout</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Pass Details Section */}
        <div>
          <Card className="bg-[#0a0a0a] p-6 rounded-xl shadow-lg border border-gray-800">
            <CardContent className="p-0 pt-6">
              <p className="text-2xl font-bold text-[#f9dd9c] mb-4">{pass.name}</p>
              <p className="text-gray-300 mb-4">{pass.description}</p>

              <Separator className="my-4 bg-gray-700" />

              <div className="space-y-3">
                <p className="font-semibold text-gray-200">Includes:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  {pass.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <Separator className="my-4 bg-gray-700" />


            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <div>
          <Card className="bg-[#0a0a0a] p-6 rounded-xl shadow-lg border border-gray-800">
            <CardContent className="p-0 pt-6">
              <p className="text-xl font-bold mb-4 text-[#f9dd9c]">
                Personal Information
              </p>

              <form onSubmit={handlePayment} className="space-y-4 text-white">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name
                    <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                    className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                    <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone
                    <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                  />
                </div>

                <p className='text-sm text-red-800 text-right'>* Required</p>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#f9dd9c] text-black font-bold hover:bg-yellow-400 transition"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay  ₹${pass.price}`}
                  </Button>
                </div>
                <div className='pt-4 flex-col border-[1px] border-red-600 justify-center items-center p-2'>
                  <div className='flex-row justify-center items-center text-red-600 font-semibold gap-2'>
                    
                      <AlertTriangle /> Caution
                  </div>
                  <div className='text-red-800 text-xs'>
                    It is advised to take a screenshot of the payment page and save it for future reference. If you find difficulties in finding the email, then check the spam folder as well.
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {(isProcessing || isRedirecting) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] p-6 rounded-lg shadow-lg text-center max-w-md border border-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f9dd9c] mx-auto mb-4"></div>
            <p className="text-xl text-[#f9dd9c] font-bold mb-2">
              {isRedirecting ? 'Completing Purchase...' : 'Processing Payment...'}
            </p>
            <p className="text-gray-300">
              {isRedirecting
                ? 'Please wait while we verify your payment and finalize your purchase.'
                : 'Please complete the payment in the popup window.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );

}