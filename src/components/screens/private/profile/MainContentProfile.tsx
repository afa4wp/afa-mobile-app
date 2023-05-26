import { Box, ScrollView, VStack, Heading } from 'native-base';
import { CardProfile } from './CardProfile';
import { ItemStatisticProfile } from './ItemStatisticProfile';
import { RegistrationDataProfile } from './RegistrationDataProfile';

import AuthContext from '../../../../context/AuthContext';
import { useContext } from 'react';

export function MainContentProfile() {
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <ScrollView flex={1} bg="mark.700" showsVerticalScrollIndicator={false}>
      <Box px="5" flex={1} mb="8">
        <VStack py="5">
          <CardProfile user={user} />
        </VStack>
        <VStack my="2">
          <Box>
            <VStack mb="3">
              <Heading color="mark.800" fontSize="lg">
                Estatística
              </Heading>
            </VStack>
            <ItemStatisticProfile
              label="Tempo na mark"
              value={user.user_registered}
              iconName="calendar"
            />
            <ItemStatisticProfile
              label="N.º de formulários"
              value={'' + user.muber_of_forms}
              iconName="edit"
            />
          </Box>
        </VStack>
        <VStack mt="2">
          <Box>
            <VStack mb="4">
              <Heading color="mark.800" fontSize="lg">
                Dados de cadastro
              </Heading>
            </VStack>
            <RegistrationDataProfile label="Email" value={user.email} />
            <RegistrationDataProfile label="Login" value={user.user_login} />
            <RegistrationDataProfile label="Nome" value={user.first_name} />
            <RegistrationDataProfile
              label="Sobre Nome"
              value={user.last_name}
              hasBorder={false}
            />
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
