import { Avatar } from 'native-base';
import { UserCreated } from '../../../../@types/NotificationType';
import LanguageContext from '../../../../context/LanguageContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useEffect, useState } from 'react';
dayjs.extend(relativeTime);

export function NotificationAvatar({
  UserCreated,
}: {
  UserCreated: UserCreated | [];
}) {
  const { i18n } = useContext(LanguageContext)!;
  if (typeof UserCreated === 'object' && Object.keys(UserCreated).length > 0) {
    return (
      <Avatar
        mr="2"
        source={{
          uri: (UserCreated as UserCreated).avatar_url,
        }}
      >
        {(UserCreated as UserCreated).user_name.charAt(0).toUpperCase()}
      </Avatar>
    );
  } else {
    return (
      <Avatar mr="2" bg="mark.900">
        {i18n.t('screen.entry.anonymous').charAt(0).toUpperCase()}
      </Avatar>
    );
  }
}
