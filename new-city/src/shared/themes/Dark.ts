import { createTheme } from "@mui/material";
import {  lime, red,} from "@mui/material/colors";


export const DarkTheme = createTheme({
  palette: {
    mode: 'dark', // deixa os botões com a cor branca quando e acionado o dark
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
  typography: {
     allVariants:{
      color: 'white'
     }
  },
});
