import React, { useState } from "react";
import { CustomInputProps } from "./types";
import * as S from "./style";

function showLabel(textLabel:  React.ReactNode | string | undefined) {
    return textLabel ? <label htmlFor="text">{textLabel}</label> : null;
};

function showError(textError: React.ReactNode | string | undefined) {
    return textError ? <p>{textError}</p> : null;
};

function Input({ type, height, textLabel, textError, icon, disabled=false, ...props }: CustomInputProps){
    const [isActive, setIsActive] = useState(false);

    return(
        <S.InputContainer $error={textError} $disable={disabled} $isActive={isActive}>
            {showLabel(textLabel)}
            <div>
                <S.InputComponent
                type={type}
                $size={height}
                disabled={disabled}
                onFocus={() => setIsActive(!isActive)}
                onBlur={() => setIsActive(!isActive)}
                {...props}
                />

                <S.Icon $src={icon} $disable={disabled} />
            </div>
            {showError(textError)}
        </S.InputContainer>
    )
};

export default Input;