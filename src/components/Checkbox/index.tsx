import * as S from "./style";
import { CheckboxProps } from "./types";

function CheckedIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="none"
        viewBox="0 0 10 10"
      >
        <g clipPath="url(#clip0_3231_5)">
          <path
            fill="transparent"
            d="M3.396 8.582l-3.25-3.25a.5.5 0 010-.707l.708-.707a.5.5 0 01.707 0l2.189 2.19 4.69-4.69a.5.5 0 01.706 0l.708.707a.5.5 0 010 .707l-5.75 5.75a.5.5 0 01-.708 0z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_3231_5">
            <path fill="#fff" d="M0 0H10V10H0z"></path>
          </clipPath>
        </defs>
      </svg>
    );
}

function UndefinedIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="2"
        fill="none"
        viewBox="0 0 10 2"
      >
        <path fill="transparent" d="M0 0H10V2H0z"></path>
      </svg>
    );
}

function Checkbox({ type="default", id, error=false, ...props }: CheckboxProps){
    return(
        <S.Container>
            <S.InputElement $error={error} id={id} type="checkbox" {...props}/>
            <S.LabelElement htmlFor={id}>{type === "default" ? <CheckedIcon/> : <UndefinedIcon/>}</S.LabelElement>
        </S.Container>
    );
}

export default Checkbox;