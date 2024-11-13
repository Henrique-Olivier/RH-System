import styled from "styled-components";
import { theme } from "../colors/colorts";

export const SelectContainer = styled.div`
    width: 100%;
    height: 44px;
    `;

export const SelectElement = styled.select`
    border: 1px solid ${theme.grayscale.disabled};
    width: 100%;
    height: 100%;
`;