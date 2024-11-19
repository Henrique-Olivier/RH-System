import styled from "styled-components";
import { theme } from "../../colors/colorts";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  box-sizing: border-box;
  width: 450px;
  background-color: ${theme.grayscale.bgLightGrey};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px 50px;
  gap: 25px;
`;

export const InputBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  div {
    width: 100%;
  }

  input {
    width: 750%;
  }
`;

export const NotificationControlDiv = styled.div<{ $isVisible: boolean }>`
position: absolute;
left: 50%;
top: ${(props) => (props.$isVisible ? "15%" : "-100%")};
transform: translate(-50%, -50%);
transition: 1s ease-in-out;
`;

export const Cadastrese = styled.div `
display: flex;
gap: 5px;
align-itens: start;
`