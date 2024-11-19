export type ProgressType = "smallLine" | "line" | "smallCircle" | "circle";
export type StyleType = "default" | "complete" | "error" | "percent";

export interface ProgressBarProps {
  percents: number;
  type?: ProgressType;
  style?: StyleType;
}