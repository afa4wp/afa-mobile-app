import {
  Box,
  ScrollView,
  VStack,
  Heading,
  Text,
  Flex,
  Center,
} from 'native-base';
import Constants from 'expo-constants';
import LanguageContext from '../../../context/LanguageContext';
import { useContext } from 'react';

export function AboutScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const appVersion = Constants.manifest?.version ?? 'Unknown';
  return (
    <Box safeArea flex={1} bg="mark.700" px="5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack>
          <Heading color="mark.900">{i18n.t('screen.about.title')}</Heading>
        </VStack>
        <VStack mt="4">
          <Text fontSize="md" color="mark.800">
            {i18n.t('screen.about.introduction')}
          </Text>
          <Text fontSize="md" color="mark.800" mt="4">
            {i18n.t('screen.about.development')}
          </Text>
          <Text fontSize="md" color="mark.800" mt="4">
            {i18n.t('screen.about.conclusion')}
          </Text>
        </VStack>
        <Flex flex={1} direction="column-reverse" mt="4">
          <Center pb="4">
            <Text color="mark.800" fontSize="sm">
              {i18n.t('screen.about.appVersion')}: {appVersion}
            </Text>
          </Center>
        </Flex>
      </ScrollView>
    </Box>
  );
}
