
import {
  useCallback,
  useState,
  useContext,
  createContext,
} from "react";

interface IDrawerOptions { // com o drawer optionms navega pra aa aplicação toda
  icons: string;
  label: string;
  path: string; //navergar
}

interface IDrawerContextData {
  isdrawerOpen: boolean;
  drawerOptions: IDrawerOptions[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
  toggleDrawerOpen: () => void; // alterna os ttemas, passa no calback como nome função
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  // o useThemeContext retorna as propriedade dentro do usecontext, e onde alterna o tema, e export para as rotas
  return useContext(DrawerContext); 
};

interface Ichildren {
  children: React.ReactNode;
}


export const DrawerProvider: React.FC<Ichildren> = ({ children }) => {
  const [isdrawerOpen, setDrawerOpen] = useState(false); // menu começa fechado pra android
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);// com essa função do drawer options você seta o menu

  const toggleDrawerOpen = useCallback( // o mesmo nome da interface
    // armazena funçoes dentro //1 e ideal quando vai usar na aplicação inteira e não so em uma parte da aplicação. se for so em um componente pode ser uma função, como e em uma aplicação inteira então não precisa esta reiniciando a aplicação. usa mais em contexto ou em componentes.
    () => {
      setDrawerOpen((oldDrawerOpen) => !oldDrawerOpen); // se tiver aberto fecha, se tiver fechado abrir, alterna
    },
    []
  );

  const handleDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
     setDrawerOptions(newDrawerOptions); // essa função vai para toda a aplicação
    },
    [],
  );

  return (
    <DrawerContext.Provider value={{ isdrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleDrawerOptions}}>
        {children}
       
    </DrawerContext.Provider>
  );
};
