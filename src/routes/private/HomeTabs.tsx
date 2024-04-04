import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { SearchScreen } from '../../screens/private/search/SearchScreen';
import { NotificationScreen } from '../../screens/private/notification/NotificationScreen';
import { ConfigurationStackScreen } from './ConfigurationStackScreen';
import { FormStackScreen } from './FormStackScreen';
import { HomeScreen } from '../../screens/private/home/HomeScreen';
import LanguageContext from '../../context/LanguageContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationContext from '../../context/notification';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  const { i18n } = useContext(LanguageContext)!;
  const { state } = useContext(NotificationContext);
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#383042',
        tabBarInactiveTintColor: '#B1AEB4',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={'home'} color={color} size={size} />
          ),
          title: i18n.t('screen.headTitle.home'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FormStack"
        component={FormStackScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('FormStack', {
              screen: 'Form',
            });
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="email-receive"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Form',
          title: i18n.t('screen.headTitle.forms'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={'search'} color={color} size={size} />
          ),
          title: i18n.t('screen.headTitle.search'),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={'bell'} color={color} size={size} />
          ),
          tabBarBadge: state.Badge_number ? state.Badge_number : undefined,
          tabBarLabel: 'Notificação',
          title: i18n.t('screen.headTitle.notifications'),
        }}
      />
      <Tab.Screen
        name="ConfigurationStack"
        component={ConfigurationStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={'cog'} color={color} size={size} />
          ),
          tabBarLabel: 'Configuração',
          title: i18n.t('screen.headTitle.configurations'),
        }}
      />
    </Tab.Navigator>
  );
}
