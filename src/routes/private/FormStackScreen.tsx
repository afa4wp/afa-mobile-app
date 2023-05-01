import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FormScreen } from '../../screens/private/form/FormScreen';
import { FormEntryScreen } from '../../screens/private/form/FormEntryScreen';
import { FormEntryMetaScreen } from '../../screens/private/form/FormEntryMetaScreen';

const FormStack = createNativeStackNavigator();

export function FormStackScreen() {
    return (
        <FormStack.Navigator>
            <FormStack.Screen  
                name = "Form" 
                component={FormScreen}
                options={{ title: 'Forms' }}
            
            />
            <FormStack.Screen  
                name = "Entry" 
                component={FormEntryScreen}
                options={{ title: 'Form Entries' }}
                />
            <FormStack.Screen  
                name = "EntryMeta" 
                component={FormEntryMetaScreen}
                options={{ title: 'Form Entries Meta' }}
                />    
        </FormStack.Navigator>
    );
  }