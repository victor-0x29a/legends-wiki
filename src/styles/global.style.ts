import { createGlobalStyle } from "styled-components";
import { LegendsColor } from "./constants.style";


export const GlobalStyle = createGlobalStyle`
*, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${LegendsColor.textColors.primary};
    text-decoration: none;
}

body {
    width: 100vw;
    height: 100vh;
    overflow: auto;
}
`