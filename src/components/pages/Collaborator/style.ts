import styled from "styled-components"
import { theme } from "../../colors/colorts"

export const Container = styled.div`
  width: 100vw;
  height: 100dvh;
  padding: 15px 100px;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 20px;
`

export const AddBox = styled.div`
  width: 100%;
  background-color: ${theme.grayscale.bgLightGrey};
  display: flex;
  flex-direction: column; 
  padding: 20px;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  `
export const FilterBox = styled.div`
  width: 100%;
  height: 350px;
  background-color: ${theme.grayscale.bgLightGrey};
  display: flex;
  flex-direction: column; 
  padding: 20px;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  `

export const Table = styled.div`
  padding: 20px;
  background-color:${theme.grayscale.bgLightGrey};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  width: 75%;
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
  background-color: ;
  font-weight: bold;
}


tr{
height: 20px;
}

button {
margin:  auto 0;
}

`

export const InputContainer = styled.div`
padding: 10px;
min-width: 100%;
height: 500px;
text-align: start;
display: flex;
flex-direction: column;
align-items: start;
gap: 25px;
overflow-y: scroll;

  input{
  width: 1000%;
  }
  div {  
  width: 100%;
  }


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

`

export const DivButtons = styled.div`
display: flex;
gap: 20px;
justify-content: center;
`

export const Select = styled.select`
appearance: none; /* Remove a aparência padrão */
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${theme.grayscale.spacerLight};
  background-color: ${theme.grayscale.white};
  color: #333;
  cursor: pointer;
  width: 100%;

 &:focus {
  outline: none;
  border-color: ${theme.corporate.purple};
}
`

export const DivEmpty = styled.div<{ $showEmpty: boolean }>`
display: ${p => p.$showEmpty ? 'block' : 'none'} ;
`

export const NotificationDiv = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: ${props => props.$isVisible ? '10%' : '-100%'};
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all 0.4s;
  z-index: 9999;
`
export const FunctionsBox = styled.div`
width: 25%;
display: flex;
flex-direction: column;
gap: 25px;
`