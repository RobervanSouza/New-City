import {
  Button,
  Icon,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { Enviroment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutePages } from "../../shared/layouts";
import {
  ICidades,
  CidadesService,
} from "../../shared/services/api/cidades/CidadecService";

export const Cidades: React.FC = () => {
  const { debounce } = useDebounce(); //
  const [searchParams, setSerchParams] = useSearchParams(); // essa função e para quando usuari for compartilha algum item ele poder enviar a URL  do item onde estava e não do site
  const busca = useMemo(() => {
    // e para fazer busca e usado so quando e ecionado
    return searchParams.get("busca") || ""; // busca o paramentro de busca e entrega (busca), neavega em busca na pargia
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1"); // quantidade de paginas. inicia sempre em um
  }, [searchParams]);

  const [rows, setRows] = useState<ICidades[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalR, setTotalR] = useState(0);

  useEffect(() => {
    setIsLoading(true); // se ouver atraso ele vai carregar os dados do back-end
    debounce(() => {
      // o then e quando o service retorna ele evai executar uma função
      CidadesService.getAll(pagina, busca).then((result) => {
        setIsLoading(false); // quando tiver os dados não precisa carregar os dados novamente, se ja chegou aqui esta ok
        // no resul passa as cidades ou erro, no getall tem as propriedades de pages e filter, em pagem passa (10 em filter passa (busca)
        if (result instanceof Error) {
          alert(result.message); // em caso de erro
        } else {
          // em caso de sucesso
          console.log(result);
          setTotalR(result.totalCidades);
          setRows(result.data);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Realmente quer apagar?')) {
      CidadesService.deleteById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message);
        }else{
          setRows(oldRows => [
          ...oldRows.filter(oldRows => oldRows.id !== id)
          ])
          alert('apagado com sucesso!!!')
        }
      });
    }
  };


  const navigate = useNavigate();
  return (
    <>
      <LayoutePages
        titulo="Pagina de Cidades"
        barraDeFerramentas={
          <FerramentasDaListagem
            mostrarInputBusca // poderia colocar true, mas o react intende que e true
            textoBotaoVovo="Nova"
            clicarNovo={() => navigate('/cidades/detalhes/nova')}
            textoBusca={busca}
            mudarTextoBusca={(texto) =>
              setSerchParams({ busca: texto, pagina: "1" }, { replace: true })
            } // o replace >> e para buscar impede que registra varias rotas, e quando você visita varias paginas e ele volta para o historico
          />
        }>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={200} >Ações</TableCell>
                <TableCell>Nome</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Button size="small" onClick={() => handleDelete(row.id)}>
                      <Icon>delete</Icon>
                    </Button>
                    <Button size="small" onClick={() => navigate(`/cidades/detalhes/${row.id}`)} >
                      <Icon>edite</Icon>
                    </Button>
                  </TableCell>
                  <TableCell>{row.nome}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
              {totalR > 0 && totalR > Enviroment.LIMITE_DE_LINHAS && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Pagination
                      page={pagina}
                      count={Math.ceil(totalR / Enviroment.LIMITE_DE_LINHAS)} // contas as paginas
                      onChange={(_, newPage) =>
                        setSerchParams(
                          { busca, pagina: newPage.toString() },
                          { replace: true }
                        )
                      } // essa função e para navegar na paginas clicar onde quizer ex pg7
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutePages>
    </>
  );
};

// table headers cabecalho
// table row caixa da tabela
// table boby e o corpo da tabela
// table ccell para cada coluna
// table headers caixa da tabela para
// table headers caixa da tabela para
// table headers caixa da tabela para
// table headers caixa da tabela para
