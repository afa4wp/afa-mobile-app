import { FlatList } from 'native-base';

import { CardForm } from '../form/CardForm';
import { FormType } from '../../../../@types/FormType';

type ListProps = {
  forms: FormType[];
};

function RenderCardForm({ item }: { item: FormType }) {
  return <CardForm form={item} />;
}

export function ListResult({ forms }: ListProps) {
  return (
    <>
      <FlatList
        removeClippedSubviews={true}
        data={forms}
        renderItem={({ item }) => <RenderCardForm item={item} />}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
      />
    </>
  );
}
