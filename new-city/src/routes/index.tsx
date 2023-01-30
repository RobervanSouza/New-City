import { Button } from '@mui/material';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useThemeContext } from '../shared/contexts/ThemeContext';


export const AppRouter = () => {
     const { toggleTheme } = useThemeContext();
    return(
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary'  onClick={toggleTheme} >Dark/Light</Button>} />
            <Route path='*' element={<Navigate to={'/pagina-inicial'}/>}//e para renderizar a pagina inicial, caso coloque outros nomes na pagina

            />
        </Routes>
    );
}