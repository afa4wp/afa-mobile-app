import { Box, ScrollView, HStack, VStack, Avatar, Text } from 'native-base';
import * as userService from '../../../services/user';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

export function HomeScreen() {
  const [userLogged, setUserLogged] = useState(null)

  async function getUserInfo() {
    try {
      const data = await userService.me();
      setUserLogged(data);
      console.log('logado', data);
    } catch (error) {
      console.log('erro', error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Box safeAreaTop flex={1}>

      <ScrollView flex={1} px="5" py={5} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <Box flex={1} mb="8">
            <HStack flex={1} justifyContent={"space-between"} alignItems={"center"}>
              <VStack mr="3">
                <Text fontSize="sm">
                  {"Bem-vindo, %s".replace("%s", userLogged?.display_name)}
                </Text>
                <Text fontSize="24" fontWeight={600}>
                  {"Seu relatório para hoje!"}
                </Text>
              </VStack>
              <VStack>
                <Avatar
                  title={userLogged?.display_name.charAt(0)}
                  source={{ uri: userLogged?.avatar_url }}
                  size="lg"
                >
                </Avatar>
              </VStack>
            </HStack>
          </Box>
        </SafeAreaView>
      </ScrollView>
    </Box>
  );
}
