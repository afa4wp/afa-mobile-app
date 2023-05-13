import { createContext } from 'react';
import { AuthContextProps } from '../@types/AuthTypes';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
