import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import { MenuLateral } from "./shared/components";
import { DrawerProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import './shared/forms/TraducaoYup';// e executado pelo navegador quando abrir a aplicação tem que ver para pode usar
export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRouter />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
// o approutes vai ser um filho do menu lateral
