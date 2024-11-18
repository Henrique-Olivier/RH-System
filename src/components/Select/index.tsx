import Typography from "../Typography";
import { SelectContainer, SelectElement } from "./styles";
import { selectType } from "./types";

export default function Select({ htmlFor, id, textLabel, textError, children, ...props }: selectType) {
    return (
        <SelectContainer $error={textError}>
            <label htmlFor={htmlFor}>
                <Typography variant="body-M">{textLabel ?? ""}</Typography>
                <SelectElement $error={textError} id={id} {...props}>
                    {children}
                </SelectElement>
            </label>
            <Typography variant="body-XS">{textError ?? ""}</Typography>
        </SelectContainer>
    );
}