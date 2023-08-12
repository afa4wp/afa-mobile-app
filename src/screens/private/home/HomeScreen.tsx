import { Box, ScrollView, HStack, VStack, Avatar, Text } from 'native-base';
import * as userService from '../../../services/user';
import { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native';

import { SkeletonUserWelcome } from '../../../components/skeleton/homescreen/UserWelcome';
import { GraphWeek } from '../../../components/screens/private/homescreen/GraphWeek';
import { FormItems } from '../../../components/screens/private/homescreen/FormItems';
import AuthContext from '../../../context/AuthContext';
export function HomeScreen() {
  const [userLogged, setUserLogged] = useState(null);
  const { updateFormType, state } = useContext(AuthContext);

  async function getUserInfo() {
    try {
      const data = await userService.me();
      setUserLogged(data);
    } catch (error) {
      console.log('erro', error);
    }
  }

  useEffect(() => {
    //getUserInfo();
  }, []);

  if (!state.formType) {
    return <FormItems />;
  } else {
    return (
      <Box safeAreaTop flex={1}>
        <ScrollView flex={1} px={5} py={5} showsVerticalScrollIndicator={false}>
          <SafeAreaView>
            <Box flex={1} mb="8">
              {userLogged === null ? (
                <SkeletonUserWelcome />
              ) : (
                <HStack
                  flex={1}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <VStack mr="3">
                    <Text fontSize="sm">
                      {'Bem-vindo, %s'.replace('%s', userLogged?.display_name)}
                    </Text>
                    <Text fontSize="24" fontWeight={600}>
                      {'Seu relatório para hoje!'}
                    </Text>
                  </VStack>
                  <VStack>
                    <Avatar
                      title={userLogged?.display_name.charAt(0)}
                      source={{ uri: userLogged?.avatar_url }}
                      size="lg"
                    ></Avatar>
                  </VStack>
                </HStack>
              )}
            </Box>
            <Box flex={1}>
              <GraphWeek />
            </Box>
          </SafeAreaView>
        </ScrollView>
      </Box>
    );
  }
}
