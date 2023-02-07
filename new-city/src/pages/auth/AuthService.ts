import { Api } from "../../shared/services/api/axios-config/Index";

interface IAuth{
    accesToken: string;
}
const auth = async (email: string, password: string
): Promise<IAuth | Error> => {
  // o number e para retorna um pessoa  que e um id.
  try {
    const { data } = await Api.get("/auth", {data:{email, password}}); // faz o posto e retorna uma pessoa e sua identificação e um id, so um dado e não todos, como retorna so um id então e mais rapido a resposta e não demora para pasar todos os dados ('/cidades', dados), na pagina de cidades passa os dados

    if (data) {
      return data;
    }
    return new Error("Erro Login");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Login"
    );
  }
};


export const  AuthService = {
  auth,
}