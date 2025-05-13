'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { getEvent } from '@/data/events';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';
import QRCode from 'qrcode';

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
    downloadImage(passRef, 'event_registration.png');
  };

  const handleDownloadReceipt = () => {
    downloadImage(receiptRef, 'registration_receipt.png');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Verifying registration...</p>
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

  if (!registrationInfo || !verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="bg-black border border-red-500 rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-red-400">Registration information could not be verified.</p>
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

  // Format registration date
  const registrationDate = registrationInfo.createdAt 
    ? new Date(registrationInfo.createdAt).toLocaleDateString() 
    : 'N/A';
    
  const registrationTime = registrationInfo.createdAt
    ? new Date(registrationInfo.createdAt).toLocaleTimeString()
    : '';

  return (
    <div className="relative min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: "url('/homepageimages/12.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6 pt-20">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">Registration Verified</h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Your registration for {eventName} has been confirmed.
          </p>

          {/* Registration Pass Card */}
          <div 
            ref={passRef}
            className="relative rounded-2xl border border-white p-6 shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 overflow-hidden bg-gradient-to-br from-green-900/80 to-emerald-900/80"
          >
            {/* Logo and Event Name */}
            <div className="flex justify-between items-center">
              <div className="relative h-16 w-16">
                <Image src="/8thmilelogocolour.png" alt="Logo" fill className="object-contain" />
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-white">Event Registration</h2>
                <p className="text-lg text-yellow-300">{eventName}</p>
              </div>
            </div>

            {/* Participant Details */}
            <div className="text-white space-y-1 relative z-10">
              <h3 className="font-semibold text-lg">Participant</h3>
              <p className="font-semibold">{registrationInfo.name}</p>
              <p className="text-sm">{registrationInfo.email}</p>
              {registrationInfo.phone && <p className="text-sm">{registrationInfo.phone}</p>}
              
              {/* Team Details */}
              {registrationInfo.teamSize && registrationInfo.teamSize > 1 && (
                <div className="mt-2">
                  <h3 className="font-semibold">Team Size: {registrationInfo.teamSize}</h3>
                  {registrationInfo.teamMembers && registrationInfo.teamMembers.length > 0 && (
                    <div className="text-sm">
                      <p className="font-semibold mt-1">Team Members:</p>
                      <ul className="list-disc list-inside">
                        {registrationInfo.teamMembers.map((member, index) => (
                          <li key={index}>{member}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Payment Details */}
              <div className="mt-4 pt-3 border-t border-white/20">
                <p className="text-sm">Registration ID: {registrationInfo.paymentId}</p>
                <p className="text-sm">Order ID: {registrationInfo.orderId}</p>
                {registrationInfo.amount && (
                  <p className="text-sm mt-1">
                    Amount Paid: {formatCurrency(registrationInfo.amount)}
                  </p>
                )}
                <p className="text-sm mt-1">
                  Registered On: {registrationDate} {registrationTime}
                </p>
                <p className="text-green-300 font-bold mt-2">Status: VALID</p>
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
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-r from-green-500 to-teal-700 opacity-20 blur-2xl"></div>
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-r from-teal-500 to-green-700 opacity-20 blur-2xl"></div>
          </div>

          {/* Receipt Card */}
          <div 
            ref={receiptRef}
            className="relative mt-8 rounded-xl border border-gray-200 p-6 bg-white text-black w-full max-w-md mx-auto"
          >
            <h2 className="text-xl font-bold text-center border-b border-gray-200 pb-2 mb-4">Registration Receipt</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{registrationInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Event:</span>
                <span>{eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Registration ID:</span>
                <span className="text-sm">{registrationInfo.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span className="text-sm">{registrationInfo.orderId}</span>
              </div>
              
              {registrationInfo.teamSize && registrationInfo.teamSize > 1 && (
                <div className="flex justify-between">
                  <span className="font-medium">Team Size:</span>
                  <span>{registrationInfo.teamSize} members</span>
                </div>
              )}
              
              {registrationInfo.amount && (
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(registrationInfo.amount)}</span>
                </div>
              )}
              
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>Registration Date:</span>
                <span>{registrationDate}</span>
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
              Download Registration
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