import CloseBtn from "../assets/close.svg";
import WhiteCloseBtn from "../assets/whiteClose.svg";
import InformIcon from "../assets/inform.svg";
import SuccessIcon from "../assets/nSuccess.svg";
import ErrorIcon from "../assets/nError.svg";
import WarningIcon from "../assets/nWarning.svg";
import BunnerInformIcon from "../assets/nbInform.svg";
import BunnerSuccessIcon from "../assets/nbWarning.svg";
import BunnerErrorIcon from "../assets/nbError.svg";
import BunnerWarningIcon from "../assets/nbSuccess.svg";
import Typography from "../Typography";
import Button from "../Button";
import * as Styles from './styles'
import * as Types from './types'

export default function Notification({
  header,
  describe,
  type,
  model,
  onClose,
  btn1Action,
  btn1Text,
  btn2Action,
  btn2Text,
  ...props
}:Types. NotificationProps) {
  return (
    <Styles.NotificationBox $model={model} {...props}>
      <Styles.NotificicationSide $model={model} $type={type}></Styles.NotificicationSide>
      <Styles.NotificactionContent $type={type} $model={model}>
        {type == "inform" && model != "bunner" ? (
          <Styles.IconImg $model={model} src={InformIcon} alt="" />
        ) : null}
        {type == "error" && model != "bunner" ? (
          <Styles.IconImg $model={model} src={ErrorIcon} alt="" />
        ) : null}
        {type == "success" && model != "bunner" ? (
          <Styles.IconImg $model={model} src={SuccessIcon} alt="" />
        ) : null}
        {type == "warning" && model != "bunner" ? (
          <Styles.IconImg $model={model} src={WarningIcon} alt="" />
        ) : null}

        {type == "inform" && model == "bunner" ? (
          <Styles.IconImg $model={model} src={BunnerInformIcon} alt="" />
        ) : null}
        {type == "error" && model == "bunner" ? (
          <Styles.IconImg $model={model} src={BunnerErrorIcon} alt="" />
        ) : null}
        {type == "success" && model == "bunner" ? (
          <Styles.IconImg $model={model} src={BunnerSuccessIcon} alt="" />
        ) : null}
        {type == "warning" && model == "bunner" ? (
          <Styles.IconImg $model={model} src={BunnerWarningIcon} alt="" />
        ) : null}

        <Styles.TextContainer $model={model} $type={type}>
          {header && <Typography variant="H4">{header}</Typography>}
          <Typography variant="body-S">{describe}</Typography>
          {model == "snackbar" && (
            <Styles.ButtonsDiv>
              {btn1Text && (
                <Button variant="text" size="large" onClick={btn1Action}>
                  <Styles.BtnText>{btn1Text.toUpperCase()}</Styles.BtnText>
                </Button>
              )}
              {btn2Text && (
                <Button variant="text" size="large" onClick={btn2Action}>
                  <Styles.BtnText>{btn2Text.toUpperCase()}</Styles.BtnText>
                </Button>
              )}
            </Styles.ButtonsDiv>
          )}
        </Styles.TextContainer>
        {model != "informer" && model != 'bunner' ? (
          <Styles.CloseButton onClick={onClose}>
            <img src={CloseBtn} />
          </Styles.CloseButton>
        ) : null}
        {model == 'bunner' &&(
          <Styles.CloseButton onClick={onClose}>
            <img src={WhiteCloseBtn} />
          </Styles.CloseButton>
        )}
      </Styles.NotificactionContent>
    </Styles.NotificationBox>
  );
}
