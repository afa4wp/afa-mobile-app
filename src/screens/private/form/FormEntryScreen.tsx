import { Box, useToast, Text, Heading, FlatList, Spinner } from 'native-base';
import FormContext from '../../../context/FormContext';
import { useEffect, useState, useContext } from 'react';
import { CardFormEntryHeader } from '../../../components/screens/private/form/CardFormEntryHeader';
import { CardFormEntry } from '../../../components/screens/private/form/CardFormEntry';
import { EntryType } from '../../../@types/EntryType';
import * as entryService from '../../../services/formEntry';
import LanguageContext from '../../../context/LanguageContext';
import { SkeletonFormEntry } from '../../../components/skeleton/form/SkeletonFormEntry';
import { SeparatorItem } from '../../../components/screens/private/form/SeparatorItem';
import AuthContext from '../../../context/AuthContext';
export function FormEntryScreen({ route }) {
  const { state, setForm } = useContext(FormContext) || {};
  const { i18n } = useContext(LanguageContext)!;
  const { state: authState } = useContext(AuthContext);
  const { formId } = route.params;

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
      const data = await entryService.entries(
        authState.formType as string,
        formId,
        page
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
            <Box bg="mark.900" px="2" py="1" rounded="sm" mb={5}>
              <Text color="mark.700" fontSize="md">
                {i18n.t('screen.siginCredentials.credentials.errorOccurred')}
              </Text>
            </Box>
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
              ListHeaderComponent={CardFormEntryHeader}
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
              <CardFormEntryHeader hideHeading={true} />
              <Heading color="mark.800">
                {i18n.t('screen.form.noSubmissions')}
              </Heading>
            </Box>
          )
        ) : (
          <SkeletonFormEntry />
        )}
      </Box>
    </Box>
  );
}
