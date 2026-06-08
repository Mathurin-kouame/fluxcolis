
export type Role = 'ADMIN' | 'EMPLOYEE';

export type ParcelStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}
export interface Parcel {
  id: string;
  trackingNumber: string;
  description: string;
  weight: number | null;
  senderName: string;
  recipientName: string;
  recipientPhone: string;
  destination: string;
  status: ParcelStatus;
  userId: string; // Représente l'employé assigné (Stratégie Choix A)
  user?: Partial<User>; // Inclus optionnellement par findMany/findOne (Admin)
  createdAt: string;
  updatedAt: string;
}
export interface TrackingHistory {
  id: string;
  location: string;
  note: string | null;
  status: ParcelStatus;
  parcelId: string;
  createdAt: string;
}

export interface CreateParcelInput {
  description: string;
  weight?: number;
  senderName: string;
  recipientName: string;
  recipientPhone: string;
  destination: string;
  employeeId: string; // L'identifiant de l'employé assigné par l'Admin
}

export interface UpdateParcelInput {
  description?: string;
  weight?: number;
  senderName?: string;
  recipientName?: string;
  recipientPhone?: string;
  destination?: string;
}

export interface LoginInput {
  email: string;
  password?: string;
}

export interface UpdateParcelStatusInput {
  status: ParcelStatus;
  location?: string;
  note?: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  inTransit: number;
  delivered: number;
  cancelled: number;
}

export interface PublicTrackingResponse {
  trackingNumber: string;
  status: ParcelStatus;
  destination: string;
  createdAt: string;
  history: TrackingHistory[];
}

export interface LatestParcelRow {
  id: string;
  trackingNumber: string;
  recipientName: string;
  status: ParcelStatus;
  destination: string;
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}