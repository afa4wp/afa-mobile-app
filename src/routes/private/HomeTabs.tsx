import {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { SearchScreen } from '../../screens/private/search/SearchScreen';
import { NotificationScreen } from '../../screens/private/notification/NotificationScreen';
import { ConfigurationStackScreen } from './ConfigurationStackScreen';
import { FormStackScreen } from './FormStackScreen';
import { HomeScreen } from '../../screens/private/home/HomeScreen';
const Tab = createBottomTabNavigator();

export function HomeTabs() {

    return (
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#383042',
          tabBarInactiveTintColor: '#B1AEB4',
          tabBarShowLabel: false
        })}
      >
        <Tab.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({size, color}) => (<FontAwesome name={"home"} color={color} size={size}/>),
                    title: 'Home' 
                }}
            />
        <Tab.Screen 
                name="FormStack" 
                component={FormStackScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({size, color}) => (<FontAwesome name={"wpforms"} color={color} size={size}/>),
                    tabBarLabel:"Form",
                    title: 'Forms' 
                }}
            />
        <Tab.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{
                    tabBarIcon: ({size, color}) => (<FontAwesome name={"search"} color={color} size={size}/>),
                    title: 'Pesquisar' 
                }}
            />
        <Tab.Screen 
                name="Notification" 
                component={NotificationScreen}  
                options={{ 
                    tabBarIcon: ({size, color}) => (<FontAwesome name={"bell"} color={color} size={size}/>),
                    tabBarLabel:"Notificação",
                    title: 'Notificações' 
                }} 
            />
        <Tab.Screen 
                name="ConfigurationStack" 
                component={ConfigurationStackScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({size, color}) => (<FontAwesome name={"cog"} color={color} size={size}/>),
                    tabBarLabel:"Configuração",
                    title: 'Configurações' 
                }}
            />
        
      </Tab.Navigator>
    );
  }