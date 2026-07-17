import type { ReactNode } from "react";


interface ActionButtonProps {
    tooltip: string;
    icon: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}


export const ActionButton = ({tooltip, icon, className="", onClick,}:ActionButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`group relative flex p-1 transition-colors cursor-pointer ${className}`}
        >
            {icon}     
            <span
         className="
          pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2
          mb-2 scale-0 opacity-0 rounded bg-slate-800 px-2 py-1 text-xs text-white
          group-hover:scale-100 group-hover:opacity-100
          transition-all duration-150 origin-bottom whitespace-nowrap z-50 shadow-md
          before:content-[''] before:absolute before:top-full before:left-1/2
          before:-translate-x-1/2 before:border-4 before:border-transparent
          before:border-t-slate-800"
            >
             {tooltip}
            </span>
        </button>
    )
}