
import { Box, Center, VStack,  Heading, Text, Button, Icon } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Welcome from '../../../assets/welcome.svg'
import { Ionicons } from "@expo/vector-icons";

export function SignInScreen() {
  const navigation = useNavigation();

  return (
    <Box flex={1} bg="mark.700">
      <Box px="5" flex={1} justifyContent="center">
        <VStack mb="5">
          <Center>
            <Welcome  width={273} height={184}/>
          </Center>
        </VStack>
        <VStack py="5">
          <Center>
            <Heading 
              color="mark.800"
              bold>
              Faça login para continuar!
            </Heading>
          </Center>
        </VStack>
        <VStack mb="5">
          <Center>
            <Text 
              color="mark.800"
              fontSize="lg"
              bold
              textAlign="center"
              >
              A forma mais facil de visualizar as informações ou dados enviados pelos seus clientes
            </Text>
          </Center>
        </VStack>
        <VStack mt="5">
            <Button 
              size="lg"
              bg="mark.900"
              onPress={() => {
                navigation.navigate('SignInQRCode');
              }}
              leftIcon={<Icon as={Ionicons} name="qr-code" size="md" />}
            >
              SignIn with QRCode 
            </Button>
        </VStack>
        <VStack my="5">
            <Button 
              size="lg"
              variant='outline'
              onPress={() => {
                navigation.navigate('SignInUserInfo');
              }}
            >
              SignIn with Credentials
            </Button>
        </VStack>
      </Box>
    </Box>
    )
}