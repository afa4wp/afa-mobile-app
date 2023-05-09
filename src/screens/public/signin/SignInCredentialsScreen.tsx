
import { Box, KeyboardAvoidingView, VStack, Input, Text, Button, Center, InputGroup, InputLeftAddon, Stack } from "native-base";
import { Platform } from 'react-native';
import  { useState} from 'react'

export function SignInCredentialsScreen() {
  const [url, setURL] =  useState('')

  return (
    <Box flex={1} bg="mark.700">
      <KeyboardAvoidingView flex={1} >
        <Box px="5"   flex={1} >
          <VStack py="5" flex={1}>
            <Text 
              fontSize="md" 
              color="mark.800"
            >
              Digite o endereço do site Wordpress que você deseja connectar.
            </Text>
            <Stack mt="2">
              <InputGroup w={{base: "80%",}}>
                <InputLeftAddon children={"https://"} />
                <Input 
                  w={{base: "100%",}} 
                  placeholder="Endereço do site" 
                  size="lg"
                  style={inputStyle}
                  onChangeText={(text)=>setURL(text)}
                />
              </InputGroup>
            </Stack>
            <VStack py="7">
              <Button 
                size="lg"
                bg="mark.900"
              >
                Continuar
              </Button>
            </VStack>
            <VStack mt="5" flex={1} justifyContent="flex-end">
              <Center>
                <Text 
                  color="mark.800"
                  textAlign="center"
                  >
                  Wordpress Admin {'>'} WP ALL Forms API {'>'} Settings {'>'} Generate QRCode
                </Text>
              </Center>
            </VStack>
          </VStack>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
}