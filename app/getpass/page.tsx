/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import { getPass } from '@/data/passes';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { VerificationCard } from '@/components/ui/VerificationCard';
import { ReceiptCard } from '@/components/ui/ReceiptCard';
import { ActionButtons } from '@/components/ui/ActionButtons';

interface PaymentInfo {
  name: string;
  email: string;
  phone?: string;
  paymentId: string;
  orderId: string;
  passId: string;
  basePrice?: number;
  gstAmount?: number;
  amount?: number;
}

export default function VerifyPassPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passName, setPassName] = useState<string | null>(null);
  
  const passRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

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
        
        // Get pass details
        const pass = getPass(data.payment.passId);
        setPassName(pass ? pass.name : 'Event Pass');
        
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

  const handleDownloadPass = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading pass...');
  };

  const handleDownloadReceipt = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading receipt...');
  };

  if (loading) {
    return <LoadingSpinner message="Loading pass details..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!paymentInfo) {
    return <ErrorDisplay error="No pass information found." />;
  }

  return (
    <PageWrapper 
      title="Event Pass" 
      subtitle={`Welcome to 8th Mile! Your pass has been verified.`}
    >
      <VerificationCard
        ref={passRef}
        info={paymentInfo}
        title="Event Pass"
        subtitle={passName || "Event Pass"}
        qrCodeUrl={qrCodeUrl}
        gradientClasses="from-blue-900/80 to-purple-900/80"
        verificationUrl={`${window.location.origin}/getpass?payment_id=${paymentInfo.paymentId}`}
      />

      <ReceiptCard
        ref={receiptRef}
        info={paymentInfo}
        title="Payment Receipt"
        subtitle={passName || "Event Pass"}
      />

      <ActionButtons
        onDownloadPass={handleDownloadPass}
        onDownloadReceipt={handleDownloadReceipt}
        passButtonText="Download Pass"
        receiptButtonText="Download Receipt"
        backUrl="/"
        passRef={passRef}
        receiptRef={receiptRef}
        passFilename={`8thmile-pass-${paymentInfo.paymentId.substring(0, 8)}.png`}
        receiptFilename={`8thmile-receipt-${paymentInfo.paymentId.substring(0, 8)}.png`}
      />
    </PageWrapper>
  );
}