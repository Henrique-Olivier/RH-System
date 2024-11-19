import * as S from "./style";
import { propsEmpty } from "./types";

function Empty({ icon, text, children }: propsEmpty){
    return(
        <S.ContainerEmpty>
            <S.IconEmpty src={icon} />
            <p>{text}</p>
            {children}
        </S.ContainerEmpty>
    );
}

export default Empty;