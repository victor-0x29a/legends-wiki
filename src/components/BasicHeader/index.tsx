import { useMemo } from "react"

import EntityImage from "../EntityImage/EntityImage"

import { BasicHeaderContainer } from "./BasicHeader.style"

import type { IBasicHeaderProps } from "./BasicHeader.type"

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
                {hasImage ? <EntityImage image={{
                    src: imageDetails!.src,
                    alt: imageDetails!.alt
                }} /> : icon}
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
