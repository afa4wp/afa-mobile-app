import {
  Box,
  VStack,
  Text,
  FormControl,
  Icon,
  Input,
  Pressable,
  Button,
} from 'native-base';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export function SignInCredentials() {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert('olaaaaa');
    },
  });

  return (
    <Box px="5" flex={1}>
      <VStack py="5" flex={1}>
        <VStack mb="5">
          <Text fontSize="lg">Digite as informações da conta...</Text>
        </VStack>
        <VStack>
          <FormControl
            isInvalid={formik.touched.username && formik.errors.username}
          >
            <FormControl.Label
              _text={{
                fontSize: 'md',
                color: 'mark.800',
              }}
            >
              Usuario
            </FormControl.Label>
            <Input
              size="lg"
              style={inputStyle}
              placeholder="Usuario"
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              value={formik.values.username}
              _focus={{
                borderColor:
                  formik.touched.username && formik.errors.username
                    ? 'red.500'
                    : 'green.500',
              }}
            />
            {formik.touched.username && formik.errors.username && (
              <FormControl.ErrorMessage>
                {formik.errors.username}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl
            mt="3"
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormControl.Label
              _text={{
                fontSize: 'md',
                color: 'mark.800',
              }}
            >
              Senha
            </FormControl.Label>
            <Input
              size="lg"
              style={inputStyle}
              w={{
                base: '100%',
              }}
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? 'visibility' : 'visibility-off'}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <FormControl.ErrorMessage>
                {formik.errors.password}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </VStack>
        <VStack py="7">
          <Button
            size="lg"
            bg="mark.900"
            onPress={() => {
              formik.handleSubmit();
            }}
          >
            Login
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
};
