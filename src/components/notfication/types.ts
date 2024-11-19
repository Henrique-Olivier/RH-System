import React from "react";

export type NotificationType = "error" | "warning" | "success" | "inform";
export type ModelType = "toast" | "snackbar" | "informer" | "bunner";

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string;
  describe: string;
  type: NotificationType;
  model: ModelType;
  onClose?: () => void;
  btn1Text?: string;
  btn1Action?: () => void;
  btn2Text?: string;
  btn2Action?: () => void;
}
