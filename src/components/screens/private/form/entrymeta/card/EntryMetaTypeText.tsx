import { Text } from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { useEffect, useState } from 'react';
export function EntryMetaTypeText({ entryMeta }: { entryMeta: EntryMetaType }) {
  const [metaValueString, setMetaValueString] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof entryMeta.meta_value === 'string' ||
      typeof entryMeta.meta_value === 'number'
    ) {
      if (
        typeof entryMeta.meta_value === 'object' &&
        entryMeta.meta_value !== null
      ) {
        const metaValueAsString = JSON.stringify(entryMeta.meta_value);
        setMetaValueString(metaValueAsString);
      } else {
        setMetaValueString(entryMeta.meta_value);
      }
    }
  }, [entryMeta.meta_value]);

  return (
    <Text fontSize="md" color="mark.800">
      {metaValueString}
    </Text>
  );
}
