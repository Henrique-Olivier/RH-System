import styled from "styled-components";
import { theme } from "../colors/colorts";
import * as Types from "./types";

export const NotificationBox = styled.div<{ $model: Types.ModelType }>`
  width: ${(props) => (props.$model != "bunner" ? `368px` : "621px")};
  border-radius: 4px;
  border: ${(props) =>
    props.$model != "bunner"
      ? `solid 1px ${theme.grayscale.spacerLight}`
      : "none"};
  display: flex;
  background-color: ${theme.grayscale.white};
`;

export const colorMap = {
  error: theme.informing.error,
  warning: theme.informing.attention,
  success: theme.informing.approval,
  inform: theme.corporate.purple,
};

export const NotificicationSide = styled.div<{
  $type: Types.NotificationType;
  $model: Types.ModelType;
}>`
  width: 6px;
  min-height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: ${(props) => colorMap[props.$type]};
  opacity: ${(props) => (props.$model != "bunner" ? "20%" : "70%")};
`;

export const NotificactionContent = styled.div<{
  $type: Types.NotificationType;
  $model: Types.ModelType;
}>`
  width: 100%;
  height: 100$;
  padding: 12px;
  display: flex;
  align-items: ${(props) =>
    props.$model == "toast" || props.$model == "bunner" ? "center" : "start"};
  justify-content: center;
  gap: 12px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${(props) =>
    props.$model != "bunner" ? "white" : colorMap[props.$type]};
`;

export const CloseButton = styled.button`
  display: block;
  width: 16px;
  padding: 0;
  img {
    width: 16px;
  }
  &:focus {
    outline: none;
  }
`;

export const iconSizeMap = {
  toast: `  width: 28px; height: 28px;`,
  snackbar: `  width: 40px; height: 40px; margin: 10px 0;`,
  informer: `  width: 40px; height: 40px; margin: 10px 0;`,
  bunner: `  width: 28px; height: 28px;`,
};

export const IconImg = styled.img<{ $model: Types.ModelType }>`
  ${(props) => iconSizeMap[props.$model]}
`;

export const showHeaderMap = {
  toast: "display: none;",
  bunner: "display: none;",
  snackbar: "display: block;",
  informer: "display: block;",
};

function paragraphColor(
  model: Types.ModelType,
  type: Types.NotificationType
): string {
  const colors = {
    snackbar: theme.grayscale.hintText,
    informer: theme.grayscale.hintText,
    bunner: theme.grayscale.black,
  };

  if (model == "toast") {
    return colorMap[type];
  }

  if(model == 'bunner' && type == "error") {
    return theme.grayscale.white;
  } 

  return colors[model];
}

export const marginMap = {
  toast: "margin-top: 0px;",
  snackbar: "margin-top: 8px;",
  informer: "margin-top: 8px;",
  bunner: "margin-top: 0px;",
};

export const TextContainer = styled.div<{
  $model: Types.ModelType;
  $type: Types.NotificationType;
}>`
  ${(props) => marginMap[props.$model]}

  width: 100%;

  p {
    color: ${(props) => paragraphColor(props.$model, props.$type)};
  }

  h4 {
    ${(props) => showHeaderMap[props.$model]}
    color: ${(props) => colorMap[props.$type]};
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;

export const BtnText = styled.p`
  font-family: "Intro Bold", sans-serif;
`;
