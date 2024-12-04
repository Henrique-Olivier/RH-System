import styled from "styled-components";
import { theme } from "../../components/colors/colorts";

export const BodyContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ListingContainer = styled.div`
    width: 100%;
    max-width: 780px;
    background-color: ${theme.grayscale.bgLightGrey};
    border-radius: 10px;
    padding: 10px 15px;
    box-shadow: 0px 0px 20px 0px ${theme.grayscale.spacer};

    table{
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td{
        text-align: start;
        padding: 10px 5px;
    }
`;