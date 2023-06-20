import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#59C1CC",
    secondary: "#ffb641",
  },
  darkColors: {
    primary: "#346B71",
    secondary: "#61593f",
  },
});

interface StyleProviderProps {
  children?: React.ReactNode;
}

export const StyleProvider = ({ children }: StyleProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
