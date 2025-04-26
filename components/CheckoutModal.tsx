/* eslint-disable @typescript-eslint/no-explicit-any */
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

// GST rate in percentage
const GST_RATE = 18;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPass: Pass | null;
  razorpayKeyId?: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  selectedPass,
  razorpayKeyId,
}: CheckoutModalProps) {
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [phone, setPhone]           = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [error, setError]           = useState('');
  const router                      = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    initializeRazorpay()
      .then(ok => setIsRazorpayReady(ok))
      .catch(console.error);
  }, [isOpen]);

  const calculatePriceBreakdown = (totalPrice: number) => {
    const basePrice = Math.round((totalPrice * 100) / (100 + GST_RATE));
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
      setError('Payment gateway not ready');
      setIsLoading(false);
      return;
    }

    try {
      // 1) create order on your server
      const createRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passId: selectedPass.id, name, email, phone }),
      });
      const { success, order, pass, message } = await createRes.json();
      if (!success) throw new Error(message || 'Order creation failed');

      const { basePrice, gstAmount } = calculatePriceBreakdown(pass.price);

      onClose(); // hide modal

      // 2) open Razorpay
      openRazorpayCheckout({
        key: razorpayKeyId || '',
        amount: order.amount,
        currency: order.currency,
        name: '8th Mile RVCE',
        image: 'https://8th-mile-website.vercel.app/8thmilelogocolour.png',
        description: `Purchase of ${pass.name}`,
        order_id: order.id,
        prefill: { name, email, contact: phone },
        notes: { passId: selectedPass.id, basePrice: `${basePrice}`, gstAmount: `${gstAmount}` },
        theme: { color: '#4f46e5' },
        handler(response: any) {
          setIsRedirecting(true);

          // 3) verify + store on our server
          const payload = {
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,

            // your metadata:
            name,
            email,
            phone,
            amount:      pass.price,
            basePrice,
            gstAmount,
            passId: selectedPass.id,
          };

          fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
            .then(r => r.json())
            .then((res) => {
              if (res.success) {
                // pass the exact same payload to your success page
                router.push(`/payment/success?data=${encodeURIComponent(JSON.stringify(payload))}`);
              } else {
                router.push('/payment/failed');
              }
            })
            .catch(() => router.push('/payment/failed'));
        },
        modal: {
          ondismiss: () => setIsLoading(false),
          backdropclose: true,
          escape: true,
          confirm_close: true,
          animation: true,
        },
      });
    } catch (err: any) {
      setError(err.message || 'Payment initialization failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedPass) return null;

  const { basePrice, gstAmount } = calculatePriceBreakdown(selectedPass.price);

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 pointer-events-none">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
        <p className="text-lg font-semibold">Redirecting to Payment Result...</p>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center">
          <div className="mb-4 relative w-24 h-24">
            <Image
              src="/8thmilelogocolour.png"
              alt="8th Mile Logo"
              fill
              style={{ objectFit: 'contain' }}
              onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          </div>
          <DialogTitle className="text-2xl font-bold">Purchase {selectedPass.name}</DialogTitle>
        </DialogHeader>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
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
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
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
                <span>₹{(basePrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST ({GST_RATE}%)</span>
                <span>₹{(gstAmount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total Amount</span>
                <span>{formatCurrency(selectedPass.price)}</span>
              </div>
              <p className="text-xs text-gray-500 italic mt-2">All prices are inclusive of GST</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Proceed to Pay'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
