
import CloseIcon from "../assets/close.svg";
import * as Style from "./style.ts"
import * as Types from "./types.ts"

export default function Modal({
  children,
  isVisible,
  onClose,
  img,
  action,
}: Types.ModalProps) {
  if (!isVisible) return null;

  return (
    <>
      <Style.Overlay onClick={onClose}></Style.Overlay>
      <Style.Container>
        <Style.CloseButton onClick={onClose}>
          <img src={CloseIcon} />
        </Style.CloseButton>
        <Style.ContainerContent>
          {img && <img src={img} />}
          {children}
          {action && <Style.DivBtns>{action}</Style.DivBtns>}
        </Style.ContainerContent>
      </Style.Container>
    </>
  );
}
