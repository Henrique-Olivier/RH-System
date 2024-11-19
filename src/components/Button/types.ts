export type typeVariant = 'main' | 'secondary' | 'text' | 'link';
export type typeSize = 'large' | 'medium' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
    variant: typeVariant;
    size: typeSize;
    icon?: string;
    disabled?: boolean;
}