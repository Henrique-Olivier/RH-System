export type AvatarTypes = "default" | "picture" | "initials";
export type AvatarColorTypes =
  | "default"
  | "purpleGradient"
  | "lightPurpleGradient"
  | "greenGradient"
  | "pinkGradient"
  | "orangeGradient";

export interface AvatarProps {
  type: AvatarTypes;
  color?: AvatarColorTypes;
  img?: string;
  initial?: string;
  fontSize?: string;
}
