import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CidadesService } from "../../../shared/services/api/cidades/CidadecService";


type IAutoComplete = {
    id: number;
    label: string;
}

interface ICarregandoProps {
    iscarregando?: boolean;
}
export const AutoCompleteCidades: React.FC<ICarregandoProps> = ({iscarregando = false}) => {
    const {fieldName, clearError,error, registerField} = useField('cidadeID');
    const {debounce} = useDebounce();
    const [auto, setAuto] = useState<IAutoComplete[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState<number | undefined >(undefined);
    const [busca, setBusca] = useState('');


    useEffect(()=> {
    registerField({
        name: fieldName,
        getValue: () => selected,
        setValue:(_, newSelectedID) =>setSelected(newSelectedID)
    })
    }, [registerField, fieldName, selected])

    useEffect(() => {
        setLoading(true);
     
      debounce(() => {
        // o then e quando o service retorna ele evai executar uma função
        CidadesService.getAll(1, busca).then((result) => {
         
          if (result instanceof Error) {
            alert(result.message);
          } else {
          setLoading(false);
            
            setAuto(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome})));// transformar em uma lista utilizando o map
          }
        });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [busca]);

    const autoCompleteSelected = useMemo (()=> { // e so para guardar a cidade selecionada
     if (!selected ) return null;// mostra a cidade se tiver selecionada, se não undefined
      
     const selectedOption = auto.find(opcao => opcao.id === selected) // enconta aopção que esta selecionada atravez do id
     if (!selected ) return null;

      return selectedOption;
    }, [selected, auto])
  return (
    <div>
      <Autocomplete
      openText="Abrir" // esta na opção de cidades
      closeText="Fechar"
      noOptionsText = "Sem Opções"
      loadingText="carregando..."
      disablePortal
        value={autoCompleteSelected}
        loading={isLoading}
        disabled={iscarregando}
        onChange={(_, newValue) => {
          setSelected(newValue?.id);
          setBusca(""); clearError();
        }}
        popupIcon={ (iscarregando || isLoading) ? <CircularProgress size={28} /> : undefined}
        onInputChange={(_, newValue) => setBusca(newValue)} // quando não usa o (e )evento  então coloca (_)
        options={auto}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params}
        
        error= {!!error} // campo obtigatorio da cidade 
        helperText={error}
        label="Cidades"
         />}
      />
    </div>
  );
};
