import {
  Box,
  VStack,
  Text,
  FormControl,
  Icon,
  Input,
  Pressable,
  Button,
  Modal,
  HStack,
  Spinner,
  Alert,
  Collapse,
  IconButton,
  CloseIcon,
} from 'native-base';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AuthContext from '../../../context/AuthContext';
import * as authService from '../../../services/auth';
import { LoginData } from '../../../@types/AuthTypes';
import axios from 'axios';
import { API_NAMESPACE } from '../../../constants/endpoint';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export function SignInCredentials({ url }: { url: string }) {
  const { handleLogin } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await signIn(values);
    },
  });

  const signIn = async (values: LoginData) => {
    try {
      setShowModal(true);
      setShowAlert(false);
      const result = await authService.signIn(url + API_NAMESPACE, values);
      const { access_token, refresh_token, user_email } = result;
      handleLogin(access_token, refresh_token, url + API_NAMESPACE, user_email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response) {
          const { code, message } = response.data;
          if ('invalid_username' === code) {
            formik.setErrors({
              username: message.replace(/<[^>]+>/g, ''), // Assign the error message to the specific field's error
            });
          } else if ('incorrect_password' === code) {
            formik.setErrors({
              password: message.replace(/<[^>]+>/g, ''), // Assign the error message to the specific field's error
            });
          } else {
            setShowAlert(true);
          }
        } else {
          setShowAlert(true);
        }
      } else {
      }
    } finally {
      setShowModal(false);
    }
  };

  return (
    <Box px="5" flex={1}>
      <VStack py="5" flex={1}>
        <VStack mb="5">
          <Text fontSize="lg">Digite as informações da conta...</Text>
        </VStack>
        <VStack>
          <FormControl
            isInvalid={
              formik.touched.username && formik.errors.username ? true : false
            }
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
            isInvalid={
              formik.touched.password && formik.errors.password ? true : false
            }
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
        <Box w="100%" alignItems="center" mt={showAlert ? '7' : undefined}>
          <Collapse isOpen={showAlert}>
            {showAlert && (
              <Alert maxW="400" status="error">
                <VStack space={1} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        _dark={{
                          color: 'coolGray.800',
                        }}
                      >
                        Error!
                      </Text>
                    </HStack>
                    <IconButton
                      variant="unstyled"
                      _focus={{
                        borderWidth: 0,
                      }}
                      icon={<CloseIcon size="3" />}
                      _icon={{
                        color: 'coolGray.600',
                      }}
                      onPress={() => setShowAlert(false)}
                    />
                  </HStack>
                  <Box w="100%">
                    <Text color="coolGray.600" fontSize="md">
                      An error occurred. Please try again later.
                    </Text>
                  </Box>
                </VStack>
              </Alert>
            )}
          </Collapse>
        </Box>
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
      <Modal isOpen={showModal} size="full" px="5">
        <Modal.Content maxWidth="100%">
          <Modal.Body px="0">
            <HStack space={2} px="2" py="4" alignItems="center">
              <Spinner
                size="lg"
                accessibilityLabel="Check plugin"
                color="mark.800"
              />
              <Text>Fazendo Login</Text>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
};
