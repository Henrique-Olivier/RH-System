import styled from "styled-components";
import { theme } from "../../colors/colorts";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

    div.form,
    input{
        width: 90%;
        padding: 20px;
        max-width: 375px;
        
        >div{
            width: 100%;
            margin-top: 15px;
        }
    }
`;

export const WrapperForm = styled.div`
    background-color: ${theme.grayscale.bgLightGrey};
    border-radius: 20px;

    h2{
        text-align: center;
    }

    div.link-login p{
        text-align: center;
    }
`;

export const ContainerButton = styled.div`
    display: flex;
    justify-content: center;

    button > div{
        display: none;
    }

    button.show > div{
        display: block;
    }
`;