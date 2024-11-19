import ProfileIcon from "../assets/profile.svg";
import * as Types from './types.ts'
import * as Style from './style.ts'

export default function Avatar({
  type = "default",
  color = "default",
  img,
  initial,
  fontSize = "16px",
}: Types.AvatarProps) {
  return (
    <Style.AvatarDiv $color={color} $type={type} $font={fontSize}>
      {type == "default" && <img src={ProfileIcon} />}
      {type == "picture" && <img src={img} />}
      {type == "initials" && <p>{initial}</p>}
    </Style.AvatarDiv>
  );
}
