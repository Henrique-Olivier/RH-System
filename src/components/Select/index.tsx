import Typography from "../Typography";
import { SelectContainer, SelectElement } from "./styles";
import { selectType } from "./types";

export default function Select({ htmlFor, id, textLabel, textError, children, ...props }: selectType) {
    return(
        <SelectContainer>
            <label htmlFor={htmlFor}>
                <Typography variant="body-XS">{textLabel}</Typography>
                <SelectElement id={id} {...props}>
                    {children}
                </SelectElement>
            </label>
            <Typography variant="body-XS">{textError}</Typography>
        </SelectContainer>
    );
}