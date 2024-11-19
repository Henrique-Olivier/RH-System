import styled from "styled-components"
import { theme } from "../colors/colorts"

export const MenuImg = styled.img`
width: 50px;
height: 50px;
position: absolute;
translate: transform(-50%,-50%);
top: 1%;
left: 1%;
cursor: pointer;
`

export const CloseBtn = styled.img`
width: 20px;
height: 20px;
cursor: pointer;
`

export const SidebarContainer = styled.aside<{ $isVisible: boolean }>`
width: 300px;
height: 100vh;
background-color: ${theme.grayscale.bgLightGrey};
position: absolute;
z-index: 9997;
left: ${props => props.$isVisible ? '0%' : '-100%'};
padding: 15px;
display: flex;
flex-direction: column;
align-items: end;
transition: all 0.4s;
gap: 20px;
`

export const SidebarContent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: start;
justify-content: start;
gap: 25px;

    button {
    margin-left: 20px;
    }
`

export const Overlay = styled.div<{ $isVisible: boolean }>`
position: absolute;
display: ${p => p.$isVisible ? 'block' : 'none'};
transition: all 0.4s;
z-index: 9996;
width: 100vw;
height: 100vh;
background-color: rgba(26, 20, 31, 0.7);
opacity: ${p => p.$isVisible ? '70%' : '0%'};
`