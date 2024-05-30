import { css } from "@emotion/react";
import { LegendsColor } from "../../styles/constants.style";


export const I18nStyle = css`
    color: ${LegendsColor.textColors.black};
    &:hover, &:focus {
        background-color: ${LegendsColor.textColors.emphasis.primary};
    }
    > option {
        background-color: transparent;
        color: ${LegendsColor.textColors.black};
    }
`
