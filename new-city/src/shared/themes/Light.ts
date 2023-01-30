import { createTheme } from "@mui/material";
import {  lime, red,} from "@mui/material/colors";


export const LightTheme = createTheme({
  palette: {
    primary: {
      main: red[400],
      dark: red[800],
      light: red[700],
      contrastText: "#ffffff",
    },
    secondary: {
      main: lime[50],
      dark: lime[400],
      light: lime[700],
      contrastText: "#ffffff",
    },
    background: {
      default: "#bcaaa4",
      paper: "#ffffff",
    },
  },
});
