import { css } from "@emotion/react";
import { LegendsColor } from "../../styles/constants.style";


export const I18nStyle = css`
    &:hover, &:focus {
        background-color: ${LegendsColor.textColors.emphasis.primary};
    }
    > option {
        background-color: transparent;
        text-align: center;
        width: 100%;
    }
`
