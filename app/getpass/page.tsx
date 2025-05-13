/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPass } from '@/data/passes';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'react-hot-toast';

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

  const downloadImage = async (ref: React.RefObject<HTMLDivElement | null>, filename: string) => {
    if (!ref.current) return;
    
    try {
      // Create a temporary style element to override problematic colors
      const style = document.createElement('style');
      style.textContent = `
        /* Override any oklab colors with standard colors */
        [data-html2canvas-ignore] { display: none !important; }
        .temporary-html2canvas-class * {
          color-scheme: light !important;
          background: white !important;
          color: black !important;
          border-color: #ddd !important;
          box-shadow: none !important;
        }
      `;
      
      document.head.appendChild(style);
      
      // Add temporary class for capturing
      ref.current.classList.add('temporary-html2canvas-class');
      
      const canvas = await html2canvas(ref.current, {
        backgroundColor: 'white',
        scale: 2,
        useCORS: true,
        logging: false,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Fix any remaining problematic styles in the cloned document
          const elements = clonedDoc.querySelectorAll('*');
          elements.forEach(el => {
            const style = getComputedStyle(el);
            for (const prop of ['background', 'color', 'border-color']) {
              const value = style.getPropertyValue(prop);
              if (value.includes('oklab')) {
                // Replace oklab colors with a safe alternative
                if (prop === 'color') el.style.color = '#000000';
                else if (prop === 'background') el.style.background = '#ffffff';
                else el.style.borderColor = '#dddddd';
              }
            }
          });
        }
      });
      
      // Clean up
      ref.current.classList.remove('temporary-html2canvas-class');
      document.head.removeChild(style);
      
      // Download the image
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('There was a problem downloading the image. Please try again.');
    }
  };

  const handleDownloadPass = () => {
    downloadImage(passRef, 'event_pass.png');
  };

  const handleDownloadReceipt = () => {
    downloadImage(receiptRef, 'pass_receipt.png');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading pass details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="bg-black border border-red-500 rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Verification Failed</h1>
          <p className="text-red-400 mb-6">{error}</p>
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="outline" className="text-white border-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="bg-black border border-red-500 rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-red-400">No pass information found.</p>
          <div className="mt-6">
            <Link href="/">
              <Button variant="outline" className="text-white border-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: "url('/homepageimages/12.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6 pt-20">
        <div className="max-w-4xl w-full text-center">
          <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">Event Pass</div>
          <p className="text-lg md:text-xl text-white mb-8">
            Welcome to 8th Mile! Your pass has been verified.
          </p>

          {/* Pass Card */}
          <div 
            ref={passRef}
            className="relative rounded-2xl border border-white p-6 shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 overflow-hidden bg-gradient-to-br from-blue-900/80 to-purple-900/80"
          >
            {/* Logo and Pass Name */}
            <div className="flex justify-between items-center">
              <div className="relative h-16 w-16">
                <Image src="/8thmilelogocolour.png" alt="Logo" fill className="object-contain" />
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">Event Pass</div>
                <p className="text-lg text-yellow-300">{passName}</p>
              </div>
            </div>

            {/* Participant Details */}
            <div className="text-white space-y-1 relative z-10">
              <h3 className="font-semibold text-lg">Pass Holder</h3>
              <p className="font-semibold">{paymentInfo.name}</p>
              <p className="text-sm">{paymentInfo.email}</p>
              {paymentInfo.phone && <p className="text-sm">{paymentInfo.phone}</p>}
              
              {/* Payment Details */}
              <div className="mt-4 pt-3 border-t border-white/20">
                <p className="text-sm">Payment ID: {paymentInfo.paymentId}</p>
                <p className="text-sm">Order ID: {paymentInfo.orderId}</p>
                {paymentInfo.amount && (
                  <p className="text-sm mt-1">
                    Amount Paid: {formatCurrency(paymentInfo.amount)}
                  </p>
                )}
              </div>
            </div>

            {/* QR Code */}
            {qrCodeUrl && (
              <div className="flex justify-center mt-2">
                <div className="bg-white p-2 rounded-lg">
                  <img src={qrCodeUrl} alt="QR Code" className="h-32 w-32" />
                  <p className="text-xs text-center text-black mt-1">Scan to verify</p>
                </div>
              </div>
            )}

            {/* Background Pattern */}
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500 to-cyan-700 opacity-20 blur-2xl"></div>
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-700 opacity-20 blur-2xl"></div>
          </div>

          {/* Receipt Card */}
          <div 
            ref={receiptRef}
            className="relative mt-8 rounded-xl border border-gray-200 p-6 bg-white text-black w-full max-w-md mx-auto"
          >
            <div className="text-xl font-bold text-center border-b border-gray-200 pb-2 mb-4">Payment Receipt</div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{paymentInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pass Type:</span>
                <span>{passName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment ID:</span>
                <span className="text-sm">{paymentInfo.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span className="text-sm">{paymentInfo.orderId}</span>
              </div>
              
              {paymentInfo.amount && (
                <>
                  {(paymentInfo.basePrice || paymentInfo.gstAmount) && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Base Price:</span>
                        <span>{formatCurrency(paymentInfo.basePrice || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GST:</span>
                        <span>{formatCurrency(paymentInfo.gstAmount || 0)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(paymentInfo.amount)}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-end mt-4">
                <div className="text-sm text-gray-500">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-2 right-2 opacity-20">
              <div className="relative h-16 w-16">
                <Image src="/8thmilelogocolour.png" alt="Logo" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
            <Button onClick={handleDownloadPass} variant="secondary" className="px-6">
              Download Pass
            </Button>
            <Button onClick={handleDownloadReceipt} variant="secondary" className="px-6">
              Download Receipt
            </Button>
            <Link href="/">
              <Button variant="default" className="px-6">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}