import styled from "styled-components";
import { theme } from "../colors/colorts";
import * as Types from './types.ts'


const height = {
  'smallLine': "4px",
  'line': "8px",
};

const bgColor = {
  'default': theme.corporate.purple,
  'percent': theme.corporate.purple,
  'complete': theme.informing.approval,
  'error': theme.informing.error,
};



const circleSize = {
  small: "  width: 84px; height: 84px;",
  large: "  width: 140px; height: 140px;",
};



const dasharray = {
  small: "210",
  large: "440",
};

const fontSize = {
    'small' : 'font-size: 16px;',
    'large' : 'font-size: 25px;'
}

const imgSize = {
    'small': 'width: 20px; height: 20px;' ,
    'large': 'width: 40px; height: 40px;'
}

function getPercents(percentage: number, size: "small" | "large") {
  const circunference = {
    small: 33.5,
    large: 70,
  };

  const circumferenceSmall = 2 * Math.PI * circunference[size];
  const offsetSmall =
    circumferenceSmall - (percentage / 100) * circumferenceSmall;
  return offsetSmall;
}

export const CircleImg = styled.img<{$size: "small" | "large";}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    ${props => imgSize[props.$size]}
`;

export const PercentText = styled.div <{$size: "small" | "large";}>`
  font-family: "Intro Black", sans-serif;
  font-weight: 700;
  color: ${theme.corporate.purple};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  ${props => fontSize[props.$size]}s
`;

export const Progress = styled.circle<{
    $percentage: number;
    $size: "small" | "large";
    $style: Types.StyleType;
  }>`
    stroke: ${props => bgColor[props.$style]};
    transition: stroke-dashoffset 0.5s ease;
    stroke-dasharray: ${(props) => dasharray[props.$size]};
    stroke-dashoffset: ${(props) => getPercents(props.$percentage, props.$size)};
  `;

export const CircleBg = styled.circle`
  stroke: #e0dce6;
`;

export const CircularProgress = styled.div<{ $size: "small" | "large" }>`
  position: relative;
  ${(props) => circleSize[props.$size]}
  circle {
    fill: none;
    stroke-width: 5;
    stroke-linecap: round;
  }
  svg {
    transform: rotate(-90deg);
  }
`;

export const StyledProgress = styled.progress<{
    $type: 'smallLine' | 'line';
    $style: Types.StyleType;
  }>`
    border-radius: 15px;
    background-color: ${theme.grayscale.spacerLight};
    height: ${props => height[props.$type]};
    width: 100%;
  
    &::-webkit-progress-bar {
      background-color: ${theme.grayscale.spacerLight};
      border-radius: 15px;
    }
  
    &::-webkit-progress-value {
      background-color: ${(props) => bgColor[props.$style]};
      border-radius: 15px;
      transition: width 0.5s;
    }
  `;

export  const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  p {
    font-family: "Intro Black", sans-serif;
    color: ${theme.corporate.purple};
    font-weight: 700;
    font-size: 14px;
  }
`;