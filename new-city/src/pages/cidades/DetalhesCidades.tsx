import { Grid,  Paper,  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDetalhes } from "../../shared/components";
import { useVform, FormTexteField, IValidError} from "../../shared/forms";
import { LayoutePages } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadecService";
import * as yup from "yup";

// para fazer um formulario dcom objeto
interface IFormDados {
  // dados que vem do formulario

  nome: string;
}
const formValidateSchema: yup.SchemaOf<IFormDados> = yup.object().shape({
    // o yup.SchemaOf<IFormDados> e para tipar e usar os dados que vem do IFormdados

    nome: yup
      .string()
      .required('')
      .min(3), //obrigatorio se sting, minimo ser tres caracteres
  
  });

export const DetalhesCidades: React.FC = () => {
  const { id = "nova" } = useParams<"id">(); // esse id e mesmo das rotas

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const {refForm, save, saveAndClose, isSaveClose} = useVform(); // inicializa como nulo, porque não temm dados, so depois que digitar na input pega os dados que for digitado no formulario

  useEffect(() => {
    // pega os dados do back-end para tratar
    if (id !== "nova") { /// esse IF  e para editar um usuario
      setIsLoading(true);
      CidadesService.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);

          navigate("/cidades"); // se der erro ao consultar registro volta paraa tela
        } else {
          setNome(result.nome);
          refForm.current?.setData(result);
        }
      });
    } else{ // esse ELSE  e para novo usuario, so para limpar o formulario
      refForm.current?.setData({ // passa o formulario 
        nome: '', // passa vazio para que o formulario abra vazio
    
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (dados: IFormDados) => {
    // recebe os dados que vem do formulario de cadastro

    // espera validar todos os campo de uma vez(abortEarly)
    formValidateSchema.validate(dados, { abortEarly: false }).then((dadosvalidados) => {// se der erro
      if (id === "nova") {
        // criando um registro novo
        CidadesService.create(dadosvalidados).then((result) => {
          // se der certo criar o usuario então manda para o resulte
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveClose()) {
              // quando clicar no botão salvar/fechar vai para cidades
              navigate("/cidades");
            } else {
              navigate(`/cidades/detalhes/${result}`); // com usuario criado então manda para o id dele.
            }
          }
        });
      } else {
        // atualizar o registro
        CidadesService.updateById(Number(id), {
          id: Number(id),
          ...dadosvalidados,
        }).then((result) => {
          // e so para aceitar passar em dados o mesmo id (Number(id),{id: Number(id), ...dados})

          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveClose()) {
              // quando clicar no botão salvar/fechar vai para cidades
              navigate("/cidades");
            }
          }
        });
      }
        
    }).catch((error: yup.ValidationError) => {
      const validateError: IValidError ={}

      error.inner.forEach(erro => { // e para mostrar o erro na no campo do formulario
      if(!erro.path)return;

      validateError[erro.path]= erro.message; // mensagel de erro
      });
      refForm.current?.setErrors(validateError);
    })

    setIsLoading(true);

    
  };
  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Realmente quer Deletar?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Deletado com sucesso!!!");
          navigate("/cidades");
        }
      });
    }
  };
  return (
    <LayoutePages
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoNovo={id !== "nova"} // o botão so aparece se for usuario para editar, se for nava não aparece
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoSalvaFechar
          aoclicarApagar={() => handleDelete(Number(id))}
          aoclicarNovo={() => navigate("/cidades/detalhes/nova")}
          aoclicarSalvar={save} //passa FormHandles ou null, permite fase  sublimit
          aoclicarSalvarFechar={saveAndClose}
          aoclicarVoltar={() => navigate("/cidades")}
        />
      }>
      <Form
        ref={refForm}
        onSubmit={handleSave} // manda os dados para salvar e ser tratado
      >
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid>
                <Typography variant="h6" margin={2} alignItems="center">
                  Dados da Cidade
                </Typography>
              </Grid>
            )}

            <Grid container item direction="row" spacing={2}>
              <Grid
                item
                xs={12} // android todo o espaço o total e 12
                sm={12} // tablet
                md={6} // desktop
                lg={4} // larga
                xl={2} // grande
              >
                <FormTexteField
                  fullWidth
                  label="Digite da cidade"// texto em cima diferente do placeholder
                  onChange={e => setNome(e.target.value)}
                  name="nome"
                />
              </Grid>
            </Grid>

           
           
          </Grid>
        </Box>

      </Form>
    </LayoutePages>
  );
};

// teste de formulario para input pegas os dados e transforma em um array
//  {
//    [1, 2, 3, 4].map((_, index) => (
//      <Scope key="" path={`endereço[${index}]`}>
//        <FormTexteField name="rua" />
//        <FormTexteField name="numero" />
//        <FormTexteField name="estado" />
//        <FormTexteField name="cidade" />
//        <FormTexteField name="pais" />
//      </Scope>
//    ));
/*
  interface IPessoaDados {
    nome: string;
    endereco: {
      rua: string;
      numero: number;
      estado: string;
      cidade: string;
      pais: string;
    };
  }
  */
//  }
