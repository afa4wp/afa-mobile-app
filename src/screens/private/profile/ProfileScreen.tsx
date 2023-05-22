import { Box, ScrollView, VStack, Heading } from 'native-base';
import { CardProfile } from '../../../components/screens/private/profile/CardProfile';
import { ItemStatisticProfile } from '../../../components/screens/private/profile/ItemStatisticProfile';
import { RegistrationDataProfile } from '../../../components/screens/private/profile/RegistrationDataProfile';
export function ProfileScreen() {
  return (
    <ScrollView flex={1} bg="mark.700" showsVerticalScrollIndicator={false}>
      <Box px="5" flex={1} mb="8">
        <VStack py="5">
          <CardProfile />
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
              value="2"
              iconName="calendar"
            />
            <ItemStatisticProfile
              label="N.º de formulários"
              value="2"
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
            <RegistrationDataProfile label="Nome" value="Claudio" />
            <RegistrationDataProfile label="Sobre Nome" value="Nhanga" />
            <RegistrationDataProfile
              label="Email"
              value="emaildeteste@gmail.com"
            />
            <RegistrationDataProfile
              label="Login"
              value="teste"
              hasBorder={false}
            />
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
