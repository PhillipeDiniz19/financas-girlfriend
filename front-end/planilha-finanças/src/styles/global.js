import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`   

* {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  body{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-image: url(https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif);
  }`

export default Global