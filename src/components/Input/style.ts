import styled from "styled-components";

export const InputContainer = styled.div<{ $error?: React.ReactNode |string; $disable: boolean; $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    >div{
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 4px;
        border: ${props => props.$error ? "1px solid red" : "1px solid #E5E0EB"};
        border: ${props => props.$isActive ? "1px solid #9D3FE7" : null};
        background-color: ${props => props.$disable ? "#D4D2D5" : null};

        >div{
            margin-right: 8px;
            background-color: ${props => props.$isActive ? "#9D3FE7" : "#E5E0EB"};
        }
    }

    >p{
        margin: 4px 0 0 0;
        text-align: end;
        color: red;
        font-size: 14px;
    }
    `;

export const InputComponent = styled.input<{ $size: string }>`
    width: 100%;
    height: ${props => props.$size === "default" ? "44px" : "36px"};
    padding: ${props => props.$size === "default" ? "12px" : "8px 12px"};
    border-radius: 2px;
    border: none;

    &:focus{
        outline: 0;
    }

    &:disabled{
        background-color: #D4D2D5;
    }
`;

export const Icon = styled.div<{ $src?: string; $disable: boolean }>`
  width: 18px;
  height: 18px;
  mask: url(${props => props.$src}) no-repeat center;
  mask-size: contain;
  background-color: ${props => props.$disable ? '#ABA7AF' : null} !important;
`;