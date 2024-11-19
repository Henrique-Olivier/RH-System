import styled from "styled-components";
import { theme } from "../colors/colorts";

export const UlListWrapper = styled.ul`
    list-style: none;
    >div{
        display: flex;
        align-items: center;
        margin: 8px 0;
    }

    div.marked{
        width: 8px;
        height: 8px;
        background-color: ${theme.corporate.purple};
        border-radius: 2px;
        margin-right: 12px;
    }
`;

export const OlListWrapper = styled.ol`
    list-style: none;
    >div{
        display: flex;
        align-items: center;
        margin: 8px 0;
    }

    div.marked{
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        margin-right: 12px;
        color: ${theme.corporate.purple};
    }
`;