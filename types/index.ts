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

export interface Contact {
  name: string;
  phone: string;
  email?: string;
}

export interface Event {
  _id: string; // Event ID like "photo-com"
  photoPath?: string;
  slug: string;
  name: string;
  description?: string;
  date?: string;
  time?: string;
  venue?: string;
  category?: 'Cultural' | 'Technical' | 'Gaming';
  prizes?: string[];
  teamsize?: string;
  registrationFee?: number;
  feetype?: 'individuals' | 'team';
  guidelines?: string[];
  contact?: Contact[];
  registrationDeadline?: string;
  registrationOpen?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
