// src/app/payment/failed/page.tsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FailedPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!paymentId) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch('/api/payment-failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId }),
        });

        const data = await response.json();
        console.log('Payment status check:', data);

        if (data.success && data.status === 'PAID') {
          window.location.href = `/payment-status?payment_id=${paymentId}`;
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setIsChecking(false);
      }
    };

    checkPaymentStatus();
  }, [paymentId]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg border border-gray-200 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg border border-gray-200">

        {/* Icon + Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-red-100 rounded-full mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 seasons">Payment Failed</h2>
          <p className="text-gray-600 mt-1">
            We couldn&apos;t process your payment
          </p>

          {paymentId && (
            <p className="text-gray-500 mt-1 text-sm">
              Reference ID: {paymentId}
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 my-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            If any amount was deducted from your account, it will be refunded within
            <span className="font-semibold"> 30 business days</span>.
            For further queries, please contact our support team.
          </p>
        </div>

        {/* Buttons */}
        <div className="text-center mt-6 space-y-3">
          <Link
            href="/contact"
            className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md text-gray-900 font-medium hover:bg-gray-100 transition"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}
