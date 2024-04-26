import { createGlobalStyle } from "styled-components";
import { LegendsColor } from "./constants.style";


export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

*, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${LegendsColor.textColors.primary};
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

body {
    width: 100vw;
    height: 100vh;
    overflow: auto;
}
`