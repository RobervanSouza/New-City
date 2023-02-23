import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/api/auth/AuthService";


interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>; // se der erro ao fazer login
}

const AuthContext = createContext({} as IAuthContextData);


interface IchildrenProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<IchildrenProps> = ({ children }) => {
  const [acessToken, setAcessToken] = useState<string>(); // tipagem stringou ou undefined

  useEffect(() => {
    const acessToken = localStorage.getItem("APP_ACCESS_TOKEN");
    if (acessToken) {
      
      setAcessToken(JSON.parse(acessToken));
    } else {
      setAcessToken(undefined);
    }
  }, []);
  
  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
      
    } else {
      localStorage.setItem(
        "APP_ACCESS_TOKEN",
        JSON.stringify(result.accessToken)
        ); // ARMAZENA O LOGIN
        setAcessToken(result.accessToken);
      }
    },
    
    []);
    

  const handleLogout = useCallback(() => {
    localStorage.removeItem("APP_ACCESS_TOKEN");
    setAcessToken(undefined); // deslogado
  }, []);

  const isAuthenticated = useMemo(() => !!acessToken, [acessToken]); // logado

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
