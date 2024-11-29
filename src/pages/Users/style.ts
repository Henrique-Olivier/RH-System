import styled from "styled-components"
import { theme } from "../../components/colors/colorts"

export const Body = styled.div`
width: 100vw;
height: 100vh;
display:flex;
align-items: center;
justify-content: center;
`

export const UserCard = styled.div`
  width: 70%; 
  height: 90%;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  background: ${theme.grayscale.bgLightGrey};
  padding: 20px;

  >div.title{
    display: flex;
    justify-content: space-between;
  }
`

 export const Table = styled.div`
  padding: 20px;
  background-color:${theme.grayscale.bgLightGrey};
  border-radius: 8px;
  width: 100%;
  overflow-x: auto;
  max-height: 100%;

  &::-webkit-scrollbar {
  width: 10px;
}


&::-webkit-scrollbar-track {
  background: ${theme.grayscale.bgLightGrey};
  border-radius: 10px; 
}


&::-webkit-scrollbar-thumb {
  background-color: ${theme.corporate.purple}; 
  border-radius: 10px;
  border: 2px solid #f1f1f1; 
}

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    }

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;

  border-radius: 8px;
}

th {
  font-weight: bold;
}


tr{
height: 20px;
}

button {
margin:  auto 0;
}

`

export const ModalContent = styled.div`
display: flex;
width: 75%;
text-align: start;
flex-direction: column;
gap: 20px;
`

export const BtnDiv = styled.div`
display: flex;
gap: 25px;
justify-content: center;
`
export const NotificationDiv = styled.div<{ $isVisible: boolean }>`
position: absolute;
top: ${props => props.$isVisible ? '10%' : '-100%'};
left: 50%;
transform: translate(-50%,-50%);
transition: all 0.4s;
z-index: 9999;
`