/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { getPass } from '@/data/passes';
import QRCode from 'qrcode';
import Link from 'next/link';
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
  amount?: number;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [passName, setPassName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const passRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
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
          });

          const matchedPass = getPass(info.passId);
          setPassName(matchedPass ? matchedPass.name : info.passId);

          const qrUrl = await QRCode.toDataURL(`${window.location.origin}/getpass?payment_id=${paymentId}`, { errorCorrectionLevel: 'H' });
          setQrCodeUrl(qrUrl);

        } catch (err) {
          console.error(err);
          setError('Invalid payment data.');
        }
        return;
      }

      if (!paymentIdParam) {
        setError('No payment identifier provided.');
        return;
      }

      try {
        const res = await fetch(`/api/payment/lookup?payment_id=${paymentIdParam}`);
        const json = await res.json();
        if (!res.ok || !json.success) {
          setError(json.message || 'Payment not found.');
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
        });

        const matchedPass = getPass(json.data.passId);
        setPassName(matchedPass ? matchedPass.name : json.data.passId);

        const qrUrl = await QRCode.toDataURL(`${window.location.origin}/getpass?payment_id=${paymentId}`, { errorCorrectionLevel: 'H' });
        setQrCodeUrl(qrUrl);

      } catch {
        setError('Failed to fetch payment details.');
      }
    };
    init();
  }, [searchParams]);

  const downloadImage = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadPass = () => {
    downloadImage(passRef, 'event_pass.png');
  };

  const handleDownloadReceipt = () => {
    downloadImage(receiptRef, 'payment_receipt.png');
  };

  const handleSendEmail = async () => {
    if (!paymentInfo) return;
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInfo),
      });
      if (res.ok) toast.success('Email sent successfully!');
      else toast.error('Failed to send email.');
    } catch (err: any) {
      toast.error(`Something went wrong: ${err.message}`);
    }
  };

  if (error) return <div className="p-6 text-center text-red-600 font-semibold">{error}</div>;
  if (!paymentInfo) return <div className="p-6 text-center text-gray-700">Loading payment details...</div>;

  return (
    <div className="relative min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: "url('/homepageimages/12.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">Payment Successful!</h1>

        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={handleDownloadReceipt} className="py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md">
            Download Receipt
          </button>
          <button onClick={handleDownloadPass} className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md">
            Download Pass
          </button>
          <button onClick={handleSendEmail} className="py-2 px-6 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md">
            Send Email
          </button>
          <Link href="/" className="py-2 px-6 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md">
            Go to Home
          </Link>
        </div>

        {/* Receipt Template */}
        <div ref={receiptRef} className="absolute -top-[9999px] left-[9999px]">
          <div className="p-6 border rounded-lg shadow-md bg-white text-black w-80">
            <h2 className="text-2xl font-bold text-center mb-4">Receipt</h2>
            <div className="space-y-2 text-sm">
              <div><strong>Name:</strong> {paymentInfo.name}</div>
              <div><strong>Email:</strong> {paymentInfo.email}</div>
              {paymentInfo.phone && <div><strong>Phone:</strong> {paymentInfo.phone}</div>}
              <div><strong>Order ID:</strong> {paymentInfo.orderId}</div>
              <div><strong>Payment ID:</strong> {paymentInfo.paymentId}</div>
              <div><strong>Pass:</strong> {passName}</div>
              {paymentInfo.basePrice !== undefined && <div><strong>Base Price:</strong> ₹{paymentInfo.basePrice/100}</div>}
              {paymentInfo.gstAmount !== undefined && <div><strong>GST:</strong> ₹{paymentInfo.gstAmount/100}</div>}
              {paymentInfo.amount !== undefined && <div className="font-bold"><strong>Total:</strong> ₹{paymentInfo.amount/100}</div>}
            </div>
          </div>
        </div>

        {/* Pass */}
        <div 
          ref={passRef}
          className="relative rounded-2xl border border-white p-6 shadow-lg w-full max-w-md flex items-center space-y-4 justify-between overflow-hidden"
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
            <img src="/8thmilelogocolour.png" alt="Logo" className="w-20 h-20 mb-2" />
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-28 h-28" />}
          </div>
        </div>
      </div>
    </div>
  );
}