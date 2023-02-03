import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";



export const useVform = ( ) => {
const refForm = useRef<FormHandles>(null); 
const isSaveNew = useRef(false); 
const isSaveAndClose = useRef(false); 
   
    const handleSave = useCallback(() => {
      isSaveNew.current = false; // clicar em salvar, não quer criar nova pesso
      isSaveAndClose.current = false; // clicar em salvar, não quer criar nova fechar
      refForm.current?.submitForm(); // vai salver os dados
    },[]);


    const handleSaveAndNew = useCallback(() => {
      isSaveNew.current = true;
      isSaveAndClose.current = false;// se tiver salvando e quiser criar um novo registro
      refForm.current?.submitForm(); //
    },[]);


    const handleSaveAndClose = useCallback(() => {
      isSaveNew.current = false;
      isSaveAndClose.current = true;
      refForm.current?.submitForm(); //
    },[]);


    const handleIsSaveNew = useCallback(() => {
    return isSaveNew.current; // saber se quando salvar que criar um novo registro, quer fechrar tela de detalhes
    },[]);


    const handleIsSaveAndClose = useCallback(() => {
    return isSaveAndClose.current;
    },[]);
   

 
    return{
        refForm,

        save: handleSave, 
        saveAndClose: handleSaveAndClose,
        saveAndNew: handleSaveAndNew,
        isSaveNew: handleIsSaveNew,
        isSaveClose: handleIsSaveAndClose,

    
    }
}