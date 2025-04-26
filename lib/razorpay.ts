/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/razorpay.ts
import { loadScript } from '@/lib/utils';

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  handler?: (response: any) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface OrderData {
  id: string;
  amount: number;
  currency: string;
}

export async function initializeRazorpay(): Promise<boolean> {
  return await loadScript('https://checkout.razorpay.com/v1/checkout.js');
}

export function openRazorpayCheckout(options: RazorpayOptions): void {
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}