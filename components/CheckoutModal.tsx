/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/CheckoutModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pass } from '@/types';
import { initializeRazorpay, openRazorpayCheckout } from '@/lib/razorpay';
import { formatCurrency } from '@/lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPass: Pass | null;
  razorpayKeyId: string | undefined;
}

// GST rate in percentage
const GST_RATE = 18;

export default function CheckoutModal({ isOpen, onClose, selectedPass, razorpayKeyId }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Load Razorpay SDK on component mount
  useEffect(() => {
    const loadRazorpay = async () => {
      try {
        const res = await initializeRazorpay();
        if (res) {
          setIsRazorpayReady(true);
        }
      } catch (err) {
        console.error("Failed to load Razorpay SDK:", err);
      }
    };
    
    if (isOpen) {
      loadRazorpay();
    }
  }, [isOpen]);

  // Calculate base price and GST amount
  const calculatePriceBreakdown = (totalPrice: number) => {
    const basePrice = Math.round(totalPrice * 100 / (100 + GST_RATE));
    const gstAmount = totalPrice - basePrice;
    return { basePrice, gstAmount };
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!selectedPass) {
      setError('No pass selected');
      setIsLoading(false);
      return;
    }

    if (!isRazorpayReady) {
      try {
        // Try again if not already initialized
        const res = await initializeRazorpay();
        if (!res) {
          setError('Razorpay SDK failed to load');
          setIsLoading(false);
          return;
        }
        setIsRazorpayReady(true);
      } catch (err: any) {
        setError('Failed to initialize payment gateway');
        setIsLoading(false);
        console.error('Failed to initialize Razorpay:', err);
        return;
      }
    }

    try {
      // Create order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passId: selectedPass.id,
          name,
          email,
          phone,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      const { order, pass } = data;
      const { basePrice, gstAmount } = calculatePriceBreakdown(pass.price);

      // Open Razorpay checkout
      openRazorpayCheckout({
        key: razorpayKeyId || '',
        amount: order.amount,
        currency: order.currency,
        name: '8th Mile RVCE',
        image: 'https://8th-mile-website.vercel.app/8thmilelogocolour.png', // Update with your actual domain
        description: `Purchase of ${pass.name}`,
        order_id: order.id,
        prefill: {
          name,
          email,
          contact: phone,
        },
        notes: {
          passId: selectedPass.id,
          basePrice: `${basePrice}`,
          gstAmount: `${gstAmount}`,
        },
        theme: {
          color: '#4f46e5',
        },
        handler: function (response: any) {
          const paymentInfo = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            name,
            email,
            phone,
            passId: selectedPass.id,
            amount: pass.price,
            basePrice: basePrice,
            gstAmount: gstAmount,
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

  if (!selectedPass) return null;

  const { basePrice, gstAmount } = calculatePriceBreakdown(selectedPass.price);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center">
          <div className="mb-4 relative w-24 h-24">
            <Image 
              src="/8thmilelogocolour.png" 
              alt="8th Mile RVCE Logo" 
              fill
              style={{ objectFit: 'contain' }}
              onError={(e) => {
                // Show a fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <DialogTitle className="text-2xl font-bold">Purchase {selectedPass.name}</DialogTitle>
        </DialogHeader>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div className="border p-4 rounded space-y-2">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{selectedPass.name}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{selectedPass.description}</p>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Price</span>
                <span>₹{(basePrice/100).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>GST ({GST_RATE}%)</span>
                <span>₹{(gstAmount/100).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total Amount</span>
                <span>{formatCurrency(selectedPass.price)}</span>
              </div>
              
              <p className="text-xs text-gray-500 italic mt-2">
                All prices are inclusive of GST
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? 'Processing...' : 'Proceed to Pay'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}