import { size } from "./types";
import { styleMapping } from "./style";

function changeStyle(variant: size) {
    return styleMapping.variant[variant];
}

function Typography({variant, children}: {variant: size, children: string}){
    const ResponsiveText = changeStyle(variant);
    return(
        <ResponsiveText>
            {children}
        </ResponsiveText>
    )
};

export default Typography;