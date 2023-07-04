import { Box, Link } from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { useEffect, useState } from 'react';

export function EntryMetaTypeEmail({
  entryMeta,
}: {
  entryMeta: EntryMetaType;
}) {
  const [metaValueString, setMetaValueString] = useState<string | null>(null);

  useEffect(() => {
    if (typeof entryMeta.meta_value === 'string') {
      setMetaValueString(entryMeta.meta_value);
    }
  }, [entryMeta.meta_value]);

  return (
    <Link
      href={`mailto:${metaValueString}`}
      isExternal
      _text={{
        color: 'mark.900',
      }}
      mb="1"
    >
      <Box
        py="0.5"
        _text={{
          color: 'mark.900',
          fontWeight: 'normal',
        }}
      >
        {metaValueString}
      </Box>
    </Link>
  );
}
