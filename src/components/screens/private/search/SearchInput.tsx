import { Box, Input, HStack, VStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import SearchButton from './SearchButton';
import { useState, useContext } from 'react';
import LanguageContext from '../../../../context/LanguageContext';
import { Platform } from 'react-native';
import { SEARCH } from '../../../../constants/form';

type SearchInputProps = {
  setSearchContent: (value: string) => void;
  setSearch: (value: string) => void;
  search: string;
};

export function SearchInput({
  setSearchContent,
  setSearch,
  search,
}: SearchInputProps) {
  const { i18n } = useContext(LanguageContext)!;

  return (
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
          onChangeText={(value) => {
            setSearchContent(value);
          }}
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
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
};
