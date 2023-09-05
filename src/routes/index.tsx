import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';
import Splash from './Splash';
export default function Routes() {
  const { state } = useContext(AuthContext);
  /**/
  return state.isLoading ? (
    <Splash />
  ) : state.isLoggedIn ? (
    <PrivateRoutes />
  ) : (
    <PublicRoutes />
  );
}
