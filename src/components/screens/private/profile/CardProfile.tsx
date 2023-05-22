import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  IconButton,
  Modal,
  Button,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useContext, useState } from 'react';

export function CardProfile() {
  const [showModal, setShowModal] = useState(false);
  const user = {
    first_name: 'claudio',
    last_name: 'nhanga',
    display_name: 'claudio nhanga',
    user_roles: ['admin', 'tester', 'home'],
    avatar_url:
      'https://gravatar.com/avatar/0ab27a4bb7efde4b83d5967f6886b4bb?s=400&d=robohash&r=x',
  };
  const getFullName = () => {
    if (user.first_name && user.last_name)
      return user.first_name + ' ' + user.last_name;

    if (user.first_name) return user.first_name;

    return user.display_name;
  };

  const allUserRoles = () => {
    const result = Array.isArray(user.user_roles);
    if (result) {
      return user.user_roles;
    }
    return Object.values(user.user_roles);
  };

  return (
    <Box borderRadius="md">
      <VStack
        h="20"
        shadow="1"
        bg="mark.900"
        borderColor="mark.900"
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
      ></VStack>
      <VStack
        h="20"
        shadow="1"
        bg="#fff"
        borderBottomLeftRadius="md"
        borderBottomRightRadius="md"
        px="5"
      >
        <HStack>
          <VStack mr="3">
            <Avatar
              source={{
                uri: user.avatar_url,
              }}
              size="lg"
              mt={-7}
            >
              {user.display_name[0]}
            </Avatar>
          </VStack>
          <VStack flex={1}>
            <Text fontSize="sm" bold color="mark.800">
              {getFullName()}
            </Text>
            <HStack>
              <Text fontSize="sm" color="mark.800" mr="4">
                administrator
              </Text>

              <IconButton
                onPress={() => setShowModal(true)}
                size="xs"
                colorScheme="red"
                variant="ghost"
                _icon={{
                  as: Ionicons,
                  name: 'arrow-forward-outline',
                  color: 'mark.900',
                }}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
      <Modal
        animationPreset="slide"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Content>
          <Modal.Header color="mark.800">Todas as permissões</Modal.Header>
          <Modal.Body>
            <HStack flex={1} flexWrap="wrap">
              {allUserRoles().map((role, index) => (
                <Button
                  size="sm"
                  _text={{
                    color: 'mark.800',
                  }}
                  key={index}
                  variant="unstyled"
                >
                  {role}
                </Button>
              ))}
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
