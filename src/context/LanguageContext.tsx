import { createContext } from 'react';
import { LanguageContextProps } from '../@types/LanguageTypes';

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export default LanguageContext;
