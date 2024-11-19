import styled from "styled-components";
import { theme } from "../../colors/colorts";

export const BodyContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CardContainer = styled.div`
    width: 60vw;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    padding: 20px;
    margin-top: 10px;

    div.graph-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div{
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-around;
            align-items: baseline;
        }
    }
`;

export const Select = styled.select`
    appearance: none;
    padding: 10px;
    font-size: 16px;
    border: 1px solid ${theme.grayscale.spacerLight};
    background-color: ${theme.grayscale.white};
    color: #333;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;

    &:focus {
    outline: none;
    border-color: ${theme.corporate.purple};
    }
`