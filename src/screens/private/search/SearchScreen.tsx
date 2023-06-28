import {
  Heading,
  Box,
  HStack,
  VStack,
  Input,
  Icon,
  Button,
  Center,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Platform } from 'react-native';
import LanguageContext from '../../../context/LanguageContext';
import { SEARCH } from '../../../constants/form';
import SearchButton from '../../../components/screens/private/search/SearchButton';
import { FormType } from '../../../@types/FormType';
import { EntryType } from '../../../@types/EntryType';
import { EntryMetaType } from '../../../@types/EntryMetaType';
import * as formService from '../../../services/form';

export function SearchScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const [search, setSearch] = useState(SEARCH.FORM);
  const [showLoading, setShowLoading] = useState(false);

  const [forms, setForms] = useState<FormType[]>([]);
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [entrieMetas, setEntrieMetas] = useState<EntryMetaType[]>([]);

  async function getForms(myText: string) {
    setShowLoading(true);
    try {
      const data = await formService.forms('cf7', 1);
      if (data.results && data.results.length > 0) {
      } else {
        setForms([]);
      }
      setShowLoading(false);
    } catch (error) {}
  }
  return (
    <Box safeArea flex={1} bg="mark.700" px="5">
      <Box flex={1}>
        <Box>
          <VStack>
            <Input
              placeholder={i18n.t('screen.search.search')}
              fontSize="sm"
              style={inputStyle}
              InputLeftElement={
                <Icon
                  ml="2"
                  size="lg"
                  color="mark.900"
                  as={<Ionicons name="ios-search" />}
                />
              }
            />
            <HStack mt="2" space="2">
              <SearchButton
                searchType={SEARCH.FORM}
                setSearch={setSearch}
                buttonText={i18n.t('screen.search.forms')}
                search={search}
              />
              <SearchButton
                searchType={SEARCH.ANSWER}
                setSearch={setSearch}
                buttonText={i18n.t('screen.search.answers')}
                search={search}
              />
              <SearchButton
                searchType={SEARCH.USER}
                setSearch={setSearch}
                buttonText={i18n.t('screen.search.users')}
                search={search}
              />
            </HStack>
          </VStack>
        </Box>
        <Box>
          <Heading color="mark.800" size="md" mt="4">
            {i18n.t('screen.search.content')}
          </Heading>
        </Box>
      </Box>
    </Box>
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
};
