import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { EntryMetaTypeText } from './EntryMetaTypeText';
import { EntryMetaTypeFile } from './EntryMetaTypeFile';
import { EntryMetaTypeSelect } from './EntryMetaTypeSelect';
import { EntryMetaTypeEmail } from './EntryMetaTypeEmail';
export function CardFormEntryMeta({ entryMeta }: { entryMeta: EntryMetaType }) {
  switch (entryMeta.type) {
    case 'text':
      return <EntryMetaTypeText entryMeta={entryMeta} />;
    case 'email':
      return <EntryMetaTypeEmail entryMeta={entryMeta} />;
    case 'file':
      return <EntryMetaTypeFile entryMeta={entryMeta} />;
    case 'select':
      return <EntryMetaTypeSelect entryMeta={entryMeta} />;
    default:
      return <EntryMetaTypeText entryMeta={entryMeta} />;
  }
}
