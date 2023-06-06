import { Box, FlatList, Spinner, Heading, useToast, Text } from 'native-base';
import { CardForm } from '../../../components/screens/private/form/CardForm';
import { FormType } from '../../../@types/FormType';
import { useEffect, useState, useContext } from 'react';
import * as formService from '../../../services/form';
import { SkeletonForm } from '../../../components/skeleton/form/SkeletonForm';
import LanguageContext from '../../../context/LanguageContext';

export function FormScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [forms, setForms] = useState([] as FormType[]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const toast = useToast();

  async function getForms() {
    if (!hasMoreData) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await formService.forms('cf7', page);
      if (data.results && data.results.length > 0) {
        const currentForm = data.results;
        setForms([...forms, ...currentForm]);
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
      // Add this check
      getForms();
    }
  };

  useEffect(() => {
    getForms();
  }, []);

  function RenderItem({ item }: { item: FormType }) {
    return <CardForm form={item} />;
  }

  return (
    <Box flex={1} bg="mark.700" px="5">
      <Box flex={1} pb="5">
        {!showSkeleton ? (
          forms.length > 0 ? (
            <FlatList
              removeClippedSubviews={true}
              data={forms}
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
            <Box mt="5">
              <Heading color="mark.800">
                {i18n.t('screen.form.noFormsMessage')}
              </Heading>
            </Box>
          )
        ) : (
          <SkeletonForm />
        )}
      </Box>
    </Box>
  );
}
