import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  /* Normalize/reset css */
  ${normalize}
	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}

  @font-face {
    font-family: "Circular Spotify Tx T Light";
    src: url("//db.onlinewebfonts.com/t/1ccdd11fd9d1d81756c40d7acb17d0aa.eot"); src: url("//db.onlinewebfonts.com/t/1ccdd11fd9d1d81756c40d7acb17d0aa.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/1ccdd11fd9d1d81756c40d7acb17d0aa.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/1ccdd11fd9d1d81756c40d7acb17d0aa.woff") format("woff"), url("//db.onlinewebfonts.com/t/1ccdd11fd9d1d81756c40d7acb17d0aa.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/1ccdd11fd9d1d81756c40d7acb17d0aa.svg#Circular Spotify Tx T Light") format("svg");
  }

  html, body {
    /* font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; */

    font-family: "Circular Spotify Tx T Light", Arial, "Helvetica Neue", Helvetica, sans-serif;

    /* this sets 1rem to 10px */
    font-size: 62.5%;
    
    overflow: hidden;

  }

  body{
    font-size: 1.4rem;
    font-weight: normal;
    line-height: 1.6rem;
  }

  html, body, #root, #app-root {
    height: 100%;
  }

  h1, .h1{
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: normal;
    margin-block-start: 0.4rem;
    margin-block-end: 0.4rem;
  }

  h2, .h2{
    font-size: 1.6rem;
    line-height: 2.0rem;
    font-weight: bold;
    margin-block-start: 0.4rem;
    margin-block-end: 0.4rem;
  }

  h3, .h3{
    font-size: 1.6rem;
    line-height: 2.0rem;
    font-weight: 500;
    margin-block-start: 0.4rem;
    margin-block-end: 0.4rem;
  }

  h4, .h4{
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: 500;
  }

  h5, .h5{
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: normal;
  }
  
  h6, .h6{
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: normal;
  }

  .link-button {
    background: none;
     border: none; 
     padding: 0;
    
    /* optional*/
    font-family: arial,sans-serif;
    /* input has OS specific font-family*/
     color: #069;
     cursor: pointer;
  }
  .link-button:hover{
    text-decoration: underline;
  }
`;

export default GlobalStyle;
