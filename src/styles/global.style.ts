import { createGlobalStyle } from "styled-components";
import { LegendsColor, LegendsSize } from "./constants.style";


export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

*, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${LegendsColor.textColors.white};
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

*::selection {
    background-color: ${LegendsColor.textColors.emphasis.secondary};
}

body {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: ${LegendsColor.backgroundColors.primary};
}

.form-label {
    margin-top: ${LegendsSize.margin.small};
}

.control-group {
    position: relative;
    padding-bottom: 1.5rem;
}

.clickable {
    cursor: pointer;
}
`
