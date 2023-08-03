import {
  Avatar,
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Pressable,
} from 'native-base';
import LanguageContext from '../../../../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { NotificationText } from './NotificationText';
import { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Notification } from '../../../../@types/NotificationType';
import { calculateDiffDayJS } from '../../../../helpers/calculateDiffDayJS';
import { NotificationAvatar } from './NotificationAvatar';
dayjs.extend(relativeTime);

export function CardNotification({
  notification,
}: {
  notification: Notification;
}) {
  const navigation = useNavigation();
  const { i18n } = useContext(LanguageContext)!;
  const getDate = (date: string) => {
    const result = calculateDiffDayJS(date);
    return result.value + ' ' + i18n.t(result.unit);
  };

  const goToFormEntryScreen = () => {
    navigation.navigate('FormStack', {
      screen: 'EntryMeta',
      params: {
        entryId: notification.meta_value.entry_id,
      },
    });
  };

  return (
    <Pressable
      _pressed={{
        backgroundColor: '#E1E1E2',
      }}
      onPress={() => goToFormEntryScreen()}
    >
      <VStack mb="5" px="5" mt="5">
        <HStack>
          <NotificationAvatar UserCreated={notification.user_created} />
          <Box flex={1} mr="2">
            <NotificationText message={notification.message} />
          </Box>
          <Box>
            <Text>{getDate(notification.created_at)}</Text>
          </Box>
        </HStack>
      </VStack>
    </Pressable>
  );
}
