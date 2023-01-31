import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';



export const AppRouter = () => {
     const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
        {
            label: 'Pagina Inicial',
            icons: 'home',
            path: '/pagina-inicial'
        }
]);
          
 }, []);

    return (
      <Routes>
        <Route
          path="/pagina-inicial"
          element={
            <Button
              variant="contained"
              color="primary"
              onClick={toggleDrawerOpen}>
              Open/Close
            </Button>
          }
        />
        <Route
        //  path="*"  element={<Navigate to={"/pagina-inicial"} />} //e para renderizar a pagina inicial, caso coloque outros nomes na pagina
        />
      </Routes>
    );
}