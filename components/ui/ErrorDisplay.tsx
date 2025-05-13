import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
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