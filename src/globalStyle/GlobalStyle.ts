import { createGlobalStyle, css } from "styled-components";

export const bodyStyles = css`
  * {
    font-family: Univers45, Malgun Gothic, 맑은 고딕, Dotum, Gulim, AppleGothic, sans-serif;
    box-sizing: border-box;
    margin: 0 auto;
  }
  body,
  p,
  pre,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  li,
  button {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: normal;
  }
  strong {
    font-weight: 700;
  }
  i,
  em {
    font-style: normal;
  }
  a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      color: inherit;
      text-decoration: inherit;
    }
  }
  input,
  textarea,
  select,
  button {
    -webkit-appearance: none;
    background: none;
    border: none;
    font-size: inherit;
    color: inherit;
    &:focus {
      outline: none;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  a,
  button {
    cursor: pointer;
  }
  pre {
    white-space: pre-line;
  }
`;

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Univers45';
  src: url("../fonts/4201a9f6-3b6a-4b16-8b4d-39f514509601.woff2")
    format("woff2");
}
@font-face {
  font-family: 'Univers LT W02_47 Light Cond';
  src: url("../fonts/e0f5f24d-879d-40cd-804c-a10487c4561d.woff2")
    format("woff2");
}
@font-face {
  font-family: 'Univers LT W02_57 Condensed';
  src: url("../fonts/b3076c6c-bd71-4e22-b22a-c32f76ad3352.woff2")
    format("woff2");
}
@font-face {
  font-family: 'Univers LT W02_700 Condensed';
  src: url("../fonts/864f8bdc-1a42-4d28-97a5-c15513fd193b.woff2")
    format("woff2");
}
  body {
    ${bodyStyles}
  }
`;

export default GlobalStyle;
