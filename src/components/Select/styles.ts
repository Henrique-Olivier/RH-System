import styled from "styled-components";
import { theme } from "../colors/colorts";

export const SelectContainer = styled.div<{ $error: string | undefined}>`
    width: 100%;
    height: 44px;

    p:first-child{
        margin-bottom: 5px;
    }

    p:last-child{
        text-align: end;
        color: ${props => props.$error ? theme.informing.error : theme.grayscale.black}
    }

    &:hover::before {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

export const SelectElement = styled.select<{ $error: string | undefined}>`
    border: ${props => props.$error ? `1px solid ${theme.informing.error}` : `1px solid ${theme.grayscale.disabled}`};
    width: 100%;
    height: 100%;
    border-radius: 0;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 10px;
    margin-right: 2rem;
    padding-left: 10px;
    padding-right: 2rem;

    &:focus {
        outline: none;
        border-color: ${theme.corporate.purple};
    }

    &:disabled{
        background-color: ${theme.grayscale.disabled};
    }

    &:hover{
        cursor: pointer;
    }
`;