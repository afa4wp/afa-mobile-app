import { Box, Center, Heading } from 'native-base';
import { useState, useContext } from 'react';
import LanguageContext from '../../context/LanguageContext';
export function SearchNotFound({ searchContent }: { searchContent: string }) {
  const { i18n } = useContext(LanguageContext)!;
  return (
    <Box flex={1} justifyContent="center">
      <Center>
        <Heading color="mark.800" size="md">
          {i18n.t('screen.search.noResultsFor')} "{searchContent}"
        </Heading>
      </Center>
    </Box>
  );
}
