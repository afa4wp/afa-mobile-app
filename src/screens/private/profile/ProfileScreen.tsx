import { Box, Text, Spinner } from 'native-base';
import AuthContext from '../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { MainContentProfile } from '../../../components/screens/private/profile/MainContentProfile';

export function ProfileScreen() {
  const [showSpinner, setShowSpinner] = useState(true);
  const {
    state: { user },
    handleUser,
  } = useContext(AuthContext);

  const getUserData = async () => {
    setShowSpinner(true);
    try {
      await handleUser();
    } catch (error) {
      console.log(error);
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (showSpinner) {
    return (
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Spinner size="lg" color="mark.800" />
      </Box>
    );
  } else {
    if (!user) {
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text>Não foi possivel carregar as informações </Text>
      </Box>;
    } else {
      return <MainContentProfile />;
    }
  }
}
