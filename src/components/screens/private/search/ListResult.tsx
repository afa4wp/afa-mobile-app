import { FlatList, VStack } from 'native-base';

import { CardForm } from '../form/CardForm';
import { FormType } from '../../../../@types/FormType';
import { EntryType } from '../../../../@types/EntryType';
import { EntryMetaType } from '../../../../@types/EntryMetaType';
import { CardFormEntry } from '../form/CardFormEntry';
import { SeparatorItem } from '../form/SeparatorItem';
import { CardFormEntryMeta } from '../form/entrymeta/card/CardFormEntryMeta';
type ListProps = {
  forms: FormType[];
  entries: EntryType[];
  entryMetas: EntryMetaType[];
};

function RenderCardForm({ item }: { item: FormType }) {
  return <CardForm form={item} />;
}
function RenderCardFormEntry({ item }: { item: EntryType }) {
  return <CardFormEntry entry={item} />;
}
function RenderCardFormEntryMeta({ item }: { item: EntryMetaType }) {
  return <CardFormEntryMeta entryMeta={item} />;
}
export function ListResult({ forms, entries, entryMetas }: ListProps) {
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
      <VStack>
        {entryMetas.map((item, index) => {
          return <RenderCardFormEntryMeta key={index} item={item} />;
        })}
      </VStack>
    </>
  );
}
