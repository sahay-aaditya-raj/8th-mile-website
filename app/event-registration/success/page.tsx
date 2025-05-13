/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import { getEvent } from '@/data/events';
import { formatCurrency } from '@/lib/utils';

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

          const matchedEvent = getEvent(info.eventId);
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
                if (prop === 'color') (el as HTMLElement).style.color = '#000000';
                else if (prop === 'background') (el as HTMLElement).style.background = '#ffffff';
                else (el as HTMLElement).style.borderColor = '#dddddd';
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
      alert('There was a problem downloading the image. Please try again.');
    }
  };

  const handleDownloadPass = () => {
    downloadImage(passRef, 'event_registration.png');
  };

  const handleDownloadReceipt = () => {
    downloadImage(receiptRef, 'registration_receipt.png');
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading registration details...</p>
        </div>
      </div>
    );
  }

  if (error) return <div className="p-6 text-center text-red-600 font-semibold">{error}</div>;
  if (!registrationInfo) return <div className="p-6 text-center text-gray-700">Loading registration details...</div>;

  return (
    <div className="relative min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: "url('/homepageimages/12.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6 pt-20">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">Registration Successful!</h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Thank you for registering for {eventName}. Your registration has been confirmed.
          </p>

          {/* Registration Pass Card */}
          <div 
            ref={passRef}
            className="relative rounded-2xl border border-white p-6 shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 overflow-hidden bg-gradient-to-br from-purple-900/80 to-blue-900/80"
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
                          <li key={index} className={index === 0 ? "font-bold text-yellow-300" : ""}>
                            {member} {index === 0 ? "(Team Leader)" : ""}
                          </li>
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
              </div>
            </div>

            {/* QR Code */}
            {qrCodeUrl && (
              <div className="flex justify-center mt-2">
                <Link href={`${window.location.origin}/verify-registration?payment_id=${registrationInfo.paymentId}`} className="bg-white p-2 rounded-lg">
                  <img src={qrCodeUrl} alt="QR Code" className="h-32 w-32" />
                  <p className="text-xs text-center text-black mt-1">Scan to verify</p>
                </Link>
              </div>
            )}

            {/* Background Pattern */}
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 opacity-20 blur-2xl"></div>
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-700 opacity-20 blur-2xl"></div>
          </div>

          {/* Receipt Card */}
          <div 
            ref={receiptRef}
            className="relative mt-8 rounded-xl border border-gray-200 p-6 bg-white text-black w-full max-w-md mx-auto"
          >
            <h2 className="text-xl font-bold text-center border-b border-gray-200 pb-2 mb-4">Payment Receipt</h2>
            
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

              {registrationInfo.teamSize && registrationInfo.teamSize > 1 && registrationInfo.teamMembers && registrationInfo.teamMembers.length > 0 && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <span className="font-medium">Team Members:</span>
                  <ol className="list-decimal list-inside mt-1">
                    {registrationInfo.teamMembers.map((member, index) => (
                      <li key={index} className="text-sm">
                        {index === 0 ? <strong>{member} (Team Leader)</strong> : member}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              
              {registrationInfo.amount && (
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(registrationInfo.amount)}</span>
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <div className="text-sm text-gray-500">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p>Time: {new Date().toLocaleTimeString()}</p>
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
              Download Registration
            </Button>
            <Button onClick={handleDownloadReceipt} variant="secondary" className="px-6">
              Download Receipt
            </Button>
            <Button onClick={handleSendEmail} variant="default" className="px-6">
              Send to Email
            </Button>
          </div>

          {/* Back to Events Button */}
          <div className="mt-10">
            <Link href="/">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}