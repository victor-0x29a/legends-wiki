import { css } from "@emotion/react";
import { LegendsColor } from "../../styles/constants.style";

export const DefaultPerPageOptionsStyle = css`
&:hover, &:focus {
    background-color: ${LegendsColor.textColors.emphasis.primary};
}
> option {
    background-color: transparent;
    width: 100%;
}
`
