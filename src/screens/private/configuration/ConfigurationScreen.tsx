import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ConfigurationItem } from '../../../components/screens/private/configuration/ConfigurationItem';
import { Logout } from '../../../components/screens/private/configuration/Logout';
import { Language } from '../../../components/screens/private/configuration/Language';
export function ConfigurationScreen() {
  const navigation = useNavigation();

  return (
    <Box flex={1} bg="mark.700">
      <Box px="5" flex={1}>
        <ConfigurationItem
          label="Notificações"
          iconName="bell"
          onPress={() => navigation.navigate('NotificationConfig')}
        />
        <ConfigurationItem
          label="Informaçoes pessoais"
          iconName="user"
          onPress={() => navigation.navigate('Profile')}
        />
        <Language />
        <ConfigurationItem
          label="Sobre WP AFA"
          iconName="info-circle"
          onPress={() => navigation.navigate('About')}
        />
        <Logout />
      </Box>
    </Box>
  );
}
