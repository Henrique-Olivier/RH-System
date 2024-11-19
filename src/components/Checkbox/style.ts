import styled from "styled-components";
import { theme } from "../colors/colorts";

export const Container = styled.div`
    display: flex;
    gap: 5px;
`;

export const InputElement = styled.input<{ $error?:boolean }>`
    display: none;

    &:checked +label svg path{
        fill: ${theme.corporate.purple};
    }

    &:disabled +label{
        background-color: ${theme.grayscale.disabled};
        border: 1px solid ${theme.grayscale.border} !important
    }

    &:disabled:checked +label{
        svg path{
            fill: ${theme.grayscale.border};
        }
        background-color: ${theme.grayscale.disabled};
    }

    +label{
        border: 1px solid ${props => props.$error ? theme.informing.error : theme.grayscale.border};
        background-color: ${props => props.$error ? "#E8A1B6" : null};
    }

    &:checked +label{
        svg path{
            fill: ${props => props.$error ? theme.informing.error : null} !important;
        }
    }

    &:checked:disabled +label{
        svg path{
            fill: ${props => props.$error ? theme.grayscale.border : null} !important;
        }
    }

`;

export const LabelElement = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    //border: 1px solid ${theme.grayscale.border};
    position: relative;
    cursor: pointer;
`;