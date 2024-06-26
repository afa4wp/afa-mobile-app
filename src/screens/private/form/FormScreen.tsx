import { Box, FlatList, Spinner, Heading, useToast, Text } from 'native-base';
import { CardForm } from '../../../components/screens/private/form/CardForm';
import { FormType } from '../../../@types/FormType';
import { useEffect, useState, useContext } from 'react';
import { CardFormHeader } from '../../../components/screens/private/form/CardFormHeader';
import * as formService from '../../../services/form';
import { SkeletonForm } from '../../../components/skeleton/form/SkeletonForm';
import LanguageContext from '../../../context/LanguageContext';
import AuthContext from '../../../context/AuthContext';
import ErrorMessageToast from '../../../components/general/ErrorMessageToast';

export function FormScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const [hasMoreData, setHasMoreData] = useState(true);
  const { state: authState } = useContext(AuthContext);
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
      const data = await formService.forms(authState.formType as string, page);
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
      <Box flex={1}>
        {!showSkeleton ? (
          forms.length > 0 ? (
            <FlatList
              ListHeaderComponent={CardFormHeader}
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
