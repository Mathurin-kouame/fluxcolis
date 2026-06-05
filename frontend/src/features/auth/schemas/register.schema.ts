
import { z } from "zod";
export const registerSchema = z.object({
    name: z.string().trim().min(3, "Le nom complet est requis").refine(
        (value) => value.split(/\s+/).length >= 2,
        "Veuillez saisir votre nom complet (prénom et nom)"
    ),
    
    email: z.email("Email invalide"),

    password: z.string()
        .min(6, "Minimum 6 caractères")
        .regex(/[A-Z]/, "Une majuscule requise")
        .regex(/[a-z]/, "Une majuscule requise")
        .regex(/[0-9]/, "Un chiffre requis")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Au moins un caractère spécial est requis"),
    
    confirmPassword: z.string().min(6, "Veuillez confirmer votre mot de passe"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mot de passe non conforme",
        path: ["confirmPassword"],
    })

export type RegisterFormData = z.infer<typeof registerSchema>;
