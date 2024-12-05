import styled from "styled-components";
import { theme } from "../../components/colors/colorts";

export const BodyContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    table{
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td{
        text-align: start;
        padding: 10px 5px;
    }

    td.action-btn{
        display: flex;
        justify-content: center;

        button{
            margin-left: 10px;
        }
    }

    div.vacancy{
        width: 100%;
    }

    .alert{
        transition: bottom .5s;
        position: absolute;
        margin: 15px 0;
    }

    .alert.close{
        bottom: 100%;
        z-index: 5;
    }

    .alert.open{
        bottom: 80%;
    }
`;

export const ListingContainer = styled.div`
    width: 100%;
    max-width: 780px;
    background-color: ${theme.grayscale.bgLightGrey};
    border-radius: 10px;
    padding: 10px 15px;
    box-shadow: 0px 0px 20px 0px ${theme.grayscale.spacer};
`;