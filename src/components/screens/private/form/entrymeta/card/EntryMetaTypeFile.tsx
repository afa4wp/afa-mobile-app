import { Box, Link } from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { useEffect, useState } from 'react';
import { MetaValueTypeFile } from '../../../../../../@types/EntryMetaType';

export function EntryMetaTypeFile({ entryMeta }: { entryMeta: EntryMetaType }) {
  const [metaValueArray, setMetaValueArray] = useState<MetaValueTypeFile[]>([]);
  useEffect(() => {
    if (Array.isArray(entryMeta.meta_value)) {
      setMetaValueArray(entryMeta.meta_value as MetaValueTypeFile[]);
    }
  }, [entryMeta.meta_value]);

  return (
    <>
      {metaValueArray.map((item, index) => (
        <Link
          key={index}
          href={item.file_url}
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
            {item.file_name}
          </Box>
        </Link>
      ))}
    </>
  );
}
