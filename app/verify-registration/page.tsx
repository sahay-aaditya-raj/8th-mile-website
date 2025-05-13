/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import { getEvent } from '@/data/events';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { VerificationCard } from '@/components/ui/VerificationCard';
import { ReceiptCard } from '@/components/ui/ReceiptCard';
import { ActionButtons } from '@/components/ui/ActionButtons';

interface RegistrationInfo {
  name: string;
  email: string;
  phone?: string;
  paymentId: string;
  orderId: string;
  eventId: string;
  teamSize?: number;
  teamMembers?: string[];
  amount?: number;
  createdAt?: string;
}

export default function VerifyRegistrationPage() {
  const searchParams = useSearchParams();
  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo | null>(null);
  const [eventName, setEventName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const passRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRegistration = async () => {
      const paymentId = searchParams.get('payment_id');
      
      if (!paymentId) {
        setError('No registration ID provided');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/event-registration/lookup?payment_id=${paymentId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to verify registration');
        }
        
        setRegistrationInfo(data.data);
        setVerified(true);
        
        // Fetch event name
        const event = getEvent(data.data.eventId);
        if (event) {
          setEventName(event.name);
        } else {
          setEventName(data.data.eventId);
        }

        // Generate QR code
        const qrUrl = await QRCode.toDataURL(
          `${window.location.origin}/verify-registration?payment_id=${paymentId}`,
          { errorCorrectionLevel: 'H' }
        );
        setQrCodeUrl(qrUrl);
        
      } catch (err: any) {
        console.error('Error verifying registration:', err);
        setError(err.message || 'Failed to verify registration');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRegistration();
  }, [searchParams]);

  const handleDownloadPass = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading registration...');
  };

  const handleDownloadReceipt = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading receipt...');
  };

  if (loading) {
    return <LoadingSpinner message="Verifying registration..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!registrationInfo || !verified) {
    return <ErrorDisplay error="Registration information could not be verified." />;
  }

  // Format registration date
  const registrationDate = registrationInfo.createdAt 
    ? new Date(registrationInfo.createdAt).toLocaleDateString() 
    : 'N/A';
    
  const registrationTime = registrationInfo.createdAt
    ? new Date(registrationInfo.createdAt).toLocaleTimeString()
    : '';

  return (
    <PageWrapper 
      title="Registration Verified" 
      subtitle={`Your registration for ${eventName} has been confirmed.`}
    >
      <VerificationCard
        ref={passRef}
        info={registrationInfo}
        title="Event Registration"
        subtitle={eventName || "Event"}
        qrCodeUrl={qrCodeUrl}
        gradientClasses="from-green-900/80 to-emerald-900/80"
        additionalInfo={
          <p className="text-green-300 font-bold mt-2">Status: VALID</p>
        }
      />

      <ReceiptCard
        ref={receiptRef}
        info={registrationInfo}
        title="Registration Receipt"
        subtitle={eventName || "Event"}
        dateInfo={{
          date: registrationDate,
          time: registrationTime
        }}
      />

      <ActionButtons
        onDownloadPass={handleDownloadPass}
        onDownloadReceipt={handleDownloadReceipt}
        passButtonText="Download Registration"
        receiptButtonText="Download Receipt"
        backUrl="/"
        passRef={passRef}
        receiptRef={receiptRef}
        passFilename={`8thmile-registration-${registrationInfo.paymentId.substring(0, 8)}.png`}
        receiptFilename={`8thmile-receipt-${registrationInfo.paymentId.substring(0, 8)}.png`}
      />
    </PageWrapper>
  );
}