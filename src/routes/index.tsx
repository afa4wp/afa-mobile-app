import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';
export default function Routes() {
  const { state } = useContext(AuthContext);
  /**/
  return state.isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
}
