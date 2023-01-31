import { BarraDeFerramentas } from "../../shared/components";
import { LayoutePages } from "../../shared/layouts";

export const DashBoard = () => {
  return (
    <LayoutePages
      titulo="Pagina Inicial "
      barraDeFerramentas={(
        <BarraDeFerramentas
        mostrarInputBusca //motra a barra de pesquisa
        textoBotaoVovo="nova"
        />
      )}>
      testando
    </LayoutePages>
  );
};

// <LayoutePages titulo="Pagina Inicial "> //3 o titulo foi a interface criada no page. foi passado praqui
