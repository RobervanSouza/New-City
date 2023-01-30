import { Routes, Route, Navigate} from 'react-router-dom';

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/pagina-inicial' element={<p>Pagina Inicial</p>} />
            <Route path='*' element={<Navigate to={'/pagina-inicial'}/>}//e para renderizar a pagina inicial, caso coloque outros nomes na pagina

            />
        </Routes>
    );
}