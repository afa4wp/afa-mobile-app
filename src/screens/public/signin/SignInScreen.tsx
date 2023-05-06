
import { Box, Center, VStack } from "native-base";
import Welcome from '../../../assets/welcome.svg'

export function SignInScreen() {
  return (
    <Box safeArea  flex={1} >
        <VStack >
            <Center>
            <Welcome  width={273} height={184}/>
            </Center>
        </VStack>
    </Box>
  );
}