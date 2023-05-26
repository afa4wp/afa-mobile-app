import { Box } from 'native-base';
import * as userService from '../../../services/user';
import { useEffect } from 'react';

export function HomeScreen() {
  async function getUserInfo() {
    try {
      const data = await userService.me();
      console.log('logado', data);
    } catch (error) {
      console.log('erro', error);
    }
  }

  /*useEffect(() => {
    getUserInfo();
  }, []);*/
  return (
    <Box safeArea flex={1}>
      Hello Home Screen
    </Box>
  );
}
