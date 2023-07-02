import { FlatList } from 'native-base';

import { CardForm } from '../form/CardForm';
import { FormType } from '../../../../@types/FormType';
import { EntryType } from '../../../../@types/EntryType';
import { CardFormEntry } from '../form/CardFormEntry';
import { SeparatorItem } from '../form/SeparatorItem';
type ListProps = {
  forms: FormType[];
  entries: EntryType[];
};

function RenderCardForm({ item }: { item: FormType }) {
  return <CardForm form={item} />;
}
function RenderCardFormEntry({ item }: { item: EntryType }) {
  return <CardFormEntry entry={item} />;
}

export function ListResult({ forms, entries }: ListProps) {
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
      <FlatList
        ItemSeparatorComponent={SeparatorItem}
        removeClippedSubviews={true}
        data={entries}
        renderItem={({ item }) => <RenderCardFormEntry item={item} />}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
      />
    </>
  );
}
