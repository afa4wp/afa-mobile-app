import { Skeleton, VStack, HStack, Avatar } from 'native-base';

export function SkeletonUserWelcome() {
    return (
        <HStack flex={1} justifyContent={"space-between"} alignItems={"center"}>
            <VStack flex={1} mr="3">
                <Skeleton h="3" mb={4} w="150" rounded="full" />
                <Skeleton h="6" w="250" rounded="full" />
            </VStack>
            <VStack>
                <Avatar
                  size="lg"
                >
                </Avatar>
            </VStack>
        </HStack>
    );
  }

