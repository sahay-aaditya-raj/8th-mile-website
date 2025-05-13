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
import { formatCurrency } from '@/lib/utils';

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
  const [participants, setParticipants] = useState<{name: string}[]>([{name: ''}]);
  const [isProcessing, setIsProcessing] = useState(false);

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

      // Prepare participants data - first participant is team leader
      const participantsData = participants.map((p, i) => 
        i === 0 ? name : p.name
      );
      
      // Create order on server
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passId: pass.id,
          name,
          email,
          phone,
          noOfParticipants: teamSize.toString(),
          participantsName: participantsData
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }
      
      const { order } = data;

      // Open Razorpay checkout
      openRazorpayCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.amount,
        currency: order.currency,
        name: '8th Mile RVCE',
        image: '/8thmilelogocolour.png',
        description: `Purchase of ${pass.name}`,
        order_id: order.id,
        prefill: { name, email, contact: phone },
        notes: {
          passId: pass.id,
          noOfParticipants: teamSize.toString(),
          participantsName: JSON.stringify(participantsData)
        },
        handler(response: any) {
          const payload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            name,
            email,
            phone,
            passId: pass.id,
            amount: calculateTotalAmount(),
            noOfParticipants: teamSize,
            participantsName: participantsData,
            participantsStatus: Array(teamSize).fill(false)
          };
          
          // Verify payment on server
          fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
            .then(r => r.json())
            .then((res) => {
              if (res.success) {
                router.push(`/payment/success?data=${encodeURIComponent(JSON.stringify(payload))}`);
              } else {
                router.push('/payment/failed');
              }
            })
            .catch(() => router.push('/payment/failed'));
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
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

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!pass) return <div className="p-8 text-center">No pass selected</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pass Details Section */}
        <div>
          <Card className="p-6">
            <CardContent className="p-0 pt-6">
              <h2 className="text-2xl font-semibold mb-4">{pass.name}</h2>
              <p className="text-gray-600 mb-4">{pass.description}</p>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="font-medium">Includes:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {pass.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">
                  {formatCurrency(pass.price/100)}
                  {pass.isTeamEvent && pass.paymentType === 'per_person' && ' per person'}
                </span>
              </div>
              
              {pass.isTeamEvent && (
                <>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600">Team size:</span>
                    <span>{teamSize}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateTotalAmount()/100)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Form Section */}
        <div>
          <Card className="p-6">
            <CardContent className="p-0 pt-6">
              <h2 className="text-xl font-semibold mb-4">
                {pass.isTeamEvent ? "Team Information" : "Personal Information"}
              </h2>
              
              <form onSubmit={handlePayment} className="space-y-4">
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
                      // Update first participant if team event
                      if (pass.isTeamEvent) {
                        updateParticipantName(0, e.target.value);
                      }
                    }}
                    required
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
                  />
                </div>
                
                {pass.isTeamEvent && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button" 
                          size="sm"
                          variant="outline"
                          onClick={() => handleTeamSizeChange(teamSize - 1)}
                          disabled={teamSize <= (pass.minTeamSize || 1)}
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
                          className="text-center"
                        />
                        <Button 
                          type="button" 
                          size="sm"
                          variant="outline"
                          onClick={() => handleTeamSizeChange(teamSize + 1)}
                          disabled={teamSize >= (pass.maxTeamSize || 10)}
                        >
                          +
                        </Button>
                      </div>
                      {pass.minTeamSize && pass.maxTeamSize && (
                        <p className="text-xs text-gray-500">
                          Team size must be between {pass.minTeamSize} and {pass.maxTeamSize} participants
                        </p>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h3 className="font-medium mb-3">Participant Details</h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Team Leader (You)</Label>
                          <Input value={name} disabled />
                        </div>
                        
                        {/* Additional participants */}
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
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay ${formatCurrency(calculateTotalAmount()/100)}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}