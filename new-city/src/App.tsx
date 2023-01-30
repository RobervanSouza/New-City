import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral>
          <AppRouter /> 
        </MenuLateral>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
// o approutes vai ser um filho do menu lateral