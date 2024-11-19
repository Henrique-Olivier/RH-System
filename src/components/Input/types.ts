type size = "default" | "small";

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    height: size;

    textLabel?: string | React.ReactNode;

    textError?: string | React.ReactNode;

    icon?: string;
    disabled?: boolean;
}