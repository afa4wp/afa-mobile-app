
import { Box, VStack, Input, Text, Button, Center, InputGroup, InputLeftAddon, Stack, FormControl, FormErrorMessage } from "native-base";
import { Platform } from 'react-native';
import  { useState} from 'react'
import * as yup from 'yup';
import { useFormik } from "formik";

export function ValidateURL() {
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert("ipppp")
      console.log(values);
    },
  });

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  return (
    <Box px="5" flex={1} >
    <VStack py="5" flex={1}>
            <Text 
              fontSize="md" 
              color="mark.800"
            >
              Digite o endereço do site Wordpress que você deseja connectar.
            </Text>
            <Stack mt="2">
              <FormControl isInvalid={!!error}>
                <InputGroup w={{base: "80%",}}>
                  <InputLeftAddon children={"https://"} />
                  <Input 
                    w={{base: "100%",}} 
                    placeholder="Endereço do site" 
                    size="lg"
                    style={inputStyle}
                    onChangeText={(text)=>setUrl(text)}
                  />
                </InputGroup>
                {formik.errors.url && formik.touched.url && (
                  <FormControl.ErrorMessage>{formik.errors.url}</FormControl.ErrorMessage>
                )}
              </FormControl>
            </Stack>
            <VStack py="7">
              <Button 
                size="lg"
                bg="mark.900"
                onPress={()=>{
                  alert("oiiiiiiii")
                }}
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
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
}

const validationSchema = yup.object().shape({
  url: yup.string().url('Please enter a valid URL').required('URL is required'),
});