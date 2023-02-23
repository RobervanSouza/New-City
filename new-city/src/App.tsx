import { BrowserRouter } from "react-router-dom";
import { Login } from "./pages";
import { AppRouter } from "./routes";
import { MenuLateral } from "./shared/components";
import { AuthProvider, DrawerProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import './shared/forms/TraducaoYup';// e executado pelo navegador quando abrir a aplicação tem que ver para pode usar
export const App = () => {
  return (
    <AuthProvider>

    <AppThemeProvider>
      <Login>

      <DrawerProvider>
        <BrowserRouter>

          <MenuLateral>
            <AppRouter />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
      </Login>
    </AppThemeProvider>
    </AuthProvider>
  );
};
// o approutes vai ser um filho do menu lateral
