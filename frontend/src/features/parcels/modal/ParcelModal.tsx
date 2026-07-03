import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ParcelModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    title: string;
    description: string;
    children: ReactNode;

}

export const ParcelModal = ({ isOpen, setIsOpen, title, description, children }: ParcelModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 transition-opacity rounded-2xl flex items-center justify-center"
                onClick={() => setIsOpen(false)}
            >
                {/* Modal  box*/}
                <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-lg z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4  text-slate-400">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                {title}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                {description}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-full hover:bg-blue-500 hover:text-white text-blue-500 transition cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}