
import z from "zod";

export const ParcelSchema = z.object({
    description: z.string().min(1, "Description requise"),
    weight: z.number().optional(),
    senderName: z.string().min(1),
    recipientName: z.string().min(1),
    recipientPhone: z.string().min(1),
    destination: z.string().min(1),
    employeeId: z.string().min(1, "Employé requis"),
});

export type ParcelFormData = z.infer<typeof ParcelSchema>