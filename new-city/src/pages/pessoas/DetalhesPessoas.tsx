import { LinearProgress, TextField } from "@mui/material";
import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDetalhes } from "../../shared/components";
import { FormTexteField } from "../../shared/forms/TextField";
import { LayoutePages } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/passoas/PessoasService";

// para fazer um formulario dcom objeto
interface IFormDados{ // dados que vem do formulario
  email: string;
  cidadeID: number;
  nome: string;
  
}

export const DetalhesPessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">(); // esse id e mesmo das rotas

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const refForm =  useRef<FormHandles>(null ) // inicializa como nulo, porque não temm dados, so depois que digitar na input pega os dados que for digitado no formulario

  useEffect(() => {
    // pega os dados do back-end para tratar
    if (id !== "nova") {
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (dados: IFormDados) => { // recebe os dados que vem do formulario de cadastro
    setIsLoading(true);

    if (id=== 'nova') {
      PessoasService.create(dados).then((result) => {// se der certo criar o usuario então manda para o resulte
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/pessoas/detalhes/${result}`);// com usuario criado então manda para o id dele.
        }
      })
    } else { // atualizar o registro
      PessoasService.updateById(Number(id),{id: Number(id), ...dados}).then((result) => {
        // e so para aceitar passar em dados o mesmo id (Number(id),{id: Number(id), ...dados})

        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } 
      });
      
    }
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
          aoclicarSalvar={() => refForm.current?.submitForm()} //passa FormHandles ou null, permite fase  sublimit
          aoclicarSalvarFechar={() => refForm.current?.submitForm()}
          aoclicarVoltar={() => navigate("/pessoas")}
        />
      }>
      <Form ref={refForm} 
      onSubmit={handleSave} // manda os dados para salvar e ser tratado
      >
        <FormTexteField placeholder="Digite seu Nome" name="nome" />
        <FormTexteField placeholder="Digite seu Email" name="email" />
        <FormTexteField placeholder="Digite sua Cidade ID" name="cidadeID" />

        <button>teste</button>
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