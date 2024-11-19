import * as Style from './style.ts'
import * as Types from './types.ts'

export default function Button({ children, variant, size, icon, disabled = false, ...props }: Types.ButtonProps) {
    return (
        <Style.StyledBtn $size={size} $variant={variant} $disabled={disabled} disabled={disabled} {...props}>
            {icon && <Style.Icon $src={icon} $variant={variant}/>}
            {children}
        </Style.StyledBtn>

    )
} 