import { Skeleton, VStack, HStack, ScrollView } from 'native-base';

const SkeletonItem = () => {
  return (
    <VStack
      overflow="hidden"
      mb="4"
      rounded="lg"
      borderRadius="md"
      borderColor="#E1E1E2"
      borderWidth="1"
      py="4"
      px="2"
    >
      <HStack mb="5">
        <Skeleton h="10" />
      </HStack>
      <HStack justifyContent="space-between" alignItems="center" mb="5">
        <Skeleton w="40" h="2" />
        <HStack space="2">
          <Skeleton w="2" h="2" />
          <Skeleton w="2" h="2" />
        </HStack>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <Skeleton w="40" h="2" />
        <HStack space="2">
          <Skeleton w="2" h="2" />
        </HStack>
      </HStack>
    </VStack>
  );
};

export function SkeletonForm() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1} mt="5">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </ScrollView>
  );
}
