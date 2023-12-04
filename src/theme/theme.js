import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(43,43,63)",
    },
  },
  typography: {
    h3: {
      fontWeight: "bolder",
      fontSize: "2.5rem",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          cursor: "default",
        },
      },
    },
    MuiFormControl:{
      styleOverrides:{
        root:{
          gap: 8
        }
      }
    }
  },
});

theme.typography.fontFamily = [
  theme.typography.fontFamily,
  "anton",
  "'bebas neue'",
].join(",");
