import { useMemo } from "react"
import { BasicHeaderContainer } from "./BasicHeader.style"
import { IBasicHeaderProps } from "./BasicHeader.type"

const BasicHeader = ({
    imageDetails,
    icon,
    title,
    subtitle = '',
    position,
    bottomChild
}: IBasicHeaderProps) => {
    const hasImage = useMemo(() => imageDetails !== null, [imageDetails])
    const hasSubtitle = useMemo(() => subtitle !== '', [subtitle])
    const isBottom = useMemo(() => position === 'bottom', [position])
    return (
        <BasicHeaderContainer className={position}>
            <div className="content">
                {hasImage ? <img src={imageDetails!.src} alt={imageDetails!.alt} />: icon}
                {isBottom && bottomChild}
            </div>

            <div className="labels">
                <h2>{title}</h2>
                {hasSubtitle && <p>{subtitle}</p>}
            </div>
        </BasicHeaderContainer>
    )
}

export default BasicHeader