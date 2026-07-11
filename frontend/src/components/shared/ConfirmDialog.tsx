import type { ConfirmDialogProps } from "@/types/types-glx/confirmDialog"
import { X } from "lucide-react";

export const ConfirmDialog = ({ open, title, description, confirmText, cancelText, isPending, icon, onConfirm, onClose }: ConfirmDialogProps) => {
    if (!open) return null;
      
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white border border-red-600 shadow-lg z-10">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        {icon}
                        <h2 className="text-lg font-semibold">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-blue-200 cursor-pointer text-blue-500"
                    >
                        <X size={18}/>
                    </button>
                </div>

                <div className="p-4"> 
                    <p className="text-sm text-slate-600">{ description}</p>
                </div>

                <div className="flex justify-end gap-2 p-4">
                    <button
                        onClick={onClose}
                        disabled={isPending}
                        className="rounded-lg border border-blue-400 px-4 py-2 text-sm hover:bg-slate-50 hover:text-blue-600 cursor-pointer"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isPending}
                        className="rounded-lg border border-red-400 px-4 py-2 text-sm  hover:bg-red-600 hover:text-white disabled:opacity-50 cursor-pointer"
                    >
                        {isPending ? "Suppression ..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}