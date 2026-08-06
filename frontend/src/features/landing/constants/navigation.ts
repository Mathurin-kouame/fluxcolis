import { Box, Building2, ChartNoAxesCombined, Settings, ShieldCheck, Smile, Users, Van } from "lucide-react";

export interface NavLink {
    label: string;
    path: string;
    type: "route" | "anchor"
}

export interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
}


export const NAV_LINK: NavLink[] = [
    { label: "Accueil", path: "#home", type:"anchor" },
    { label: "Fonctionnalité", path: "#features", type:"anchor" },
    { label: "A propos", path: "#about" , type:"anchor"},
    { label: "Contact", path: "#contact",  type:"anchor"},
    { label: "Suivi", path: "/tracking" , type:"route"},
];

export const STATS = [
    {
        title: "10k+",
        subtitle: "Colis gérés",
        icon: Box,
    },
     
    {
        title: "2k+",
        subtitle: "Utilisateurs actifs",
        icon: Users,
    },

    {
        title: "500+",
        subtitle: "Entreprises",
        icon: Building2,
    },
    
    {
        title: "98%",
        subtitle: "Satisfaction",
        icon: Smile,
    },
]

export const FEATURES = [
    {
        title: "Gestion des colis",
        description: "Ajoutez, modifiez et suivez tous vos colis en un seul endroit.",
        icon: Box,
    },
    {
        title: "suivez  en temps réel",
        description: "suivez vos colis à chaque étape de la livraison.",
        icon: Van,
    },
    {
        title: "Gestion  des clients",
        description: "Gérez vos destinataires et l'histoirique des livraisons.",
        icon: Users,
    },
    {
        title: "Rapports détaillés",
        description: "Analysez vos performances avec des rapports complets.",
        icon: ChartNoAxesCombined,
    },
    {
        title: "Sécurité avancée",
        description: "Vos données sont sécuritées avec les meilleurs pratiques.",
        icon: ShieldCheck,
    },
    {
        title: "Personalisation",
        description: "Adaptez l'Application à votre Entreprise.",
        icon: Settings,
    }
]


