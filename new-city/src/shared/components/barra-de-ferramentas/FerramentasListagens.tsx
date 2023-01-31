import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IFerramentasListagemProps {
  textobusca?: string;
  mostrarInputBusca?: boolean;
  mudarTextoBusca?: (novoTexto: string) => void;
  textoBotaoVovo?: string;
  mostrarBotaoNovo?: boolean;
  clicarNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasListagemProps> = ({
  mostrarInputBusca = false,
  mudarTextoBusca,
  textobusca = "",
  clicarNovo,
  textoBotaoVovo = "Novo",
  mostrarBotaoNovo = true,
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
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textobusca}
          onChange={(e) => mudarTextoBusca?.(e.target.value)} // evento
          placeholder="Pesquisar ..."
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={clicarNovo}
            endIcon={<Icon>add</Icon>}>
            {textoBotaoVovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
