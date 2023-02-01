import { Enviroment } from "../../../environment";
import { Api } from "../axios-config/Index"


interface IPessoas{ // quando for cadastrar uma pessoa pode colocar qual cidade ele pertence
    id: number;
    email: string;
    cidadeID: number;
    nome: string;
    
}
interface IDetalhesPessoas{ // quando for cadastrar uma pessoa pode colocar qual cidade ele pertence
    id: number;
    email: string;
    cidadeID: number;
    nome: string;
    
}

// type e parecido com class, pode ser feito com uma interface, tipa tambem
type ITotalPessoasCout = {
    data: IPessoas [];
    totalPessoas: number;
}

const getAll = async (page = 1, filter =''): Promise<ITotalPessoasCout | Error> =>{
try {
  // são o limit de paginas que podem ser renderizadas os itens na tela, pod ter varias paginas
  // o filter e para bucar pelo nome
  const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like${filter}`;

  const { data, headers } = await Api.get(urlRelativa); // faz a consullta na api e passa os dados para data 
 
    if(data) {
        return{
            data,
            totalPessoas: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),// o header e uma propriedade do json-server slice que conta, e para contar a quantidade de dados
        };
    }
 
    return new Error('Erro ao listar registros')
} catch (error) {
    console.error(error);
    return new Error(( error as { message: string}).message || "Erro ao listar registros");
    // e para pegar a mensagem que o back passar a mensagem se não o erro, vai ser encontrado no tray
}
}
const getById = async (): Promise<any> =>{
try {
    
} catch (error) {
    
}
}
const create = async (): Promise<any> =>{
try {
    
} catch (error) {
    
}
}
const updateById = async (): Promise<any> =>{
try {
    
} catch (error) {
    
}
}
const deleteById = async (): Promise<any> =>{
try {
    
} catch (error) {
    
}
}


export const PessoasService =  {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}