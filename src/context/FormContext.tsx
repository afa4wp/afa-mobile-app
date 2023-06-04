import { createContext } from 'react';
import { FormContextProps } from '../@types/FormType';

const FormContext = createContext<FormContextProps | undefined>(undefined);

export default FormContext;
