import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { FormScreen } from '../../screens/private/form/FormScreen';
import { FormEntryScreen } from '../../screens/private/form/FormEntryScreen';
import { FormEntryMetaScreen } from '../../screens/private/form/FormEntryMetaScreen';
import LanguageContext from '../../context/LanguageContext';
import FormProvider from '../../providers/FormProvider';

const FormStack = createNativeStackNavigator();

export function FormStackScreen() {
  const { i18n } = useContext(LanguageContext)!;
  return (
    <FormProvider>
      <FormStack.Navigator>
        <FormStack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: i18n.t('screen.headTitle.forms') }}
        />
        <FormStack.Screen
          name="Entry"
          component={FormEntryScreen}
          options={{ title: i18n.t('screen.headTitle.formSubmissions') }}
        />
        <FormStack.Screen
          name="EntryMeta"
          component={FormEntryMetaScreen}
          options={{ title: i18n.t('screen.headTitle.formSubmissionsData') }}
        />
      </FormStack.Navigator>
    </FormProvider>
  );
}
