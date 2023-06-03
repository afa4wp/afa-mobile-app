import {
  Text,
  VStack,
  Divider,
  Pressable,
  IconButton,
  HStack,
  Icon,
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Share } from 'react-native';
import { PermaLink } from '../../../../@types/FormType';

export function ShareButtonItem({ permaLink }: { permaLink: PermaLink }) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${permaLink.page_link}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <VStack>
      <Pressable onPress={() => onShare()}>
        <VStack py="4" px="4">
          <VStack mb="2">
            <Text fontSize="md" color="mark.800" bold>
              {permaLink.page_name}
            </Text>
          </VStack>
          <VStack>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack flex={1}>
                <Text fontSize="sm" color="mark.800">
                  {permaLink.page_link}
                </Text>
              </HStack>
              <HStack alignItems="center" px="2">
                <Icon
                  as={FontAwesome}
                  size="sm"
                  name="share-alt"
                  colorScheme="red"
                  color="mark.800"
                />
              </HStack>
            </HStack>
          </VStack>
        </VStack>
        <Divider bg="rgba(124, 131, 219, 0.1)" />
      </Pressable>
    </VStack>
  );
}
