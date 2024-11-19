import React, { ReactElement } from "react";

export interface ModalProps {
    children: React.ReactNode;
    isVisible: boolean;
    onClose: () => void;
    img?: string;
    action?: ReactElement<HTMLButtonElement>;
  }
  