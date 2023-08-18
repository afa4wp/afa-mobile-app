import { Skeleton, VStack, HStack } from 'native-base';

export const SkeletonCardProfile = () => {
  return (
    <VStack
      overflow="hidden"
      mb="4"
      rounded="lg"
      borderRadius="md"
      borderColor="#E1E1E2"
      borderWidth="1"
    >
      <HStack>
        <Skeleton h="20" />
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <Skeleton h="20" />
        <HStack space="2"></HStack>
      </HStack>
    </VStack>
  );
};
