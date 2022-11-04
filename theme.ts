import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: "linear-gradient(90deg, hsla(211, 66%, 87%, 1) 0%, hsla(348, 67%, 88%, 1) 50%, hsla(272, 26%, 72%, 1) 100%)",
      },
    }),
  },
});
