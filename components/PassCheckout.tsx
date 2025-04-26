/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/PassCheckout.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeRazorpay, openRazorpayCheckout } from '@/lib/razorpay';
import { eventPasses } from '@/data/passes';
import { formatCurrency } from '@/lib/utils';

export default function PassCheckout({ key_id }: { key_id: string | undefined }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPass, setSelectedPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Initialize Razorpay
      const res = await initializeRazorpay();
      if (!res) {
        setError('Razorpay SDK failed to load');
        setIsLoading(false);
        return;
      }

      // Create order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passId: selectedPass,
          name,
          email,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      const { order, pass } = data;
      console.log('Order created:', order);
      console.log('Pass details:', pass);
      console.log('Razorpay Key ID:', key_id);

      // Open Razorpay checkout
      openRazorpayCheckout({
        key: key_id || '',
        amount: order.amount,
        currency: order.currency,
        name: 'Event Passes',
        description: `Purchase of ${pass.name}`,
        order_id: order.id,
        prefill: {
          name,
          email,
        },
        notes: {
          passId: selectedPass,
        },
        theme: {
          color: '#3399cc',
        },
        handler: function (response: any) {
          const paymentInfo = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            name,
            email,
            passId: selectedPass,
            amount: pass.price,
          };
          
          // Verify payment on server
          fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                // Redirect to success page
                router.push(`/payment/success?data=${encodeURIComponent(JSON.stringify(paymentInfo))}`);
              } else {
                router.push('/payment/failed');
              }
            })
            .catch(() => {
              router.push('/payment/failed');
            });
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      });
    } catch (err: any) {
      setError(err.message || 'Payment initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Select Event Pass</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Pass</label>
          <div className="space-y-2">
            {eventPasses.map((pass) => (
              <div key={pass.id} className="flex items-center border p-3 rounded">
                <input
                  type="radio"
                  id={pass.id}
                  name="pass"
                  value={pass.id}
                  checked={selectedPass === pass.id}
                  onChange={() => setSelectedPass(pass.id)}
                  className="mr-2"
                  required
                />
                <label htmlFor={pass.id} className="flex-1">
                  <div className="font-medium">{pass.name}</div>
                  <div className="text-sm text-gray-600">{pass.description}</div>
                  <div className="font-bold text-green-700">
                    {formatCurrency(pass.price)}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !selectedPass}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </form>
    </div>
  );
}