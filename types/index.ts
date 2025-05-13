// src/types/index.ts
export interface Pass {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  type: string;
  primaryImage: string;
  galleryImages?: string[];
  isTeamEvent?: boolean;
  minTeamSize?: number;
  maxTeamSize?: number;
  paymentType?: 'per_person' | 'per_team';
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
  noOfParticipants?: number;
  participantsName?: string[];
}

export interface Event {
  id: string;
  photoPath: string;
  slug: string;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  prizes: string[];
  teamsize: string;
  maxParticipants: number;
  registrationFee: string;
  guidelines: string[];
  contact: { name: string; phone: string }[];
  registrationDeadline: string;
  currentRegistrations: number;
  registrationOpen: boolean;
}