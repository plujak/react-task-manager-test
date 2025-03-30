import { createGlobalStyle } from 'styled-components';


export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: ${({ theme }) => theme.transition};
    line-height: 1.6;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`; 