/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { getPass } from '@/data/passes';
import { initializeRazorpay, openRazorpayCheckout } from '@/lib/razorpay';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const passId = searchParams.get('passId');

  const [pass, setPass] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [participants, setParticipants] = useState<{ name: string }[]>([{ name: '' }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

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

    // Initialize with minimum team size if it's a team event
    if (passData.isTeamEvent && passData.minTeamSize) {
      setTeamSize(passData.minTeamSize);
      // Initialize participants array with empty names
      const initialParticipants = Array(passData.minTeamSize)
        .fill(null)
        .map((_, index) => ({ name: index === 0 ? name : '' }));
      setParticipants(initialParticipants);
    }

    setLoading(false);
  }, [passId, name]);

  const updateParticipantName = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = { name: value };
    setParticipants(newParticipants);
  };

  const handleTeamSizeChange = (size: number) => {
    if (!pass || !pass.isTeamEvent) return;

    const minSize = pass.minTeamSize || 1;
    const maxSize = pass.maxTeamSize || 10;
    const newSize = Math.max(minSize, Math.min(size, maxSize));

    setTeamSize(newSize);

    // Adjust participants array size
    if (newSize > participants.length) {
      setParticipants([
        ...participants,
        ...Array(newSize - participants.length)
          .fill(null)
          .map(() => ({ name: '' }))
      ]);
    } else if (newSize < participants.length) {
      setParticipants(participants.slice(0, newSize));
    }
  };

  const calculateTotalAmount = () => {
    if (!pass) return 0;

    if (pass.isTeamEvent) {
      if (pass.paymentType === 'per_person') {
        return pass.price * teamSize;
      }
      return pass.price; // per_team pricing
    }

    return pass.price; // single person pass
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Initialize Razorpay
      const razorpayReady = await initializeRazorpay();
      if (!razorpayReady) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order on server
      const response = await fetch('/api/rzpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pass',
          data: {
            passId: pass.id,
            name,
            email,
            phone,
          }
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      const { order } = data;
      console.log('Order created:', order);
      // Open Razorpay checkout


      openRazorpayCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.amount,
        currency: order.currency,
        name: '8th Mile RVCE',
        image: '/8thmilelogocolour.png',
        description: `Purchase of ${order.notes.name}`,
        order_id: order.id,
        prefill: { name: order.notes.name, email: order.notes.email, contact: order.notes.phone },
        notes: {
          passId: order.notes.passId,
          type: order.notes.type
        },
        handler(response: any) {
          // Show loading indicator during redirect
          setIsRedirecting(true);

          const payload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          fetch('/api/rzpay-verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
            .then(r => r.json())
            .then((res) => {
              if (res.success) {
                router.push(`/verify?payment_id=${response.razorpay_payment_id}`);
              } else {
                router.push(`/failed?error=${encodeURIComponent(res.message || 'Payment verification failed')}`);
              }
            })
            .catch((err) => router.push(`/failed?error=${encodeURIComponent(err.message || 'Unknown error occurred')}`));
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setIsRedirecting(false);
          },
          escape: true,
          backdropclose: false
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
      console.error(err);
    } finally {
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

              <div className="flex items-center justify-between text-gray-300">
                <span>Price:</span>
                <span className="font-semibold text-white">
                    ₹ {pass.price}
                  {pass.isTeamEvent && pass.paymentType === 'per_person' && ' per person'}
                </span>
              </div>

              {pass.isTeamEvent && (
                <>
                  <div className="flex items-center justify-between mt-2 text-gray-300">
                    <span>Team size:</span>
                    <span>{teamSize}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-lg font-bold text-[#f9dd9c]">
                    <span>Total:</span>
                    <span>₹ {calculateTotalAmount()}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <div>
          <Card className="bg-[#0a0a0a] p-6 rounded-xl shadow-lg border border-gray-800">
            <CardContent className="p-0 pt-6">
              <p className="text-xl font-bold mb-4 text-[#f9dd9c]">
                {pass.isTeamEvent ? "Team Information" : "Personal Information"}
              </p>

              <form onSubmit={handlePayment} className="space-y-4 text-white">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {pass.isTeamEvent ? "Team Leader Name" : "Name"}
                    <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (pass.isTeamEvent) updateParticipantName(0, e.target.value);
                    }}
                    required
                    className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {pass.isTeamEvent ? "Team Leader Email" : "Email"}
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
                    {pass.isTeamEvent ? "Team Leader Phone" : "Phone"}
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

                {pass.isTeamEvent && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize" className="text-gray-300">Team Size</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleTeamSizeChange(teamSize - 1)}
                          disabled={teamSize <= (pass.minTeamSize || 1)}
                          className="text-white border-gray-600"
                        >
                          -
                        </Button>
                        <Input
                          id="teamSize"
                          type="number"
                          min={pass.minTeamSize || 1}
                          max={pass.maxTeamSize || 10}
                          value={teamSize}
                          onChange={(e) => handleTeamSizeChange(parseInt(e.target.value))}
                          className="text-center bg-black border border-gray-700 text-white focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleTeamSizeChange(teamSize + 1)}
                          disabled={teamSize >= (pass.maxTeamSize || 10)}
                          className="text-white border-gray-600"
                        >
                          +
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400">
                        Team size must be between {pass.minTeamSize} and {pass.maxTeamSize}
                      </p>
                    </div>

                    <Separator className="my-4 bg-gray-700" />

                    <div>
                      <p className="font-semibold mb-3 text-gray-200">Participant Details</p>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Team Leader (You)</Label>
                          <Input value={name} disabled className="bg-black border border-gray-700 text-white" />
                        </div>

                        {participants.slice(1).map((participant, index) => (
                          <div key={index} className="space-y-2">
                            <Label htmlFor={`participant-${index}`}>
                              Participant {index + 2} Name
                              <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                              id={`participant-${index}`}
                              placeholder="Enter participant name"
                              value={participant.name}
                              onChange={(e) => updateParticipantName(index + 1, e.target.value)}
                              required
                              className="bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-[#f9dd9c] focus:border-[#f9dd9c]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#f9dd9c] text-black font-bold hover:bg-yellow-400 transition"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay  ₹${calculateTotalAmount()}`}
                  </Button>
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