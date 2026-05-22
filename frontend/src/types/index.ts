export interface CreateParcelInput {
  description: string;
  weight?: number;
  senderName: string;
  recipientName: string;
  recipientPhone: string;
  destination: string;
  employeeId: string; // L'identifiant de l'employé assigné par l'Admin
}