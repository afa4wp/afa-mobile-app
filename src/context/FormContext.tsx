import { createContext } from 'react';
import { FormContextProps } from '../@types/FormType';

const FormContext = createContext<FormContextProps>({} as FormContextProps);

export default FormContext;
