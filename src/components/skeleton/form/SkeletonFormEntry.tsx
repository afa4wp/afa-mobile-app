import {
  Skeleton,
  VStack,
  HStack,
  ScrollView,
  Divider,
  Box,
  Avatar,
  Pressable,
} from 'native-base';
import { SkeletonItem as SkeletonItemForm } from './SkeletonForm';

const SkeletonItem = () => {
  return (
    <Pressable
      _pressed={{
        backgroundColor: '#E1E1E2',
      }}
      onPress={() => {}}
    >
      <HStack py="4">
        <Box mr={2}>
          <Skeleton size="10">
            <Avatar />
          </Skeleton>
        </Box>
        <Box flex={1}>
          <VStack>
            <Skeleton height="5" mb="1" />
            <Skeleton height="5" />
            <HStack mt="2">
              <Skeleton height="5" width="80%" />
            </HStack>
          </VStack>
        </Box>
        <Box ml="5">
          <Skeleton height="5" width="70%" />
        </Box>
      </HStack>
      <Divider bg="rgba(124, 131, 219, 0.1)" />
    </Pressable>
  );
};

export function SkeletonFormEntry() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1} mt="5">
      <SkeletonItemForm />
      <Skeleton w="70%" h="5" my="2" />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </ScrollView>
  );
}
