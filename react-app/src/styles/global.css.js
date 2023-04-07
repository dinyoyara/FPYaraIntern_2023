import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-family: Arial, Helvetica, Sans-Serif;
        font-size: 16px;
    };
    body {
        box-sizing: border-box;
    };
    * {
        margin: 0;
        padding: 0;
    }
    `;

export default GlobalStyle;
