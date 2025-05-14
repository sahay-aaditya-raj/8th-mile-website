/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface BaseInfo {
  name: string;
  email: string;
  phone?: string;
  paymentId: string;
  orderId: string;
  amount?: number;
}

interface TeamInfo {
  teamSize?: number;
  teamMembers?: string[];
}

interface VerificationCardProps {
  info: BaseInfo & Partial<TeamInfo>;
  title: string;
  subtitle: string;
  qrCodeUrl: string | null;
  gradientClasses?: string;
  verificationUrl?: string;
  additionalInfo?: React.ReactNode;
}

export const VerificationCard = forwardRef<HTMLDivElement, VerificationCardProps>(
  ({ 
    info, 
    title, 
    subtitle, 
    qrCodeUrl,
    gradientClasses = "from-blue-900/80 to-purple-900/80",
    verificationUrl,
    additionalInfo
  }, ref) => {
    // Create explicit style to avoid oklch color problems during image generation
    const backgroundStyle: CSSProperties = {
      background: `linear-gradient(to bottom right, rgb(30, 58, 138, 0.8), rgb(91, 33, 182, 0.8))`,
    };

    // If custom gradient is provided, use the class instead
    const bgClass = `bg-gradient-to-br ${gradientClasses}`;

    return (
      <div 
        ref={ref}
        className={`relative rounded-2xl border border-white p-6 shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 overflow-hidden ${bgClass}`}
        style={gradientClasses === "from-blue-900/80 to-purple-900/80" ? backgroundStyle : undefined}
      >
        {/* Logo and Title */}
        <div className="flex justify-between items-center">
          <div className="relative h-16 w-16">
            <Image src="/8thmilelogocolour.png" alt="Logo" fill className="object-contain" />
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-white">{title}</div>
            <p className="text-lg text-yellow-300">{subtitle}</p>
          </div>
        </div>

        {/* Details */}
        <div className="text-white space-y-1 relative z-10">
          <h3 className="font-semibold text-lg">Participant</h3>
          <p className="font-semibold">{info.name}</p>
          <p className="text-sm">{info.email}</p>
          {info.phone && <p className="text-sm">{info.phone}</p>}
          
          {/* Team Details if applicable */}
          {info.teamSize && info.teamSize > 1 && (
            <div className="mt-2">
              <h3 className="font-semibold">Team Size: {info.teamSize}</h3>
              {info.teamMembers && info.teamMembers.length > 0 && (
                <div className="text-sm">
                  <p className="font-semibold mt-1">Team Members:</p>
                  <ul className="list-disc list-inside">
                    {info.teamMembers.map((member, index) => (
                      <li key={index} className={index === 0 ? "font-bold text-yellow-300" : ""}>
                        {member} {index === 0 ? "(Team Leader)" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Additional Info */}
          {additionalInfo}
          
          {/* Payment Details */}
          <div className="mt-4 pt-3 border-t border-white/20">
            <p className="text-sm">Payment ID: {info.paymentId}</p>
            <p className="text-sm">Order ID: {info.orderId}</p>
            {info.amount && (
              <p className="text-sm mt-1">
                Amount Paid: {formatCurrency(info.amount)}
              </p>
            )}
          </div>
        </div>

        {/* QR Code */}
        {qrCodeUrl && (
          <div className="flex justify-center mt-2">
            {verificationUrl ? (
              <Link href={verificationUrl} className="bg-white p-2 rounded-lg">
                <img src={qrCodeUrl} alt="QR Code" className="h-32 w-32" />
                <p className="text-xs text-center text-black mt-1">Scan to verify</p>
              </Link>
            ) : (
              <div className="bg-white p-2 rounded-lg">
                <img src={qrCodeUrl} alt="QR Code" className="h-32 w-32" />
                <p className="text-xs text-center text-black mt-1">Scan to verify</p>
              </div>
            )}
          </div>
        )}

        {/* Background Pattern */}
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500 to-cyan-700 opacity-20 blur-2xl"></div>
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-700 opacity-20 blur-2xl"></div>
      </div>
    );
  }
);

VerificationCard.displayName = 'VerificationCard';