import styled from "styled-components";
import { theme } from "../colors/colorts";

export const Overlay = styled.div`
  background-color: rgba(26, 20, 31, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  box-sizing: border-box;
  background-color: ${theme.grayscale.white};
  width: 800px;
  height: fit-content;
  padding: 16px;
  border-radius: 8px;
  text-align: end;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const ContainerContent = styled.div`
  padding: 20px 36px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  img {
    width: 200px;
    height: 110px;
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const DivBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;