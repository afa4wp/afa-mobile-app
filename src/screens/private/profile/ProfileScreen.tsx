import { Box, Text, Spinner, useToast } from 'native-base';
import AuthContext from '../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { MainContentProfile } from '../../../components/screens/private/profile/MainContentProfile';
import LanguageContext from '../../../context/LanguageContext';
export function ProfileScreen() {
  const toast = useToast();
  const { i18n } = useContext(LanguageContext)!;
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
      toast.show({
        render: () => {
          return (
            <Box bg="mark.900" px="2" py="1" rounded="sm" mb={5}>
              <Text color="mark.700" fontSize="md">
                {i18n.t('screen.siginCredentials.credentials.errorOccurred')}
              </Text>
            </Box>
          );
        },
      });
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      getUserData();
    }
  }, [user]);

  if (showSpinner && (!user || Object.keys(user).length === 0)) {
    return (
      <Box
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        bg="mark.700"
      >
        <Spinner size="lg" color="mark.800" />
      </Box>
    );
  } else {
    if (!user) {
      return (
        <Box
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
          bg="mark.700"
        >
          <Text color="mark.800" fontSize="md">
            {i18n.t('screen.profile.failedLoadInformation')}
          </Text>
        </Box>
      );
    } else {
      return <MainContentProfile />;
    }
  }
}
