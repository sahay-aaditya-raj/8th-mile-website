// src/types/index.ts
export interface Pass {
  id: string;
  name: string;
  description: string;
  price: number; // in paise
  features?: string[];
  type?: string;
}

export interface PaymentInfo {
  orderId: string;
  paymentId: string;
  signature: string;
  name: string;
  email: string;
  phone?: string;
  passId: string;
  amount: number;
  basePrice?: number;
  gstAmount?: number;
  status?: string;
}