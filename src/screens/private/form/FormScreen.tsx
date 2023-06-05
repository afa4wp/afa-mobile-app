import { Box, FlatList, Spinner } from 'native-base';
import { CardForm } from '../../../components/screens/private/form/CardForm';
import { FormType } from '../../../@types/FormType';
import { useEffect, useState } from 'react';
import * as formService from '../../../services/form';

export function FormScreen() {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [forms, setForms] = useState([] as FormType[]);

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
      console.log(error);
    } finally {
      setIsLoading(false);
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
    <Box safeArea flex={1} bg="mark.700" px="5">
      <FlatList
        removeClippedSubviews={true}
        data={forms}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading ? <Spinner size="lg" color="mark.900" /> : null
        }
      />
    </Box>
  );
}
