import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ConfigurationItem } from '../../../components/screens/private/configuration/ConfigurationItem';
import { Logout } from '../../../components/screens/private/configuration/Logout';
import { Language } from '../../../components/screens/private/configuration/Language';
import LanguageContext from '../../../context/LanguageContext';
import { useContext } from 'react';

export function ConfigurationScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const navigation = useNavigation();

  return (
    <Box flex={1} bg="mark.700">
      <Box px="5" flex={1}>
        <ConfigurationItem
          label={i18n.t('screen.configuration.notification')}
          iconName="bell"
          onPress={() => navigation.navigate('NotificationConfig')}
        />
        <ConfigurationItem
          label={i18n.t('screen.configuration.profileInformation')}
          iconName="user"
          onPress={() => navigation.navigate('Profile')}
        />
        <Language />
        <ConfigurationItem
          label={i18n.t('screen.configuration.about')}
          iconName="info-circle"
          onPress={() => navigation.navigate('About')}
        />
        <Logout />
      </Box>
    </Box>
  );
}
