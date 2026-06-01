import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    icon?: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset"
}

export default function Button({
    children,
    variant = "primary",
    icon,
    onClick,
    type = "button",
}: ButtonProps) {
    const baseStyle = "px-4 py-3 rounded-xl transition-all font-semibold flex items-center gap-2 cursor-pointer";
    const variants = {
        primary: "text-white bg-blue-600 hover:bg-blue-700 border hover:border-blue-50 shadow-xl shadow-blue-500/30",
        secondary: "px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 transition-all font-semibold flex items-center gap-2 cursor-pointer"
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]}`}
        >
            {children}
            { icon}
        </button>
    )
}