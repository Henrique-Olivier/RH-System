import { ReactNode } from "react";

export default function Conditional({ condition, children }: { condition: boolean, children: ReactNode }) {
    if(condition) {
        return (<>{children}</>);
    } else {
        return null;
    }
}