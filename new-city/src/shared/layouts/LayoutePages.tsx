
import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../contexts";

interface ILayoutTitulo {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutePages: React.FC<ILayoutTitulo> = ({ children, titulo }) => {
     
 // essa função e so para quando a tela ficar pequena (-600) habilitar a função e habilitar o butão, so aparace quando a tela ficar pequena
     const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm")); 
     // pode colocar essa const theme em cima ou fazer desta forma

    const theme = useTheme();

    const {toggleDrawerOpen} = useDrawerContext(); // essa função e para habilitar o funcionamento do butão, quando clicar aparecer o munu

  return (
    <>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        gap={1} //espaco entre um e outro
      >
        <Box
          display="flex"
          alignItems="center"
          padding={1}
          height={theme.spacing(12)}
          gap={2}>
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
          )}
          <Typography variant="h5">{titulo}</Typography>
        </Box>
        <Box>barra de ferramentas</Box>
        <Box>{children}</Box>
      </Box>
    </>
  );
};

//3 esses box são para serpara as div e melhorar para colocar os itens dentra das paginas
// <Box height="100%"> //4 toda a pagina
//         <Box>{titulo}</Box> //5 partes da pagina
//         <Box>barra de ferredfdws</Box>
//         <Box>{children}</Box>
//       </Box>
// </>
