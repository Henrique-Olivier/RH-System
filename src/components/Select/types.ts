import { ReactNode } from "react";

export interface selectType extends React.SelectHTMLAttributes<HTMLSelectElement> {
    htmlFor?: string,
    id?: string,
    textLabel?: string,
    textError?: string,
    children: ReactNode
}