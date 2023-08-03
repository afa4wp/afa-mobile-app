import { Text, VStack, HStack } from 'native-base';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const formatTextWithBold = (text: string) => {
  const parts = text.split(/\{bold\}|\{\/bold\}/);
  return parts.map((part, index) => {
    if (index % 2 === 0) {
      return <Text key={index}>{part}</Text>;
    } else {
      return (
        <Text key={index} bold>
          {part}
        </Text>
      );
    }
  });
};

export function NotificationText({ message }: { message: string }) {
  const formattedText = formatTextWithBold(message);
  return (
    <Text color="mark.800" fontSize="md">
      {formattedText}
    </Text>
  );
}
