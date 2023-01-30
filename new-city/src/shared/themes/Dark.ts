import { createTheme } from "@mui/material";
import {  lime, red,} from "@mui/material/colors";


export const DarkTheme = createTheme({
  palette: {
    primary: {
      main:red[400],
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
      default: "#303134",
      paper: "#202124",
    },
  },
});
