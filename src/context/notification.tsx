import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'native-base';
import Constants from 'expo-constants';

type NotificationContextProps = {
  children: ReactNode;
};

type StateContextProps = {
  state: State;
  registerForPushNotificationsAsync: () => Promise<string | undefined>;
  resetBadgeNumber: () => void;
};

type State = {
  notifications: Notification[];
  Badge_number: number;
};

type Notification = {
  id: number;
  user_id: string | null;
  notification_type_id: number;
  meta_value: any;
  created_at: string;
};

type Action = { type: 'UPDATE_BADGE_NUMBER' } | { type: 'RESET_BADGE_NUMBER' };

const initialState: State = {
  notifications: [] as Notification[],
  Badge_number: 0,
};

const NotificationContext = React.createContext<StateContextProps>(
  {} as StateContextProps
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_BADGE_NUMBER': {
      return {
        ...state,
        Badge_number: state.Badge_number + 1,
      };
    }
    case 'RESET_BADGE_NUMBER': {
      return {
        ...state,
        Badge_number: 0,
      };
    }
    default:
      return state;
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const NotificationProvider = ({
  children,
}: NotificationContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const nav = useRef();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        AddBadgeNumber();
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //console.log(response);
        nav.current.navigate('Notification');
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const AddBadgeNumber = () => {
    dispatch({
      type: 'UPDATE_BADGE_NUMBER',
    });
  };

  const resetBadgeNumber = () => {
    dispatch({
      type: 'RESET_BADGE_NUMBER',
    });
  };

  return (
    <NotificationContext.Provider
      value={{ state, registerForPushNotificationsAsync, resetBadgeNumber }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer ref={nav}>{children}</NavigationContainer>
    </NotificationContext.Provider>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // to do Calling getExpoPushTokenAsync without specifying a projectId is deprecated and will no longer be supported in SDK 49+
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })).data;
    //console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default NotificationContext;
