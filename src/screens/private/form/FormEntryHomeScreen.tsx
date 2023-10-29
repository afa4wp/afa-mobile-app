import { Box, useToast, Text, Heading, FlatList, Spinner } from 'native-base';
import FormContext from '../../../context/FormContext';
import { useEffect, useState, useContext } from 'react';
import { CardFormEntry } from '../../../components/screens/private/form/CardFormEntry';
import { CardFormEntryHomeHeader } from '../../../components/screens/private/form/CardFormEntryHomeHeader';
import { EntryType } from '../../../@types/EntryType';
import * as entryService from '../../../services/formEntry';
import LanguageContext from '../../../context/LanguageContext';
import { SkeletonFormEntryHome } from '../../../components/skeleton/form/SkeletonFormEntryHome';
import { SeparatorItem } from '../../../components/screens/private/form/SeparatorItem';
import AuthContext from '../../../context/AuthContext';
import ErrorMessageToast from '../../../components/general/ErrorMessageToast';

export function FormEntryHomeScreen() {
  const { state, setForm } = useContext(FormContext) || {};
  const { i18n } = useContext(LanguageContext)!;
  const { state: authState } = useContext(AuthContext);
  const  formId  = 3;

  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState([] as EntryType[]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const toast = useToast();

  async function getEntries(hasMoreData: boolean) {
    if (!hasMoreData) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await entryService.entries_home(
        authState.formType as string,
      );
      if (data.results && data.results.length > 0) {
        const currentEntries = data.results;
        setEntries([...entries, ...currentEntries]);
        if (data.info.pages === page) {
          setHasMoreData(false);
        } else {
          setPage(page + 1);
        }
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <ErrorMessageToast message={i18n.t('general.errorOccurred')} />
          );
        },
      });
    } finally {
      setIsLoading(false);
      setShowSkeleton(false);
    }
  }

  const handleLoadMore = () => {
    if (!isLoading) {
      getEntries(hasMoreData);
    }
  };

  const resetInitialState = () => {
    setHasMoreData(true);
    setShowSkeleton(true);
    setEntries([]);
    setPage(1);
  };

  useEffect(() => {
    resetInitialState();
    getEntries(true);
  }, [formId]);

  function RenderItem({ item }: { item: EntryType }) {
    return <CardFormEntry entry={item} />;
  }

  return (
    <Box flex={1} bg="mark.700" px="5">
      <Box flex={1}>
        {!showSkeleton ? (
          entries.length > 0 ? (
            <FlatList
              ItemSeparatorComponent={SeparatorItem}
              ListHeaderComponent={CardFormEntryHomeHeader}
              removeClippedSubviews={true}
              data={entries}
              renderItem={({ item }) => <RenderItem item={item} />}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                isLoading ? <Spinner size="lg" color="mark.900" /> : null
              }
            />
          ) : (
            <Box>
              <Heading color="mark.800">
                {i18n.t('screen.form.noSubmissions')}
              </Heading>
            </Box>
          )
        ) : (
          <SkeletonFormEntryHome />
        )}
      </Box>
    </Box>
  );
}
