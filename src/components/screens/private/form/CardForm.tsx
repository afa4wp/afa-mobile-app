import { Heading, Text, VStack, HStack, Icon, Pressable } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { FormType } from '../../../../@types/FormType';
import { ShareButton } from './ShareButton';
import { useEffect, useContext } from 'react';
import LanguageContext from '../../../../context/LanguageContext';
import FormContext from '../../../../context/FormContext';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function CardForm({ form }: { form: FormType }) {
  const { i18n, locale } = useContext(LanguageContext)!;
  const { setForm } = useContext(FormContext) || {};
  const navigation = useNavigation();
  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  const getDate = (date: string) => {
    const now = dayjs();
    const postDate = dayjs(date);
    const relativeTime = postDate.fromNow();
    return relativeTime;
  };

  const goToFormEntryScreen = () => {
    setForm(form);
    navigation.navigate('Entry', {
      formId: form.id,
    });
  };

  return (
    <Pressable
      p="2"
      mb="5"
      rounded="lg"
      shadow="1"
      borderRadius="md"
      borderColor="#E1E1E2"
      borderWidth="1"
      _light={{
        backgroundColor: '#fff',
      }}
      _pressed={{
        backgroundColor: '#E1E1E2',
      }}
      onPress={() => goToFormEntryScreen()}
    >
      <VStack mb="4">
        <Heading color="mark.800" size="md">
          {form.title}
        </Heading>
      </VStack>
      <VStack mb="2">
        <HStack justifyContent="space-between" alignItems="center">
          <HStack>
            <Text fontSize="sm" color="mark.800">
              {getDate(form.date_created)}
            </Text>
          </HStack>
          <HStack>
            <HStack alignItems="center">
              <Icon
                as={FontAwesome}
                name="folder"
                size="sm"
                mr="1"
                color="mark.800"
              />
            </HStack>
            <HStack>
              <Text color="mark.800">{form.registers}</Text>
            </HStack>
          </HStack>
        </HStack>
      </VStack>
      <VStack>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack>
            {form.user_created?.user_name && (
              <Text fontSize="sm" color="mark.800">
                {i18n.t('screen.form.createdBy')} {form.user_created.user_name}
              </Text>
            )}
          </HStack>
          <HStack alignItems="center">
            <ShareButton perma_links={form.perma_links} />
          </HStack>
        </HStack>
      </VStack>
    </Pressable>
  );
}
