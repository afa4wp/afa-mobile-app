import { Box, ScrollView, VStack, Heading } from 'native-base';
import { CardProfile } from './CardProfile';
import { ItemStatisticProfile } from './ItemStatisticProfile';
import { RegistrationDataProfile } from './RegistrationDataProfile';

import AuthContext from '../../../../context/AuthContext';
import { useContext } from 'react';
import LanguageContext from '../../../../context/LanguageContext';

export function MainContentProfile() {
  const { i18n } = useContext(LanguageContext)!;
  const {
    state: { user },
  } = useContext(AuthContext);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <ScrollView flex={1} bg="mark.700" showsVerticalScrollIndicator={false}>
      <Box px="5" flex={1} mb="8">
        <VStack py="5">
          <CardProfile user={user} />
        </VStack>
        <VStack my="2">
          <Box>
            <VStack mb="4">
              <Heading color="mark.800" fontSize="lg">
                {i18n.t('screen.profile.userInformation')}
              </Heading>
            </VStack>
            <ItemStatisticProfile
              label={i18n.t('screen.profile.createdAt')}
              value={formatDate(user.user_registered)}
              iconName="calendar"
            />
            <ItemStatisticProfile
              label={i18n.t('screen.profile.formCount')}
              value={'' + user.muber_of_forms}
              iconName="edit"
            />
          </Box>
        </VStack>
        <VStack>
          <Box>
            <RegistrationDataProfile
              label={i18n.t('screen.profile.email')}
              value={user.email}
            />
            <RegistrationDataProfile
              label={i18n.t('screen.profile.login')}
              value={user.user_login}
            />
            <RegistrationDataProfile
              label={i18n.t('screen.profile.name')}
              value={user.first_name}
            />
            <RegistrationDataProfile
              label={i18n.t('screen.profile.lastName')}
              value={user.last_name}
              hasBorder={false}
            />
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
