'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EventRegistrationFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [eventId, setEventId] = useState<string | null>(null);
  
  useEffect(() => {
    const error = searchParams.get('error');
    const event = searchParams.get('eventId');
    
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    } else {
      setErrorMessage('Your registration could not be completed.');
    }
    
    if (event) {
      setEventId(event);
    }
  }, [searchParams]);

  const handleRetry = () => {
    if (eventId) {
      router.push(`/event-registration?eventId=${eventId}`);
    } else {
      router.push('/events');
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: "url('/homepageimages/12.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-xl w-full bg-black bg-opacity-70 p-8 rounded-lg border border-red-500 shadow-lg">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative h-24 w-24">
                <Image src="/8thmilelogocolour.png" alt="Logo" fill className="object-contain opacity-50" />
              </div>
            </div>
            
            <div className="text-red-500 text-6xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Registration Failed</h1>
            <p className="text-red-300 mb-6">{errorMessage}</p>
            
            <div className="bg-gray-800 p-4 rounded mb-6">
              <h2 className="text-white font-medium mb-2">What you can do:</h2>
              <ul className="text-gray-300 text-left list-disc list-inside space-y-2">
                <li>Check your internet connection and try again</li>
                <li>Verify your payment information is correct</li>
                <li>Contact our support team if the problem persists</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
              
              <Link href="/events">
                <Button variant="outline" className="text-white border-white">
                  Back to Events
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="secondary">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}