import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material";

interface IerramentasDetalhes {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvaFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvaFecharCarregando?: boolean;

  aoclicarNovo?: () => void;
  aoclicarSalvar?: () => void;
  aoclicarVoltar?: () => void;
  aoclicarApagar?: () => void;
  aoclicarSalvarFechar?: () => void;
}

export const FerramentasDetalhes: React.FC<IerramentasDetalhes> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvaFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvaFecharCarregando = false,
  
  
    aoclicarNovo,
    aoclicarSalvar,
    aoclicarVoltar,
    aoclicarApagar,
    aoclicarSalvarFechar,

}) => {
  const theme = useTheme();
  return (
    <Box
      gap={1} // distancio de um para o outro
      marginX={1} // margin das laterais
      padding={1} // espaço do box
      paddingX={2} // so nas laterais
      display="flex"
      alignItems="center"
      height={theme.spacing(5)} //
      component={Paper}>
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoclicarSalvar}>
          {" "}
          Salvar
        </Button>
      )}
      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={66} />}



      <Divider variant="middle" orientation="vertical" />
      {mostrarBotaoSalvaFechar && !mostrarBotaoSalvaFecharCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoclicarSalvarFechar}>
          {" "}
          Salvar/Fechar
        </Button>
      )}

      {mostrarBotaoSalvaFecharCarregando && (
        <Skeleton width={110} height={66} />
      )}



      <Divider variant="middle" orientation="vertical" />
      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoclicarApagar}>
          {" "}
          Apagar
        </Button>
      )}
      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={66} />}
      <Divider variant="middle" orientation="vertical" />
      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoclicarNovo}>
          {" "}
          {textoBotaoNovo}
        </Button>
      )}
      {mostrarBotaoNovoCarregando && <Skeleton width={110} height={66} />}
      <Divider variant="middle" orientation="vertical" />
      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoclicarVoltar}>
          {" "}
          Voltar
        </Button>
      )}
      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={66} />}
    </Box>
  );
};
