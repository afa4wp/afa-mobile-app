import { Heading, Box } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import LanguageContext from '../../../context/LanguageContext';
import { SEARCH } from '../../../constants/form';
import { FormType } from '../../../@types/FormType';
import { EntryType } from '../../../@types/EntryType';
import { EntryMetaType } from '../../../@types/EntryMetaType';
import * as formService from '../../../services/form';
import { CardForm } from '../../../components/screens/private/form/CardForm';
import { CenterSpinner } from '../../../components/skeleton/CenterSpinner';
import { SearchNotFound } from '../../../components/skeleton/SearchNotFound';
import { SearchInput } from '../../../components/screens/private/search/SearchInput';
import { ListResult } from '../../../components/screens/private/search/ListResult';
export function SearchScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const [search, setSearch] = useState(SEARCH.FORM);
  const [showLoading, setShowLoading] = useState(false);

  const [forms, setForms] = useState<FormType[]>([]);
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [entrieMetas, setEntrieMetas] = useState<EntryMetaType[]>([]);
  const [searchContent, setSearchContent] = useState('');

  async function getForms(searchContent: string) {
    setShowLoading(true);
    try {
      const data = await formService.formsSearch('cf7', searchContent);
      if (data.results && data.results.length > 0) {
        setForms([...data.results]);
      } else {
        setForms([]);
      }
    } catch (error) {
    } finally {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    if (searchContent.length == 0) {
      setForms([]);
      setEntries([]);
      setEntrieMetas([]);
    }

    const timer = setTimeout(() => {
      masterSearch(searchContent);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchContent]);

  const masterSearch = (searchContent: string) => {
    if (!searchContent) {
      return;
    }
    if (search === SEARCH.FORM) {
      getForms(searchContent);
    }
  };

  function RenderCardForm({ item }: { item: FormType }) {
    return <CardForm form={item} />;
  }

  function notFound() {
    if (
      forms.length == 0 &&
      entries.length == 0 &&
      entrieMetas.length == 0 &&
      searchContent.length > 0 &&
      !showLoading
    ) {
      return true;
    }

    return false;
  }

  return (
    <Box safeArea flex={1} bg="mark.700" px="5">
      <Box flex={1}>
        <SearchInput
          setSearchContent={setSearchContent}
          setSearch={setSearch}
          search={search}
        />
        {!(searchContent.length > 0) ? (
          <Box>
            <Heading color="mark.800" size="md" mt="4">
              {i18n.t('screen.search.content')}
            </Heading>
          </Box>
        ) : (
          <Box flex={1}>
            {!showLoading ? (
              <Box mt="5" flex={1}>
                <ListResult forms={forms} />
                {notFound() && <SearchNotFound searchContent={searchContent} />}
              </Box>
            ) : (
              <CenterSpinner />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
