import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core"
import { useEffect, useState } from "react";



type IFormFieldProps = TextFieldProps& {
    name: string;
}

export const FormTexteField: React.FC<IFormFieldProps> = ({name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name); // useField(name) pega os dados que vem do formulario
  // o useField forneca as propriedades para tratar os dados que vem do formulario>>fieldName, registerField, defaultValue, error, clearError 
  const [value, setValue] = useState(defaultValue || '' );

  useEffect(() => {
    registerField({
      // pegas os dados que vem do useField(name) e faz o registro dos dados atravez do evento do onChange
      name: fieldName,
      getValue: () => value, /// pega os valores da state 
      setValue: (_, newValue) => setValue(newValue), // altera as state 
    });
  }, [registerField, fieldName, value]);

  // integar a input com unform
  return (
    <TextField
      {...rest}

      error={!!true} // se for undefined e false, o segundo ! treanforma para bolean que e treu
      helperText={error}// passa undefind
      defaultValue={defaultValue} // eleimiar erro se tiver
      onKeyDown={()=> error ? clearError() : undefined} // se não tem limpa a tela
      value={value}


      onChange={(e) => setValue(e.target.value)} // o setvalue manda os dados da input para set registrados



    />
  ); 
}