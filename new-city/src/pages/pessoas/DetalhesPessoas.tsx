import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDetalhes } from "../../shared/components"
import { LayoutePages } from "../../shared/layouts"




export const DetalhesPessoas: React.FC = () =>{
    const { id = 'nova'} = useParams<'id'>() // esse id e mesmo das rotas
   
    const navigate = useNavigate()

    useEffect(() => {
        
        return () => {
            
        }
    }, []);
    
    const handleSave = () => {

    }
    const handleDelete = () => {

    }
return (
  <LayoutePages
    titulo="Detalhes de Pessoas"
    barraDeFerramentas={
      <FerramentasDetalhes
        textoBotaoNovo="Nova"
        mostrarBotaoNovo={id !== "nova"} // o botão so aparece se for usuario para editar, se for nava não aparece
        mostrarBotaoApagar={id !== "nova"}

        mostrarBotaoSalvaFechar
        aoclicarApagar={() => {}}
        aoclicarNovo={() => navigate('/pessoas/detalhes/nova')}
        aoclicarSalvar={() => {}}
        aoclicarSalvarFechar={() => {}}
        aoclicarVoltar={() =>navigate('/pessoas')}
      />
    }>
    <p>Detalhes {id}</p>
  </LayoutePages>
);
}