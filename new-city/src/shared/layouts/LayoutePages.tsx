
import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutTitulo {
  children: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: ReactNode; // pode mostrar ou não
}

export const LayoutePages: React.FC<ILayoutTitulo> = ({ children, titulo, barraDeFerramentas }) => {
     
 // essa função e so para quando a tela ficar pequena (-600) habilitar a função e habilitar o butão, so aparace quando a tela ficar pequena
     const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm")); 
     // pode colocar essa const theme em cima ou fazer desta forma


    const mdDown = useMediaQuery((theme: Theme) =>
      theme.breakpoints.down("md")
    ); 

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
          padding={1}
          display="flex"
          alignItems="center"
          gap={2} // espaço entre o texto
          height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} // reduz o tamanho do header conforme a pagina
          > 
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
          )}
          <Typography
            overflow="hidden" // quando otexto tiver o texto grande corta o texto
            whiteSpace="nowrap" // não quebra as linhas no
            textOverflow="ellipsis" // o texto fica tres pontionhos e não quebra
            variant={smDown ? "h5" : mdDown ? "h4" : "h3"} // o texto vai reduzindo conforme o texto
          >
            {titulo}
          </Typography>
        </Box>

        {barraDeFerramentas && (
          <Box>{barraDeFerramentas}</Box> // e so para saber se tem item dentra da baraa de ferramentas
        )}

        <Box flex={1} overflow="auto">
          {children}
        </Box>
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

//         <Box flex={1}  overflow ='auto' >{children}</Box> //3 flex 1 e para ocupar toda a area disponivel da div children, overflow e para ter scroll so na parte do childre, e não na tela toda
