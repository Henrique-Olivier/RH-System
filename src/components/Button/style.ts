import styled from "styled-components";
import { theme } from "../colors/colorts";
import * as Types from './types.ts'

function setColors(variant: Types.typeVariant): string {
    switch (variant) {
        case 'main': return `
        background-color: ${theme.corporate.purple}; 
        color: ${theme.grayscale.white}; 
         border: none;

            &:hover {
             background-color: #AE60EB ;
            }
        
             &:active {   
            background-color: #6A17AB ;
            }

            &:disabled {
            background-color: ${theme.grayscale.disabled};
            } 
        `;
        case 'secondary': return `
        background-color: ${theme.grayscale.white};
        border: 1px solid ${theme.corporate.purple};
        color: ${theme.corporate.purple};
            &:hover {
             border: 1px solid #AE60EB;
             color: #AE60EB;
            }
        
             &:active {   
            border: 1px solid #6A17AB ;
            color: #6A17AB ;
            }

             &:disabled {   
            border: 1px solid ${theme.grayscale.disabled} ;
            color:  ${theme.grayscale.disabled}  ;
            }
        `;
        case 'text': return `
        background-color: transparent;
        border: none;
        color: ${theme.corporate.purple};
            &:hover {
             color: #AE60EB;
            }
        
             &:active {   
            color: #6A17AB ;
            }

            &:disabled {
            color: ${theme.grayscale.disabled};
            }
        `;
        case 'link': return `
        background-color: transparent;
        border: none;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 4px;
        color: ${theme.informing.link};
            &:hover {
             color: #1A15D3;
            }
        
             &:active {   
            color: #0F0C9E;
            }
            
        `;
    }
}

function getPadding(size: Types.typeSize, variant: Types.typeVariant): string {
    const padding = {
        'large': "12px 52px",
        'medium': "8px 28px",
        'small': "4px 11px"
    };

    if (variant == "text" || variant == "link") {
        return '0'; 
    } 

    return padding[size];
}

function setHoverForChild(variant: Types.typeVariant, isDisabled: boolean) {
    if (isDisabled) return;

    switch (variant) {
        case 'secondary': return `

            &:hover div{
             background-color: #AE60EB;
            }
        
             &:active div{   
            background-color: #6A17AB ;
            }
        `;
        case 'text': return `
            &:hover div{
             background-color: #AE60EB;
            }
        
             &:active div{   
            background-color: #6A17AB ;
            }
        `;
        case 'link': return `
          &:hover div{
             background-color: #1A15D3;
            }
        
             &:active div{   
            background-color: #0F0C9E;
            }
            
        `;
    }
} 

const disabledColorMap = {
    'main': theme.grayscale.white,
    'secondary': theme.grayscale.disabled,
    'text': theme.grayscale.disabled,
    'link': theme.grayscale.white
} 


function setIconColors(variant: Types.typeVariant): string { 
    switch (variant) {
        case 'main': return `
        background-color: ${theme.grayscale.white}; 
        `;
        
        case 'secondary': return `
        background-color: ${theme.corporate.purple};
        `;
        case 'text': return `
        background-color: ${theme.corporate.purple};
        `;
        case 'link': return `
        background-color: ${theme.informing.link};
        `;
    }
}

export const StyledBtn = styled.button<{ $size: Types.typeSize, $variant: Types.typeVariant, $disabled: boolean }>`
    ${props => setColors(props.$variant)};
    padding: ${props => getPadding(props.$size, props.$variant)}; 
    border-radius: 4px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
    width: 18px;
    height: 18px;
    }

    &:disabled div{
    background-color:  ${props => disabledColorMap[props.$variant]} ;
    }
    
    &:focus{
    outline: none;
    }
    ${props => setHoverForChild(props.$variant, props.$disabled)}
`

export const Icon = styled.div<{$src: string, $variant: Types.typeVariant}>`
  width: 18px;
  height: 18px;
  mask: url(${props => props.$src}) no-repeat center;
  mask-size: contain;
  ${props => setIconColors(props.$variant) }; 
`;