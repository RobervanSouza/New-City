import{ Box, ThemeProvider }from'@mui/material';
import { useCallback, useMemo, useState, useContext, createContext } from 'react';
import { DarkTheme, LightTheme } from '../themes';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme : () => void; // alterna os temas

}



const ThemeContext = createContext({} as IThemeContextData)

export const useThemeContext = () => { // o useThemeContext retorna as propriedade dentro do usecontext, e onde alterna o tema, e export para as rotas
    return useContext(ThemeContext);
};

interface Ichildren {
    children: React.ReactNode; 
};

export const AppThemeProvider: React.FC<Ichildren> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(
    // armazena funçoes dentro
    () => {
      setThemeName((oldThemeName) =>
        oldThemeName === "light" ? "dark" : "light"
      );
    },
    []
  );

  const theme = useMemo(() => {
    // use memo armazena dados
    if (themeName === "light") return LightTheme;

    return DarkTheme;
  }, [themeName]);
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
