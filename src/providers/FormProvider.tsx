import React, { useReducer, useEffect } from 'react';
import { Action, State } from '../@types/FormType';
import FormContext from '../context/FormContext';
import formReducer from '../reducers/formReducer';
import { FormType } from '../@types/FormType';
import { EntryType } from '../@types/EntryType';

interface FormProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  form: {} as FormType,
  entry: {} as EntryType,
};

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setForm = (form: FormType) => {
    dispatch({
      type: 'SET_FORM',
      payload: form,
    });
  };

  const setEntry = (entry: EntryType) => {
    dispatch({
      type: 'SET_ENTRY',
      payload: entry,
    });
  };

  const fetchEntry = async (entryId: number | string) => {
    /*const result = await entryService.entryByID(entryId);

    if (result && result.id) {
      setEntry(result);
    }*/
  };

  return (
    <FormContext.Provider value={{ state, setEntry, setForm, fetchEntry }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
