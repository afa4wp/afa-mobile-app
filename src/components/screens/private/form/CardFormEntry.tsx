import {
  Heading,
  VStack,
  Box,
  HStack,
  Pressable,
  Avatar,
  Text,
} from 'native-base';
import { useContext, useEffect } from 'react';
import LanguageContext from '../../../../context/LanguageContext';
import FormContext from '../../../../context/FormContext';
import { EntryType } from '../../../../@types/EntryType';
import { calculateDiffDayJS } from '../../../../helpers/calculateDiffDayJS';
import { useNavigation } from '@react-navigation/native';

export function CardFormEntry({ entry }: { entry: EntryType }) {
  const { state, setEntry } = useContext(FormContext) || {};
  const { i18n } = useContext(LanguageContext)!;
  const navigation = useNavigation();

  const getDate = (date: string) => {
    const result = calculateDiffDayJS(date);
    return result.value + ' ' + i18n.t(result.unit);
  };

  const goToFormEntryScreen = () => {
    setEntry(entry);
    navigation.navigate('EntryMeta', {
      entryId: entry.id,
    });
  };

  return (
    <Pressable
      _pressed={{
        backgroundColor: '#E1E1E2',
      }}
      onPress={() => goToFormEntryScreen()}
    >
      <HStack py="4">
        <Box mr={2}>
          <Avatar>SN</Avatar>
        </Box>
        <Box flex={1}>
          <VStack>
            <Text bold mb="1" color="mark.800">
              cliente
            </Text>
            <Text color="mark.800">preenchido sem fazer login</Text>
            <HStack mt="2">
              <Text color="mark.800">{entry.form_info.title}</Text>
            </HStack>
          </VStack>
        </Box>
        <Box ml="5">
          <Text bold color="mark.800">
            {getDate(entry.date_created)}
          </Text>
        </Box>
      </HStack>
    </Pressable>
  );
}
