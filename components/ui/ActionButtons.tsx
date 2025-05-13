import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { generateAndDownloadImage } from '@/lib/dom-to-image-utils';

interface ActionButtonsProps {
  onDownloadPass?: () => void;
  onDownloadReceipt?: () => void;
  onSendEmail?: () => void;
  showEmailButton?: boolean;
  backUrl?: string;
  passButtonText?: string;
  receiptButtonText?: string;
  passRef?: React.RefObject<HTMLDivElement>;
  receiptRef?: React.RefObject<HTMLDivElement>;
  passFilename?: string;
  receiptFilename?: string;
}

export function ActionButtons({
  onDownloadPass,
  onDownloadReceipt,
  onSendEmail,
  showEmailButton = false,
  backUrl = '/',
  passButtonText = 'Download Pass',
  receiptButtonText = 'Download Receipt',
  passRef,
  receiptRef,
  passFilename = 'event-pass.png',
  receiptFilename = 'receipt.png'
}: ActionButtonsProps) {
  const [isGeneratingPass, setIsGeneratingPass] = useState(false);
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleDownloadPass = async () => {
    if (onDownloadPass) {
      onDownloadPass();
    }
    
    if (passRef?.current) {
      setIsGeneratingPass(true);
      try {
        await generateAndDownloadImage(passRef.current, passFilename);
      } catch (err) {
        console.error('Error downloading pass:', err);
      } finally {
        setIsGeneratingPass(false);
      }
    }
  };

  const handleDownloadReceipt = async () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    }
    
    if (receiptRef?.current) {
      setIsGeneratingReceipt(true);
      try {
        await generateAndDownloadImage(receiptRef.current, receiptFilename);
      } catch (err) {
        console.error('Error downloading receipt:', err);
      } finally {
        setIsGeneratingReceipt(false);
      }
    }
  };

  const handleSendEmail = async () => {
    if (onSendEmail) {
      setIsSendingEmail(true);
      try {
        await onSendEmail();
      } finally {
        setIsSendingEmail(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
        {(onDownloadPass !== undefined || passRef) && (
          <Button 
            onClick={handleDownloadPass} 
            variant="secondary" 
            className="px-6"
            disabled={isGeneratingPass}
          >
            {isGeneratingPass ? 'Generating...' : passButtonText}
          </Button>
        )}
        
        {(onDownloadReceipt !== undefined || receiptRef) && (
          <Button 
            onClick={handleDownloadReceipt} 
            variant="secondary" 
            className="px-6"
            disabled={isGeneratingReceipt}
          >
            {isGeneratingReceipt ? 'Generating...' : receiptButtonText}
          </Button>
        )}
        
        {showEmailButton && onSendEmail && (
          <Button 
            onClick={handleSendEmail} 
            variant="default" 
            className="px-6"
            disabled={isSendingEmail}
          >
            {isSendingEmail ? 'Sending...' : 'Send to Email'}
          </Button>
        )}
      </div>

      {backUrl && (
        <div className="mt-10">
          <Link href={backUrl}>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Back to Home
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}