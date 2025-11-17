'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('payment_id');

  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId) {
        setError('Missing payment ID');
        setVerifying(false);
        return;
      }

      try {
        const response = await fetch(`/api/verify?payment_id=${paymentId}`);
        const data = await response.json();

        if (!response.ok) {
          // Handle error responses
          if (response.status === 404) {
            setError('Payment not found');
            setTimeout(() => router.push('/'), 3000);
            return;
          }
          
          setError(data.message || 'Verification failed');
          setTimeout(() => router.push(`/failed?payment_id=${paymentId}`), 2000);
          return;
        }

        // Handle success response
        if (data.status === 'SUCCESS') {
          router.push(`/verify?payment_id=${paymentId}`);
        } else if (data.status === 'FAILED' || data.status === 'PENDING') {
          router.push(`/failed?payment_id=${paymentId}`);
        } else {
          setError('Unknown payment status');
          setTimeout(() => router.push('/'), 3000);
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
        setError('Failed to verify payment. Please try again.');
        setTimeout(() => router.push('/'), 3000);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [paymentId, router]);

  if (verifying) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffffff] via-[#f7f7f7] to-[#f0f0f0] px-4">
      <div className="max-w-md w-full text-center">
        {error && (
          <>
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mt-6 text-gray-900">Verification Error</h2>
            <p className="text-gray-600 mt-4">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
          </>
        )}
      </div>
    </div>
  );
}
