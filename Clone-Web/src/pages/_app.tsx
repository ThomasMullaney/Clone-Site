import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";


function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      {/* <ChakraProvider resetCSS theme={theme}> */}
        {/* <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        > */}
          <CSSReset />
          <Component {...pageProps} />
        {/* </ColorModeProvider> */}
      {/* </ChakraProvider> */}
    </ThemeProvider>
  );
}

export default MyApp;
