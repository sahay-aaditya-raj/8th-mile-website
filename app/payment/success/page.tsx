/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { getPass } from '@/data/passes';
import QRCode from 'qrcode';
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
  noOfParticipants?: number;
  participantsName?: string[];
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [passName, setPassName] = useState<string | null>(null);
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
          
          const passId = info.passId ?? `PASS-${paymentId.substring(0, 8).toUpperCase()}`;

          setPaymentInfo({
            name: info.name,
            email: info.email,
            phone: info.phone,
            paymentId,
            orderId,
            passId,
            basePrice: info.basePrice,
            gstAmount: info.gstAmount,
            amount: info.amount,
            noOfParticipants: info.noOfParticipants,
            participantsName: info.participantsName,
          });

          const matchedPass = getPass(info.passId);
          setPassName(matchedPass ? matchedPass.name : info.passId);

          const qrUrl = await QRCode.toDataURL(
            `${window.location.origin}/getpass?payment_id=${paymentId}`, 
            { errorCorrectionLevel: 'H' }
          );
          setQrCodeUrl(qrUrl);

        } catch (err) {
          console.error(err);
          setError('Invalid payment data.');
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
        const res = await fetch(`/api/payment/lookup?payment_id=${paymentIdParam}`);
        const json = await res.json();
        
        if (!res.ok || !json.success) {
          setError(json.message || 'Payment not found.');
          setLoading(false);
          return;
        }
        
        const paymentId = json.data.paymentId;
        const orderId = json.data.orderId;
        const passId = json.data.passId ?? `PASS-${paymentId.substring(0, 8).toUpperCase()}`;

        setPaymentInfo({
          name: json.data.name,
          email: json.data.email,
          phone: json.data.phone,
          paymentId,
          orderId,
          passId,
          basePrice: json.data.basePrice,
          gstAmount: json.data.gstAmount,
          amount: json.data.amount,
          noOfParticipants: json.data.noOfParticipants,
          participantsName: json.data.participantsName,
        });

        const matchedPass = getPass(json.data.passId);
        setPassName(matchedPass ? matchedPass.name : json.data.passId);

        const qrUrl = await QRCode.toDataURL(
          `${window.location.origin}/getpass?payment_id=${paymentId}`,
          { errorCorrectionLevel: 'H' }
        );
        setQrCodeUrl(qrUrl);

      } catch (err) {
        console.error(err);
        setError('Failed to fetch payment details.');
      } finally {
        setLoading(false);
      }
    };
    
    init();
  }, [searchParams]);

  const handleDownloadPass = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading pass...');
  };

  const handleDownloadReceipt = async () => {
    // Let ActionButtons handle the download using the ref
    console.log('Downloading receipt...');
  };

  const handleSendEmail = async () => {
    if (!paymentInfo) return;
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...paymentInfo, passName}),
      });
      
      if (res.ok) toast.success('Email sent successfully!');
      else toast.error('Failed to send email.');
    } catch (err: any) {
      toast.error(`Something went wrong: ${err.message}`);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading payment details..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!paymentInfo) {
    return <ErrorDisplay error="No payment information found." />;
  }

  // Prepare teaminfo object for VerificationCard
  const teamInfo = {
    teamSize: paymentInfo.noOfParticipants,
    teamMembers: paymentInfo.participantsName
  };

  return (
    <PageWrapper 
      title="Payment Successful!" 
      subtitle={`Thank you for purchasing ${passName}. Your payment has been confirmed.`}
    >
      <VerificationCard
        ref={passRef}
        info={{...paymentInfo, ...teamInfo}}
        title="Event Pass"
        subtitle={passName || "Event Pass"}
        qrCodeUrl={qrCodeUrl}
        gradientClasses="from-blue-900/80 to-purple-900/80"
        verificationUrl={`${window.location.origin}/getpass?payment_id=${paymentInfo.paymentId}`}
      />

      <ReceiptCard
        ref={receiptRef}
        info={{...paymentInfo, ...teamInfo}}
        title="Payment Receipt"
        subtitle={passName || "Event Pass"}
      />

      <ActionButtons
        onDownloadPass={handleDownloadPass}
        onDownloadReceipt={handleDownloadReceipt}
        onSendEmail={handleSendEmail}
        showEmailButton={false}
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