import Typography from "../Typography";
import { SelectContainer, SelectElement } from "./styles";
import { selectType } from "./types";

export default function Select({ height, htmlFor, id, textLabel, textError, children, ...props }: selectType) {
    return(
        <SelectContainer $error={textError}>
            <label htmlFor={htmlFor}>
                <Typography variant="body-M">{textLabel ?? ""}</Typography>
            </label>
            <SelectElement $size={height} $error={textError} id={id} {...props}>
                {children}
            </SelectElement>
            <Typography variant="body-XS">{textError ?? ""}</Typography>
        </SelectContainer>
    );
}