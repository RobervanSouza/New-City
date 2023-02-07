import { Card, CardContent,  Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { FerramentasDaListagem} from "../../shared/components";
import { LayoutePages } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadecService";
import { PessoasService } from "../../shared/services/api/passoas/PessoasService";

export const DashBoard = () => {

 const [isLoading, setIsLoading] = useState(true);
 const [totalCidades, setTotalCidades] = useState(0);
 const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
 const [totalPesosas, setTotalPessoas] = useState(0);
 useEffect(() => {
   setIsLoading(true); // se ouver atraso ele vai carregar os dados do back-end
   setIsLoadingPessoas(true);
  
     // o then e quando o service retorna ele evai executar uma função
     CidadesService.getAll(1,).then((result) => {
       setIsLoading(false); // quando tiver os dados não precisa carregar os dados novamente, se ja chegou aqui esta ok
       // no resul passa as cidades ou erro, no getall tem as propriedades de pages e filter, em pagem passa (10 em filter passa (busca)
       if (result instanceof Error) {
         alert(result.message); // em caso de erro
       } else {
         // em caso de sucesso
        
         setTotalCidades(result.totalCidades);
         
       }
     });
     PessoasService.getAll(1,).then((result) => {
       setIsLoadingPessoas(false); // quando tiver os dados não precisa carregar os dados novamente, se ja chegou aqui esta ok
       // no resul passa as cidades ou erro, no getall tem as propriedades de pages e filter, em pagem passa (10 em filter passa (busca)
       if (result instanceof Error) {
         alert(result.message); // em caso de erro
       } else {
         // em caso de sucesso
        
         setTotalPessoas(result.totalPessoas);
         
       }
     });
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);







  return (
    <LayoutePages
      titulo="Pagina Inicial "
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}>
      <Box width="100%" display="flex">
        <Grid container margin={1}>
          <Grid item container spacing={2}>
            <Grid
              item
              xs={12} // android
              sm={12} // tablet
              md={6} // desktop
              lg={4} // larga
              xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    {" "}
                    Total de Pessoas
                  </Typography>
                  <Box
                    display="flex"
                    padding={6}
                    justifyContent="center"
                    alignItems="center">
                    {!isLoadingPessoas && (
                      <Typography variant="h1" align="center">
                        {totalPesosas}
                      </Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant="h5" align="center">
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12} // android
              sm={12} // tablet
              md={6} // desktop
              lg={4} // larga
              xl={2}>
              <Card>
                <CardContent>
                  {" "}
                  <Typography variant="h5" align="center">
                    {" "}
                    Total de Cidades
                  </Typography>
                  <Box
                    display="flex"
                    padding={6}
                    justifyContent="center"
                    alignItems="center">
                    {!isLoading && (
                      <Typography variant="h1" align="center">
                        {totalCidades}
                      </Typography>
                    )}
                    {isLoading && (
                      <Typography variant="h5" align="center">
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutePages>
  );
};

// <LayoutePages titulo="Pagina Inicial "> //3 o titulo foi a interface criada no page. foi passado praqui
