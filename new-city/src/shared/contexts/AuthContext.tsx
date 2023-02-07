import {  createContext, useCallback, useMemo, useState } from "react"


interface IAuthContextData{
    isAuthenticated: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<string | void>; // se der erro ao fazer login
}

const AuthContext = createContext({
    
} as IAuthContextData)


interface IchildrenProps{
    children: React.ReactNode;
}
export const AuthProvider: React.FC<IchildrenProps> = ({children}) => {
     
   const  [acessToken, setAcessToken] = useState<string>(); // tipagem stringou ou undefined

   const  handleLogin = useCallback( async (email:string, password: string) => {

   }, []);

   const handleLogout = useCallback(() => {

   }, [])

   const isAuthenticated =useMemo(() => !!acessToken, [acessToken])

    return(
    <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout}} >
        {children}
    </AuthContext.Provider>
    )
}