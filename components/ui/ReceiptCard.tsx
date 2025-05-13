import React, { forwardRef } from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface BaseInfo {
  name: string;
  email: string;
  phone?: string;
  paymentId: string;
  orderId: string;
  amount?: number;
}

interface PriceBreakdown {
  basePrice?: number;
  gstAmount?: number;
}

interface TeamInfo {
  teamSize?: number;
  teamMembers?: string[];
}

interface DateInfo {
  date?: string;
  time?: string;
}

interface ReceiptCardProps {
  info: BaseInfo & Partial<PriceBreakdown> & Partial<TeamInfo>;
  title: string;
  subtitle: string;
  dateInfo?: DateInfo;
  additionalInfo?: React.ReactNode;
}

export const ReceiptCard = forwardRef<HTMLDivElement, ReceiptCardProps>(
  ({ info, title, subtitle, dateInfo, additionalInfo }, ref) => {
    const today = new Date();

    return (
      <div 
        ref={ref}
        className="relative mt-8 rounded-xl border border-gray-200 p-6 bg-white text-black w-full max-w-md mx-auto"
      >
        <div className="text-xl font-bold text-center border-b border-gray-200 pb-2 mb-4">{title}</div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{info.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">{subtitle.includes('Pass') ? 'Pass Type:' : 'Event:'}</span>
            <span>{subtitle}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">{subtitle.includes('Pass') ? 'Payment ID:' : 'Registration ID:'}</span>
            <span className="text-sm">{info.paymentId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Order ID:</span>
            <span className="text-sm">{info.orderId}</span>
          </div>
          
          {/* Team Details if applicable */}
          {info.teamSize && info.teamSize > 1 && (
            <div className="flex justify-between">
              <span className="font-medium">Team Size:</span>
              <span>{info.teamSize} members</span>
            </div>
          )}

          {info.teamSize && info.teamSize > 1 && info.teamMembers && info.teamMembers.length > 0 && (
            <div className="border-t border-gray-200 pt-2 mt-2">
              <span className="font-medium">Team Members:</span>
              <ol className="list-decimal list-inside mt-1">
                {info.teamMembers.map((member, index) => (
                  <li key={index} className="text-sm">
                    {index === 0 ? <strong>{member} (Team Leader)</strong> : member}
                  </li>
                ))}
              </ol>
            </div>
          )}
          
          {additionalInfo}
          
          {/* Price Breakdown */}
          {info.amount && (
            <>
              {(info.basePrice || info.gstAmount) && (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Base Price:</span>
                    <span>{formatCurrency(info.basePrice || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST:</span>
                    <span>{formatCurrency(info.gstAmount || 0)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold">
                <span>Total Amount:</span>
                <span>{formatCurrency(info.amount)}</span>
              </div>
            </>
          )}
          
          <div className="flex justify-end mt-4">
            <div className="text-sm text-gray-500">
              <p>Date: {dateInfo?.date || today.toLocaleDateString()}</p>
              {(dateInfo?.time || !dateInfo) && (
                <p>Time: {dateInfo?.time || today.toLocaleTimeString()}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 opacity-20">
          <div className="relative h-16 w-16">
            <Image src="/8thmilelogocolour.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>
      </div>
    );
  }
);

ReceiptCard.displayName = 'ReceiptCard';