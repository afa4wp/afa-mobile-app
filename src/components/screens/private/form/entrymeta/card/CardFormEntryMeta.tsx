import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { EntryMetaTypeText } from './EntryMetaTypeText';
import { EntryMetaTypeFile } from './EntryMetaTypeFile';
import { EntryMetaTypeSelect } from './EntryMetaTypeSelect';
import { EntryMetaTypeEmail } from './EntryMetaTypeEmail';
import { EntryMetaTypePhoneNumber } from './EntryMetaTypePhoneNumber';

import { EntryMeta } from './EntryMeta';
export function SwitchCardFormEntryMeta({
  entryMeta,
}: {
  entryMeta: EntryMetaType;
}) {
  switch (entryMeta.type) {
    case 'text':
      return <EntryMetaTypeText entryMeta={entryMeta} />;
    case 'email':
      return <EntryMetaTypeEmail entryMeta={entryMeta} />;
    case 'file':
      return <EntryMetaTypeFile entryMeta={entryMeta} />;
    case 'select':
      return <EntryMetaTypeSelect entryMeta={entryMeta} />;
    case 'phone_number':
      return <EntryMetaTypePhoneNumber entryMeta={entryMeta} />;
    default:
      return <EntryMetaTypeText entryMeta={entryMeta} />;
  }
}

export function CardFormEntryMeta({
  entryMeta,
  onPressProp,
}: {
  entryMeta: EntryMetaType;
  onPressProp?: boolean;
}) {
  const cardFormEntryMeta = SwitchCardFormEntryMeta({ entryMeta });
  return (
    <EntryMeta entryMeta={entryMeta} onPressProp={onPressProp}>
      {cardFormEntryMeta}
    </EntryMeta>
  );
}
