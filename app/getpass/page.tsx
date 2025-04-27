/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import Image from 'next/image';
import html2canvas from 'html2canvas';

interface PaymentInfo {
  name: string;
  email: string;
  phone?: string;
  paymentId: string;
  orderId: string;
  passId: string;
  basePrice?: number;
  gstAmount?: number;
}

export default function VerifyPassPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const passRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const paymentId = searchParams.get('payment_id');

        if (!paymentId) {
          throw new Error('Payment ID is required');
        }

        const response = await fetch(`/api/getpass?payment_id=${paymentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payment data');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Invalid payment data');
        }

        setPaymentInfo(data.payment);
        setLoading(false);

        // Generate QR code
        const qrUrl = await QRCode.toDataURL(
          `${window.location.origin}/getpass?payment_id=${paymentId}`,
          { errorCorrectionLevel: 'H' }
        );
        setQrCodeUrl(qrUrl);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [searchParams]);

  const downloadPass = async () => {
    if (!passRef.current) return;

    try {
      const canvas = await html2canvas(passRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = 'event_pass.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading pass:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!paymentInfo) {
    return <div className="flex items-center justify-center h-screen">No payment data found</div>;
  }

  const passName = paymentInfo.basePrice ? 'Paid Pass' : 'Free Pass';

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div 
          ref={passRef}
          className="relative rounded-2xl border border-white p-6 shadow-lg w-full max-w-md flex items-center space-y-4 justify-between overflow-hidden mb-6"
          style={{
            backgroundImage: "url('/images/pass-background.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1f2937' // Fallback color if image fails to load
          }}
        >
          {/* Details */}
          <div className="text-white space-y-1 relative z-10">
            <h2 className="text-2xl font-bold">Event Pass</h2>
            <p className="font-semibold">{paymentInfo.name}</p>
            <p className="text-sm">{paymentInfo.email}</p>
            {paymentInfo.phone && <p className="text-sm">{paymentInfo.phone}</p>}
            <p className="mt-2 font-semibold">Pass: {passName}</p>
            <p className="text-sm">Order ID: {paymentInfo.orderId}</p>
            <p className="text-sm">Payment ID: {paymentInfo.paymentId}</p>
          </div>

          {/* Logo and QR */}
          <div className="flex flex-col items-center relative z-10">
            <Image src="/8thmilelogocolour.png" alt="Logo" width={80} height={80} className="mb-2" />
            {qrCodeUrl && (
              <img src={qrCodeUrl} alt="QR Code" className="w-28 h-28" />
            )}
          </div>
        </div>

        <button
          onClick={downloadPass}
          className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Event Pass
        </button>
      </div>
    </div>
  );
}