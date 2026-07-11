import type { ReactNode } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  icon?: ReactNode;
}