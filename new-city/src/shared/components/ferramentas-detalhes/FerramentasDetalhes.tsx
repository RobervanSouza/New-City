import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";


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

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm")); // maior
  // pode colocar essa const theme em cima ou fazer desta forma

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));  // menor
 
  const theme = useTheme();

  return (
    <Box
      gap={1} // distancio de um para o outro
      marginX={1} // margin das laterais
      padding={1} // espaço do box
      paddingX={2} // so nas laterais
      display="flex"
      alignItems="center"
      width={theme.spacing(smDown ? 41 : mdDown ? 69 : 122)}
      height={theme.spacing(smDown ? 4 : mdDown ? 6 : 8)} //
      component={Paper}>
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoclicarSalvar}>
          {" "}
          <Typography
            variant="button" //estilização padrão
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={66} />}

      {
  (mostrarBotaoSalvaFechar &&
        (mostrarBotaoNovo ||
          mostrarBotaoApagar ||
          mostrarBotaoVoltar ||
          mostrarBotaoSalvar)) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {mostrarBotaoSalvaFechar &&
        !mostrarBotaoSalvaFecharCarregando &&
        !smDown &&
        !mdDown && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={aoclicarSalvarFechar}>
            {" "}
            <Typography
              variant="button" //estilização padrão
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden">
              Salvar/Fechar
            </Typography>
          </Button>
        )}

      {mostrarBotaoSalvaFecharCarregando && !smDown && !mdDown && (
        <Skeleton width={110} height={66} />
      )}

      {mostrarBotaoApagar &&
        (mostrarBotaoNovo ||
          mostrarBotaoVoltar ||
          mostrarBotaoSalvaFechar ||
          mostrarBotaoSalvar) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoclicarApagar}>
          {" "}
          <Typography
            variant="button" //estilização padrão
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden">
            Apagar
          </Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={66} />}

      {mostrarBotaoNovo &&
        (mostrarBotaoVoltar ||
          mostrarBotaoApagar ||
          mostrarBotaoSalvaFechar ||
          mostrarBotaoSalvar) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoclicarNovo}>
          {" "}
          <Typography
            variant="button" //estilização padrão
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden">
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}
      {mostrarBotaoNovoCarregando && !smDown && (
        <Skeleton width={110} height={66} />
      )}

      {mostrarBotaoVoltar &&
        (mostrarBotaoNovo ||
          mostrarBotaoApagar ||
          mostrarBotaoSalvaFechar ||
          mostrarBotaoSalvar) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoclicarVoltar}>
          {" "}
          <Typography
            variant="button" //estilização padrão
            whiteSpace="nowrap"
            textOverflow="ellipsis" // 3 pontinhos {...} na tela
            overflow="hidden">
            Voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={66} />}
    </Box>
  );
};
