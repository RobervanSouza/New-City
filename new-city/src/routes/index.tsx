
import { useEffect } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { DashBoard } from '../pages';
import { useDrawerContext } from '../shared/contexts';



export const AppRouter = () => {
     const {setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
        {
            label: 'Pagina Inicial',
            icons: 'home',
            path: '/pagina-inicial'
        }
]);
          
 }, [setDrawerOptions]);

    return (
      <Routes>
        <Route
          path="/pagina-inicial"
          element={
           <DashBoard/>
          }
        />
        <Route
        //  path="*"  element={<Navigate to={"/pagina-inicial"} />} //e para renderizar a pagina inicial, caso coloque outros nomes na pagina
        />
      </Routes>
    );
}