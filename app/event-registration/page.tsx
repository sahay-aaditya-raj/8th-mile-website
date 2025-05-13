'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getEvent } from '@/data/events';
import { isRegistrationOpen } from '@/lib/utils';
import { initializeRazorpay, openRazorpayCheckout } from '@/lib/razorpay';

export default function EventRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<{isOpen: boolean; reason: string | null}>({
    isOpen: false, reason: null
  });
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [teamMembers, setTeamMembers] = useState<{name: string}[]>([{name: ''}]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const eventId = searchParams.get('eventId');
    
    if (!eventId) {
      setError('No event selected');
      setLoading(false);
      return;
    }
    
    const eventData = getEvent(eventId);
    if (!eventData) {
      setError('Event not found');
      setLoading(false);
      return;
    }
    
    // Check if registration is open
    const status = isRegistrationOpen(eventData);
    setRegistrationStatus(status);
    
    if (!status.isOpen) {
      setError(`Registration is closed: ${status.reason}`);
    }
    
    setEvent(eventData);
    
    // Initialize team size based on minimum team size
    const minTeamSize = parseInt(eventData.teamSize.split('-')[0]) || 1;
    setTeamSize(minTeamSize);
    
    // Initialize team members array
    const initialMembers = Array(minTeamSize).fill(null).map(() => ({ name: '' }));
    setTeamMembers(initialMembers);
    
    setLoading(false);
  }, [searchParams]);
  
  const handleTeamMemberChange = (index: number, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = { name: value };
    setTeamMembers(newTeamMembers);
  };
  
  const handleTeamSizeChange = (size: number) => {
    if (!event) return;
    
    // Parse min and max team sizes from the string (e.g., "2-4")
    const sizeRange = event.teamSize.split('-');
    const minSize = parseInt(sizeRange[0]) || 1;
    const maxSize = parseInt(sizeRange[1] || sizeRange[0]) || 1;
    
    // Ensure team size is within allowed range
    const newSize = Math.max(minSize, Math.min(size, maxSize));
    setTeamSize(newSize);
    
    // Update team members array
    if (newSize > teamMembers.length) {
      setTeamMembers([
        ...teamMembers,
        ...Array(newSize - teamMembers.length).fill(null).map(() => ({ name: '' }))
      ]);
    } else if (newSize < teamMembers.length) {
      setTeamMembers(teamMembers.slice(0, newSize));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !registrationStatus.isOpen) return;
    
    setIsProcessing(true);
    
    try {
      // Initialize Razorpay
      const razorpayReady = await initializeRazorpay();
      if (!razorpayReady) {
        throw new Error('Failed to load payment gateway');
      }
      
      // Extract registration fee from string (e.g., "₹1,500 per team")
      const feeStr = event.registrationFee.replace(/[^0-9]/g, '');
      const fee = parseInt(feeStr) * 100; // Convert to paise
      
      // Create order on server
      const response = await fetch('/api/event-registration/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          name,
          email,
          phone,
          teamSize,
          teamMembers: teamMembers.map(m => m.name),
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create registration');
      }
      
      // Open Razorpay checkout
      openRazorpayCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: data.order.amount,
        currency: data.order.currency,
        name: '8th Mile RVCE',
        image: '/8thmilelogocolour.png',
        description: `Registration for ${event.name}`,
        order_id: data.order.id,
        prefill: { name, email, contact: phone },
        notes: {
          eventId: event.id,
          teamSize,
          teamMembers: JSON.stringify(teamMembers.map(m => m.name))
        },
        handler(response: any) {
          const payload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            name,
            email,
            phone,
            eventId: event.id,
            teamSize,
            teamMembers: teamMembers.map(m => m.name)
          };
          
          // Verify payment on server
          fetch('/api/event-registration/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
            .then(r => r.json())
            .then((res) => {
              if (res.success) {
                router.push(`/event-registration/success?data=${encodeURIComponent(JSON.stringify(payload))}`);
              } else {
                router.push(`/event-registration/failed?error=${encodeURIComponent(res.message || 'Payment verification failed')}&eventId=${event.id}`);
              }
            })
            .catch((err) => router.push(`/event-registration/failed?error=${encodeURIComponent(err.message || 'Unknown error occurred')}&eventId=${event.id}`));
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to process registration');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!event) return <div className="p-8 text-center">Event not found</div>;
  
  return (
    <div className="container mx-auto p-4 md:p-8 mt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Register for {event.name}</h1>
      
      {!registrationStatus.isOpen ? (
        <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Registration Closed</h2>
          <p className="text-red-700">{registrationStatus.reason}</p>
          <button 
            onClick={() => router.push('/events')}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            Back to Events
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div className="space-y-2">
            <label className="block font-medium">
              Full Name
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">
              Email
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">
              Phone
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          {/* Team size selection if it's a team event */}
          {event.teamSize !== "1" && (
            <div className="space-y-2">
              <label className="block font-medium">
                Team Size
                <span className="text-red-500"> *</span>
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleTeamSizeChange(teamSize - 1)}
                  className="w-10 h-10 rounded-full bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-bold">{teamSize}</span>
                <button
                  type="button"
                  onClick={() => handleTeamSizeChange(teamSize + 1)}
                  className="w-10 h-10 rounded-full bg-gray-200"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Allowed team size: {event.teamSize}
              </p>
            </div>
          )}
          
          {/* Team members fields if team size > 1 */}
          {teamSize > 1 && (
            <div className="space-y-4">
              <h3 className="font-bold">Team Members</h3>
              
              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-2">
                  <label className="block font-medium">
                    {index === 0 ? "Team Leader" : `Member ${index + 1}`}
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    value={index === 0 ? name : member.name}
                    onChange={(e) => 
                      index === 0 
                        ? setName(e.target.value) 
                        : handleTeamMemberChange(index, e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="border p-4 rounded mt-6">
            <h3 className="font-bold mb-2">Registration Fee</h3>
            <p className="text-lg">{event.registrationFee}</p>
            
            {event.teamSize !== "1" && (
              <p className="text-sm text-gray-600 mt-1">
                {event.registrationFee.includes('per team') 
                  ? 'One payment covers the entire team' 
                  : `Total: ₹${parseInt(event.registrationFee.replace(/[^0-9]/g, '')) * teamSize}`
                }
              </p>
            )}
            
            <p className="mt-4 text-sm">
              <span className="font-medium">Registration Deadline:</span>{' '}
              {new Date(event.registrationDeadline).toLocaleDateString()} at{' '}
              {new Date(event.registrationDeadline).toLocaleTimeString()}
            </p>
            
            <p className="text-sm text-green-600">
              {event.maxParticipants - event.currentRegistrations} spots remaining
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isProcessing ? "Processing..." : "Register & Pay Now"}
          </button>
        </form>
      )}
    </div>
  );
}