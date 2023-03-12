import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../style';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  )
};
