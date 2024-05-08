import { css } from "styled-components";
import { LegendsColor } from "../../styles/constants.style";

export const ContainerStyled = (light: boolean) => css`
    ${light ? `
        *, *::before, *::after {
            fill: ${LegendsColor.textColors.black};
        }
    ` : `
        *, *::before, *::after {
            fill: ${LegendsColor.textColors.white};
        }
    `}
`
