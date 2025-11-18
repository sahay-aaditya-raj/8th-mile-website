/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader';
import { load } from '@cashfreepayments/cashfree-js';
import type { CashfreeInstance, CashfreeCheckoutOptions } from '@cashfreepayments/cashfree-js';

export default function EventRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<boolean>(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [teamsize, setTeamsize] = useState(1);
  const [teamMembers, setTeamMembers] = useState<{name: string}[]>([{name: ''}]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const cashfreeRef = useRef<CashfreeInstance | null>(null);
  const cashfreeMode = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';
  
  useEffect(() => {
    // Check if returning from Cashfree with error
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    if (orderId) {
      // Redirected from Cashfree after payment attempt
      window.location.href = `/payment-status?payment_id=${orderId}`;
      return;
    }

    if (!slug) {
      setError('No event selected');
      setLoading(false);
      return;
    }
    
    const loadEvent = async () => {
      try {
        // Fetch event data from the API using slug
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        
        const eventData = await response.json();
        if (!eventData) {
          setError('Event not found');
          setLoading(false);
          return;
        }
        
        // Check if registration is open
        setRegistrationStatus(eventData.registrationOpen);
        setEvent(eventData);
        
        // Parse min and max team sizes from the string (e.g., "2-4")
        const sizeRange = eventData.teamsize.split('-');
        const minSize = parseInt(sizeRange[0]) || 1;
        // Initialize with minimum required team size
        setTeamsize(minSize);
        
        // Create team members array of the correct size
        const initialMembers = Array(minSize).fill(null).map((_, i) => ({
          name: i === 0 ? name : ''  // First member is the team leader
        }));
        
        setTeamMembers(initialMembers);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load event');
        setLoading(false);
      }
    };
    
    loadEvent();
  }, [slug]);

  useEffect(() => {
    setTeamMembers((prev) => {
      if (!prev.length) {
        return prev;
      }

      if (prev[0]?.name === name) {
        return prev;
      }

      const updated = [...prev];
      updated[0] = { ...updated[0], name };
      return updated;
    });
  }, [name]);

  useEffect(() => {
    let mounted = true;

    load({ mode: cashfreeMode })
      .then((instance: CashfreeInstance | null) => {
        if (mounted) {
          cashfreeRef.current = instance;
        }
      })
      .catch((sdkError: unknown) => {
        console.error('Failed to initialise Cashfree SDK', sdkError);
        if (mounted) {
          setError((prev) => prev ?? 'Unable to initialise the payment gateway. Please refresh the page and try again.');
        }
      });

    return () => {
      mounted = false;
    };
  }, [cashfreeMode]);
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setPhone(value);
      if (value.length === 10) {
        if (value.startsWith('0')) {
          setPhoneError('Phone number cannot start with 0');
        } else {
          setPhoneError('');
        }
      } else if (value.length > 0) {
        setPhoneError('Phone number must be exactly 10 digits');
      } else {
        setPhoneError('');
      }
    }
  };
  
  const handleTeamMemberChange = (index: number, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = { name: value };
    setTeamMembers(newTeamMembers);
  };
  
  const handleTeamsizeChange = (size: number) => {
    if (!event) return;
    
    // Parse min and max team sizes from the string
    const sizeRange = event.teamsize.split('-');
    const minSize = parseInt(sizeRange[0]) || 1;
    const maxSize = parseInt(sizeRange[1] || sizeRange[0]) || 1;
    
    // Ensure team size is within allowed range
    const newSize = Math.max(minSize, Math.min(size, maxSize));
    setTeamsize(newSize);
    
    // Update team members array
    if (newSize > teamMembers.length) {
      // Add new empty members
      setTeamMembers([
        ...teamMembers,
        ...Array(newSize - teamMembers.length).fill(null).map(() => ({ name: '' }))
      ]);
    } else if (newSize < teamMembers.length) {
      // Remove excess members but keep at least the minimum required
      setTeamMembers(teamMembers.slice(0, Math.max(minSize, newSize)));
    }
  };
  
  // Calculate total registration fee based on feetype
  const calculateTotalFee = () => {
    if (!event) return 0;
    
    const baseFee = event.registrationFee || 0;
    
    // If fee type is per team, return base fee regardless of team size
    if (event.feetype === 'team') {
      return baseFee;
    }
    
    // If fee type is per individual, multiply by team size
    return baseFee * teamsize;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !registrationStatus) return;
    
    // Validate phone number
    if (phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (phone.startsWith('0')) {
      setError("Phone number cannot start with 0");
      return;
    }
    
    // Validate team members - all fields must be filled
    const emptyMembers = teamMembers.filter(member => !member.name.trim());
    
    if (emptyMembers.length > 0) {
      setError("Please fill in all team member names");
      return;
    }
    
    setIsProcessing(true);
    
    try {

      // Create a properly formatted team members array
      const formattedTeamMembers = teamMembers.map(member => member.name.trim());
      
      // Calculate the total fee
      const totalFee = calculateTotalFee();
      const merchantOrderId = `8THMILE_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      // Create Cashfree order
      const response = await fetch('/api/cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'event',
          data: {
            eventId: event._id,
            name,
            email,
            phone,
            teamSize: teamsize,
            teamMembers: formattedTeamMembers,
            feeType: event.feetype,
            totalAmount: totalFee,
            merchantOrderId
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment order');
      }

      const { paymentSessionId } = data as { paymentSessionId: string };
      if (!paymentSessionId) {
        throw new Error('Payment session was not generated. Please try again.');
      }

      let cashfree = cashfreeRef.current;
      if (!cashfree) {
        cashfree = await load({ mode: cashfreeMode });
        if (!cashfree) {
          throw new Error('Cashfree SDK not loaded. Please refresh and try again.');
        }
        cashfreeRef.current = cashfree;
      }

      const checkoutOptions: CashfreeCheckoutOptions = {
        paymentSessionId,
        redirectTarget: '_self',
      };

      // This will redirect the user to Cashfree's hosted payment page
      // After payment, Cashfree will redirect back to the returnUrl configured in the order (/api/verify)
      setIsRedirecting(true);
      cashfree.checkout(checkoutOptions);

    } catch (err: any) {
      setError(err.message || 'Failed to process registration');
      console.error(err);
      setIsRedirecting(false);
      setIsProcessing(false);
    }
  };
  
  if (loading) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-500 pt-10">{error}</div>;
  if (!event) return <div className="p-8 text-center">Event not found</div>;
  
  return (
    <div className="white-spotted-bg min-h-screen text-black pt-32 pb-10 px-6">
      <div className="sora text-3xl font-extrabold mb-8 text-center text-[#25ae80]">
        Register for {event.name}
      </div>

      {!registrationStatus ? (
        <div className="max-w-md mx-auto p-6 bg-red-950 border border-red-500 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Registration Closed</h2>
          <button
            onClick={() => router.push('/events')}
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Events
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 border border-gray-700 p-6 rounded-lg bg-gray-50 shadow-lg">
          {/* Name */}
          <div className="space-y-2">
            <label className="block font-medium text-black">
              Full Name<span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-white border border-gray-700 rounded text-black"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block font-medium text-black">
              Email<span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-white border border-gray-700 rounded text-black"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block font-medium text-black">
              Phone<span className="text-red-500"> *</span>
            </label>
            <input
              type="tel"
              placeholder="Enter 10 digit phone number"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full p-2 bg-white border border-gray-700 rounded text-black"
              required
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          </div>

          {/* Team Size */}
          {event.teamsize !== "1" && (
            <div className="space-y-2">
              <label className="block font-medium text-black">
                Team Size<span className="text-red-500"> *</span>
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleTeamsizeChange(teamsize - 1)}
                  className="w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                >
                  -
                </button>
                <span className="text-lg font-bold text-black">{teamsize}</span>
                <button
                  type="button"
                  onClick={() => handleTeamsizeChange(teamsize + 1)}
                  className="w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-800">
                Allowed team size: {event.teamsize}
              </p>
            </div>
          )}

          {/* Team Members */}
          {teamsize > 1 && (
            <div className="space-y-4">
              <p className="font-bold text-[#fc03a8]">Team Members</p>
              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-2">
                  <label className="block font-medium text-black">
                    {index === 0 ? "Team Leader" : `Member ${index + 1}`}<span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    value={index === 0 ? name : member.name}
                    onChange={(e) =>
                      index === 0
                        ? setName(e.target.value)
                        : handleTeamMemberChange(index, e.target.value)
                    }
                    className="w-full p-2 bg-white border border-gray-700 rounded text-black"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {/* Fee Display */}
          <div className="border border-gray-700 p-4 rounded bg-white">
            <p className="font-bold mb-2 text-[#007dc9]">Registration Fee</p>
            <p className="text-lg text-black">₹{event.registrationFee} {event.feetype === 'individuals' ? 'per person' : 'per team'}</p>

            {event.teamsize !== "1" && event.feetype === 'individuals' && (
              <p className="text-sm text-gray-400 mt-1">
                Total: ₹{calculateTotalFee()}
              </p>
            )}

            {/* {event.registrationDeadline && (
              <p className="mt-4 text-sm text-white">
                <span className="font-medium">Registration Deadline:</span>{' '}
                {new Date(event.registrationDeadline).toLocaleDateString()} at{' '}
                {new Date(event.registrationDeadline).toLocaleTimeString()}
              </p>
            )} */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="sora font-extrabold w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300 transition-all"
          >
            {isProcessing ? "Processing..." : "Register & Pay Now"}
          </button>
          <div className='flex-col border-[1px] border-gray-600 justify-center items-center p-2'>
            <div className='flex-row justify-center items-center text-gray-600 font-semibold gap-2'>
              <span className='text-gray-800'>Note</span>
            </div>
            <div className='text-gray-800 text-xs'>
              It is advised to take a screenshot of the payment page and save it for future reference. If you find difficulties in finding the email, then check the spam folder as well.
            </div>
          </div>
        </form>
      )}

      {/* Add loading overlay */}
      {(isProcessing || isRedirecting) && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md border border-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-800 font-bold mb-2">
              {isRedirecting ? 'Completing Registration...' : 'Processing Payment...'}
            </p>
            <p className="text-gray-800">
              {isRedirecting
                ? 'Please wait while we verify your payment and finalize your registration.'
                : 'Please complete the payment in the popup window.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}