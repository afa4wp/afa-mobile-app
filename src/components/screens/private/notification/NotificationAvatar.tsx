import { Text, VStack, HStack, Avatar } from 'native-base';
import { UserCreated } from '../../../../@types/NotificationType';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function NotificationAvatar({
  UserCreated,
}: {
  UserCreated: UserCreated | [];
}) {
  if (typeof UserCreated === 'object' && Object.keys(UserCreated).length > 0) {
    return (
      <Avatar
        mr="2"
        source={{
          uri: (UserCreated as UserCreated).avatar_url,
        }}
      >
        {(UserCreated as UserCreated).user_name.charAt(0).toUpperCase()}
        {(UserCreated as UserCreated).user_name.charAt(1).toUpperCase()}
      </Avatar>
    );
  } else {
    return <Avatar mr="2">S</Avatar>;
  }
}
