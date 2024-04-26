import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
*, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100vw;
    height: 100vh;
    overflow: auto;
}
`