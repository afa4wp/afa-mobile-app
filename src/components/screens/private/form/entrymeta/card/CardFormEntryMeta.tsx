import { Heading, VStack, Text } from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { EntryMetaTypeText } from './EntryMetaTypeText';
export function CardFormEntryMeta({ entryMeta }: { entryMeta: EntryMetaType }) {
  return <EntryMetaTypeText entryMeta={entryMeta} />;
}
