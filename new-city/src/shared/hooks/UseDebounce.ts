import { useCallback, useRef } from "react";

export const useDebounce = (delay = 500, notDelay = true) => {
  // essa fução e para atrazar a resposta quando  usuario for pesquisar

  const timePagina = useRef(notDelay); // tempo pra quando entra  na pagina apareça as pessoas, não tem delay so tem quando for buscar
  const debounceces = useRef<NodeJS.Timeout>();
  const debounce = useCallback((func: () => void) => {
      if (timePagina.current) {
        // se for a primeira vez executa aqui direto, se não executa embaixo

        timePagina.current = false; // so for a primeira vez, depois e embaixo
        func(); // e so para quando mudar de pagina, quando chegar na pagina de pagina, depois ele para
      } else {
        if (debounceces.current) {
          // verifia se ja estiver um timeout cadastado então cancela e executa  o outro. POR EXEMPLO DIGITA UMA LETRA E ESPERA 30MS PARA EXECUTAR CASO DIGITE OUTRA LENTRA ENTÃO CANCELA A BUSCA ATE QUE TENHA DIGITADO TUDO  e espera um segundo para mostar
          clearTimeout(debounceces.current); // limpa o texto
        }
        debounceces.current = setTimeout(() => func(), delay); // tempo de deley para atrazar a busca
      }
    },
    [delay]
  );
  return { debounce };
};
