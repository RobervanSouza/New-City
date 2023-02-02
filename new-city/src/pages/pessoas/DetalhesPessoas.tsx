import { LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDetalhes } from "../../shared/components"
import { LayoutePages } from "../../shared/layouts"
import { PessoasService } from "../../shared/services/api/passoas/PessoasService"




export const DetalhesPessoas: React.FC = () => {
    const { id = 'nova'} = useParams<'id'>() // esse id e mesmo das rotas
   
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState (false)
    const [nome, setNome] = useState ('')
 
    
    useEffect(() => {// pega os dados do back-end para tratar 
      if(id !== 'nova'){
          setIsLoading(true)
            PessoasService.getById(Number(id)).then((result) => {
                if (result instanceof Error){
                    alert(result.message);
                    
                    navigate('/pessoas'); // se der erro ao consultar registro volta paraa tela
                } else {
                  setNome(result.nome)
                 console.log(result);
                }
            })
        }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    
    const handleSave = () => {

    }
    const handleDelete = (id: number) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Realmente quer  edi apagar?")) {
        PessoasService.deleteById(id).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("apagado com sucesso!!!");
            navigate('/pessoas');
          }
        });
      }
    };
return (
  <LayoutePages
    titulo={ id === 'nova' ? 'Nova Pessoa': nome}
    barraDeFerramentas={
      <FerramentasDetalhes
        textoBotaoNovo="Nova"
        mostrarBotaoNovo={id !== "nova"} // o botão so aparece se for usuario para editar, se for nava não aparece
        mostrarBotaoApagar={id !== "nova"}

        mostrarBotaoSalvaFechar
        aoclicarApagar={() => handleDelete(Number(id))}
        aoclicarNovo={() => navigate('/pessoas/detalhes/nova')}
        aoclicarSalvar={() => {}}
        aoclicarSalvarFechar={() => {}}
        aoclicarVoltar={() =>navigate('/pessoas')}
      />
    }>
      {isLoading  && (
         <LinearProgress variant="indeterminate" />
      )}
    <p>Detalhes {id}</p>
  </LayoutePages>
);
}