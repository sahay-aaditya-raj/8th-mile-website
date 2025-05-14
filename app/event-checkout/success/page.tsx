/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { toast } from 'react-hot-toast';
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
}

export default function EventRegistrationSuccessPage() {
  const searchParams = useSearchParams();
  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo | null>(null);
  const [eventName, setEventName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const passRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const dataParam = searchParams.get('data');
      const paymentIdParam = searchParams.get('payment_id');

      if (dataParam) {
        try {
          const info = JSON.parse(decodeURIComponent(dataParam));
          const paymentId = info.paymentId ?? info.razorpay_payment_id;
          const orderId = info.orderId ?? info.razorpay_order_id;
          
          if (!paymentId || !orderId) throw new Error('Missing IDs');
          
          const eventId = info.eventId ?? `EVENT-${paymentId.substring(0, 8).toUpperCase()}`;
          
          // Extract team information
          const teamSize = info.teamsize || info.teamSize || 1;
          const teamMembers = Array.isArray(info.teamMembers) ? info.teamMembers : [info.name];
          
          // Ensure team leader is properly set
          if (teamMembers[0] !== info.name) {
            teamMembers[0] = info.name;
          }

          setRegistrationInfo({
            name: info.name,
            email: info.email,
            phone: info.phone,
            paymentId,
            orderId,
            eventId,
            teamSize: teamSize,
            teamMembers: teamMembers,
            amount: info.amount,
          });

          const matchedEvent = await getEvent(info.eventId);
          setEventName(matchedEvent ? matchedEvent.name : info.eventId);

          // Generate QR code for verification
          const qrUrl = await QRCode.toDataURL(
            `${window.location.origin}/verify-registration?payment_id=${paymentId}`, 
            { errorCorrectionLevel: 'H' }
          );
          setQrCodeUrl(qrUrl);

        } catch (err) {
          console.error(err);
          setError('Invalid registration data.');
        } finally {
          setLoading(false);
        }
        return;
      }

      if (!paymentIdParam) {
        setError('No payment identifier provided.');
        setLoading(false);
        return;
      }

      try {
        // Look up the payment details if only the ID is provided
        const res = await fetch(`/api/event-registration/lookup?payment_id=${paymentIdParam}`);
        const json = await res.json();
        
        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Failed to retrieve registration details.');
        }
        
        const paymentId = json.data.paymentId;
        const orderId = json.data.orderId;
        const eventId = json.data.eventId;
        const teamMembers = Array.isArray(json.data.teamMembers) ? json.data.teamMembers : [json.data.name];

        setRegistrationInfo({
          name: json.data.name,
          email: json.data.email,
          phone: json.data.phone,
          paymentId,
          orderId,
          eventId,
          teamSize: json.data.teamSize || 1,
          teamMembers: teamMembers,
          amount: json.data.amount,
        });

        const matchedEvent = getEvent(eventId);
        setEventName(matchedEvent ? matchedEvent.name : eventId);

        // Generate QR code
        const qrUrl = await QRCode.toDataURL(
          `${window.location.origin}/verify-registration?payment_id=${paymentId}`,
          { errorCorrectionLevel: 'H' }
        );
        setQrCodeUrl(qrUrl);

      } catch (err) {
        console.error(err);
        setError('Could not retrieve registration details. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [searchParams]);

  const handleDownloadPass = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading registration...');
  };

  const handleDownloadReceipt = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading receipt...');
  };

  const handleSendEmail = async () => {
    if (!registrationInfo) return;
    try {
      const res = await fetch('/api/send-registration-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...registrationInfo, eventName}),
      });
      if (res.ok) toast.success('Email sent successfully!');
      else toast.error('Failed to send email.');
    } catch (err: any) {
      toast.error(`Something went wrong: ${err.message}`);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading registration details..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!registrationInfo) {
    return <ErrorDisplay error="Registration information not found." />;
  }

  return (
    <PageWrapper 
      title="Registration Successful!" 
      subtitle={`Thank you for registering for ${eventName}. Your registration has been confirmed.`}
    >
      <VerificationCard
        ref={passRef}
        info={registrationInfo}
        title="Event Registration"
        subtitle={eventName || "Event"}
        qrCodeUrl={qrCodeUrl}
        gradientClasses="from-purple-900/80 to-blue-900/80"
        verificationUrl={`${window.location.origin}/verify-registration?payment_id=${registrationInfo.paymentId}`}
      />

      <ReceiptCard
        ref={receiptRef}
        info={registrationInfo}
        title="Payment Receipt"
        subtitle={eventName || "Event"}
      />

      <ActionButtons
        onDownloadPass={handleDownloadPass}
        onDownloadReceipt={handleDownloadReceipt}
        onSendEmail={handleSendEmail}
        showEmailButton={false}
        passButtonText="Download Registration"
        receiptButtonText="Download Receipt"
        backUrl="/"
        passRef={passRef}
        receiptRef={receiptRef}
        passFilename={`pass-${registrationInfo.paymentId}.png`}
        receiptFilename={`receipt-${registrationInfo.paymentId}.png`}
      />
    </PageWrapper>
  );
}