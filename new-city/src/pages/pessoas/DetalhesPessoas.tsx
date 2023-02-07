import { Grid,  Paper,  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDetalhes } from "../../shared/components";
import { useVform, FormTexteField, IValidError} from "../../shared/forms";
import { LayoutePages } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/passoas/PessoasService";
import * as yup from "yup";
import { AutoCompleteCidades } from "./components/AutoCompleteCidades";

// para fazer um formulario dcom objeto
interface IFormDados {
  // dados que vem do formulario
  email: string;
  cidadeID: number;
  nome: string;
}
const formValidateSchema: yup.SchemaOf<IFormDados> = yup.object().shape({
    // o yup.SchemaOf<IFormDados> e para tipar e usar os dados que vem do IFormdados

    nome: yup
      .string()
      .required('')
      .min(3), //obrigatorio se sting, minimo ser tres caracteres
    email: yup
      .string()
      .required()
      .email(), // tem que ser um email valido
    cidadeID: yup.number().required(),
  });

export const DetalhesPessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">(); // esse id e mesmo das rotas

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const {refForm, save, saveAndClose, isSaveClose} = useVform(); // inicializa como nulo, porque não temm dados, so depois que digitar na input pega os dados que for digitado no formulario

  useEffect(() => {
    // pega os dados do back-end para tratar
    if (id !== "nova") { /// esse IF  e para editar um usuario
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);

          navigate("/pessoas"); // se der erro ao consultar registro volta paraa tela
        } else {
          setNome(result.nome);
          refForm.current?.setData(result);
        }
      });
    } else{ // esse ELSE  e para novo usuario, so para limpar o formulario
      refForm.current?.setData({ // passa o formulario 
        nome: '', // passa vazio para que o formulario abra vazio
        cidadeID: '',
        email: '',
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (dados: IFormDados) => {
    // recebe os dados que vem do formulario de cadastro
console.log(dados)
    // espera validar todos os campo de uma vez(abortEarly)
    formValidateSchema.validate(dados, { abortEarly: false }).then((dadosvalidados) => {// se der erro
      if (id === "nova") {
        // criando um registro novo
        PessoasService.create(dadosvalidados).then((result) => {
          // se der certo criar o usuario então manda para o resulte
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveClose()) {
              // quando clicar no botão salvar/fechar vai para pessoas
              navigate("/pessoas");
            } else {
              navigate(`/pessoas/detalhes/${result}`); // com usuario criado então manda para o id dele.
            }
          }
        });
      } else {
        // atualizar o registro
        PessoasService.updateById(Number(id), {
          id: Number(id),
          ...dadosvalidados,
        }).then((result) => {
          // e so para aceitar passar em dados o mesmo id (Number(id),{id: Number(id), ...dados})

          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveClose()) {
              // quando clicar no botão salvar/fechar vai para pessoas
              navigate("/pessoas");
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
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Deletado com sucesso!!!");
          navigate("/pessoas");
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
          aoclicarNovo={() => navigate("/pessoas/detalhes/nova")}
          aoclicarSalvar={save} //passa FormHandles ou null, permite fase  sublimit
          aoclicarSalvarFechar={saveAndClose}
          aoclicarVoltar={() => navigate("/pessoas")}
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
                  Dados do Usuario
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
                  label="Digite seu Nome"// texto em cima diferente do placeholder
                  onChange={e => setNome(e.target.value)}
                  name="nome"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid
                item
                xs={12} // android todo o espaço o total e 12
                sm={12} // tablet
                md={6} // desktop
                lg={4} // larga
                xl={2}>
                <FormTexteField
                  fullWidth
                  label="Digite seu Email"
                  
                  name="email"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid
                item
                xs={12} // android todo o espaço o total e 12
                sm={12} // tablet
                md={6} // desktop
                lg={4} // larga
                xl={2}>
               
              <AutoCompleteCidades />
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
