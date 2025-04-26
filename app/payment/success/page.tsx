// src/app/payment/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PaymentInfo } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data)) as PaymentInfo;
        setPaymentInfo({
          ...decodedData,
          status: 'success',
        });
      } catch (err) {
        console.error('Error parsing payment data', err);
      }
    }
  }, [searchParams]);

  if (!paymentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <h2 className="text-2xl font-bold text-foreground">Loading payment details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full bg-card p-8 shadow-lg rounded-lg border-2 border-muted/20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
          <p className="text-muted-foreground mt-1">
            Your event pass has been purchased successfully.
          </p>
        </div>

        <div className="border-t border-b border-border py-4 my-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Name:</div>
            <div className="font-medium text-right text-foreground">{paymentInfo.name}</div>
            
            <div className="text-muted-foreground">Email:</div>
            <div className="font-medium text-right text-foreground">{paymentInfo.email}</div>
            
            {paymentInfo.phone && (
              <>
                <div className="text-muted-foreground">Phone:</div>
                <div className="font-medium text-right text-foreground">{paymentInfo.phone}</div>
              </>
            )}
          </div>
        </div>
        
        <div className="border-b border-border py-4 mb-4">
          <h3 className="font-medium mb-3">Payment Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Order ID:</div>
            <div className="font-medium text-sm text-right break-all text-foreground">
              {paymentInfo.orderId}
            </div>
            
            <div className="text-muted-foreground">Payment ID:</div>
            <div className="font-medium text-sm text-right break-all text-foreground">
              {paymentInfo.paymentId}
            </div>
          </div>
        </div>
        
        <div className="border-b border-border py-4 mb-4">
          <h3 className="font-medium mb-3">Price Breakdown</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Base Price:</div>
            <div className="text-right text-foreground">
              {formatCurrency(paymentInfo.basePrice || 0)}
            </div>
            
            <div className="text-muted-foreground">GST (18%):</div>
            <div className="text-right text-foreground">
              {formatCurrency(paymentInfo.gstAmount || 0)}
            </div>
            
            <div className="text-muted-foreground font-medium">Total Amount:</div>
            <div className="font-bold text-right text-foreground">
              {formatCurrency(paymentInfo.amount)}
            </div>
            
            <div className="col-span-2 text-xs text-muted-foreground italic mt-2">
              All prices are inclusive of GST
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block py-2 px-6 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}