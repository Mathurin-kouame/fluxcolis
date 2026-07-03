import type { Parcel } from "@/types";
import type { ParcelFormData } from "../schemas/createParcelSchema";

export const getParcelDefaultValues = (parcel: Parcel): ParcelFormData => ({
  description: parcel.description,
  senderName: parcel.senderName,
  recipientName: parcel.recipientName,
  recipientPhone: parcel.recipientPhone,
  destination: parcel.destination,
  employeeId: parcel.userId,
  weight: parcel.weight ?? undefined,
})
   