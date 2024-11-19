export type checkboxType = "default" | "undefined";
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    error?: boolean;
    type?: checkboxType;
}