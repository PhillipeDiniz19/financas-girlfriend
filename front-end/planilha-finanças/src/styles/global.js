import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`   

* {
    margin: 0;
    padding: 0;
    background: #FFF;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  body{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #FFF;
  }`

export default Global