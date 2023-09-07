import {
  Heading,
  VStack,
  Box,
  HStack,
  Pressable,
  Avatar,
  Text,
} from 'native-base';
import { useContext, useEffect, useState } from 'react';
import LanguageContext from '../../../../context/LanguageContext';
import FormContext from '../../../../context/FormContext';
import { EntryType } from '../../../../@types/EntryType';
import { calculateDiffDayJS } from '../../../../helpers/calculateDiffDayJS';
import { useNavigation } from '@react-navigation/native';

export function CardFormEntry({ entry }: { entry: EntryType }) {
  const { state, setEntry } = useContext(FormContext) || {};
  const { i18n } = useContext(LanguageContext)!;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [showAvatar, setShowAvatar] = useState(false);

  const getDate = (date: string) => {
    const result = calculateDiffDayJS(date);
    return result.value + ' ' + i18n.t(result.unit);
  };

  const goToFormEntryScreen = () => {
    setEntry(entry);
    navigation.navigate('FormStack', {
      screen: 'EntryMeta',
      initial: false,
      params: {
        entryId: entry.id,
      },
    });
  };
  useEffect(() => {
    if (
      entry.author_info &&
      entry.author_info.user_name &&
      entry.author_info.user_email
    ) {
      setTitle(entry.author_info.user_name);
      setSubtitle(entry.author_info.user_email);
      setShowAvatar(true);
    } else if (entry.custom_title && entry.custom_subtitle) {
      setTitle(entry.custom_title);
      setSubtitle(entry.custom_subtitle);
    }
  }, [entry]);

  return (
    <Pressable
      _pressed={{
        backgroundColor: '#E1E1E2',
      }}
      onPress={() => goToFormEntryScreen()}
    >
      <HStack py="4">
        <Box mr={2}>
          {showAvatar && entry.author_info ? (
            <Avatar
              mr="2"
              source={{
                uri: entry.author_info.avatar_url,
              }}
            >
              {entry.author_info.user_name.charAt(0).toUpperCase()}
              {entry.author_info.user_name.charAt(1).toUpperCase()}
            </Avatar>
          ) : (
            <Avatar bg="mark.900">
              {i18n.t('screen.entry.anonymous').charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Box>
        <Box flex={1}>
          <VStack>
            <Text bold mb="1" color="mark.800">
              {title || i18n.t('screen.entry.anonymous')}
            </Text>
            <Text color="mark.800">
              {subtitle || i18n.t('screen.entry.emailNotFound')}
            </Text>
            <HStack mt="2">
              <Text color="mark.800">{entry.form_info.title}</Text>
            </HStack>
          </VStack>
        </Box>
        <Box ml="5">
          <Text fontSize="xs" color="mark.800">
            {getDate(entry.date_created)}
          </Text>
        </Box>
      </HStack>
    </Pressable>
  );
}
