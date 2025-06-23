import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Import fonts properly */
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Montserrat:wght@400;700&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

  :root {
    --color-primary: #00ff8c; /* Neon green */
    --color-secondary: #0a0a0a; /* Dark background */
    --color-accent: #00ffa3; /* Brighter neon green for accents */
    --color-text: #ffffff; /* White text */
    --neon-shadow: 0 0 10px #00ff8c, 0 0 20px #00ff8c, 0 0 30px #00ff8c; /* Neon glow effect */
    --font-primary: 'Cormorant Garamond', serif;
    --font-secondary: 'Montserrat', sans-serif;
  }

  @font-face {
    font-family: 'CustomBloomFont';
    src: url('/fonts/BloomAlt.woff2') format('woff2');
    font-display: swap;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'CustomBloomFont', sans-serif;
    background: #0a0a0a;
    color: white;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  html, body, #root {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-secondary);
    color: var(--color-text);
    background-color: var(--color-secondary);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 400;
    color: var(--color-primary);
    text-shadow: var(--neon-shadow);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: text-shadow 0.3s ease;
  }

  a:hover {
    text-shadow: var(--neon-shadow);
  }

  .neon-button {
    background: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  .neon-button:hover {
    background: var(--color-primary);
    color: var(--color-secondary);
    box-shadow: var(--neon-shadow);
  }
`;

export default GlobalStyles;
