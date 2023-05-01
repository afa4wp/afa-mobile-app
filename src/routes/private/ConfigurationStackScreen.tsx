import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConfigurationScreen } from '../../screens/private/configuration/ConfigurationScreen';
import { NotificationConfigScreen } from '../../screens/private/configuration/NotificationConfigScreen';

const ConfigurationStack = createNativeStackNavigator();

export function ConfigurationStackScreen() {
    return (
        <ConfigurationStack.Navigator>
            <ConfigurationStack.Screen  
                name = "Configuration" 
                component={ConfigurationScreen}
                options={{ title: 'Configurações' }}
            
            />
            <ConfigurationStack.Screen  
                name = "NotificationConfig" 
                component={NotificationConfigScreen}
                options={{ title: 'Conf. de notificações' }}
                />
        </ConfigurationStack.Navigator>
    );
  }