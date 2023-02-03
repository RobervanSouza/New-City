import { Enviroment } from "../../../environment";
import { Api } from "../axios-config/Index";

export interface ICidades {
  // quando for cadastrar uma pessoa pode colocar qual cidade ele pertence
  id: number;
 
  nome: string;
}
export interface IDetalhesCidades {
  // quando for cadastrar uma pessoa pode colocar qual cidade ele pertence
  id: number;
 
  nome: string;
}

// type e parecido com class, pode ser feito com uma interface, tipa tambem
export type ITotalCidadesCout = {
  data: ICidades[];
  totalCidades: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<ITotalCidadesCout | Error> => {
  try {
    // são o limit de paginas que podem ser renderizadas os itens na tela, pod ter varias paginas
    // o filter e para bucar pelo nome
    const urlRelativa = `/cidades?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like${filter}`;

    const { data, headers } = await Api.get(urlRelativa); // faz a consullta na api e passa os dados para data

    if (data) {
      return {
        data,
        totalCidades: Number(
          headers["x-total-count"] || Enviroment.LIMITE_DE_LINHAS
        ), // o header e uma propriedade do json-server slice que conta, e para contar a quantidade de dados
      };
    }

    return new Error("Erro ao listar registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar registros"
    );
    // e para pegar a mensagem que o back passar a mensagem se não o erro, vai ser encontrado no tray
  }
};
const getById = async (id: number): Promise<IDetalhesCidades | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);
    if (data) {
      return data;
    }

    return new Error("Erro ao consultar Id Registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consulta registros"
    );
  }
};
const create = async (
  dados: Omit<IDetalhesCidades, "id">
): Promise<Number | Error> => {
  // o number e para retorna um pessoa  que e um id.
  try {
    const { data } = await Api.post<IDetalhesCidades>("/cidades", dados); // faz o posto e retorna uma pessoa e sua identificação e um id, so um dado e não todos, como retorna so um id então e mais rapido a resposta e não demora para pasar todos os dados ('/cidades', dados), na pagina de cidades passa os dados

    if (data) {
      return data.id;
    }
    return new Error("Erro ao Cadastrar");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao Cadastrar"
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalhesCidades
): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dados);

    return new Error("atualizado com sucesso");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro atualizar registros"
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
