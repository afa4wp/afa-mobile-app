import { Checkbox } from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { useEffect, useState } from 'react';

export function EntryMetaTypeSelect({
  entryMeta,
}: {
  entryMeta: EntryMetaType;
}) {
  const [metaValueArray, setMetaValueArray] = useState<string[]>([]);
  const [checkvalue, setCheckvalue] = useState(true);
  useEffect(() => {
    if (Array.isArray(entryMeta.meta_value)) {
      setMetaValueArray(entryMeta.meta_value as string[]);
    }
  }, [entryMeta.meta_value]);

  return (
    <>
      {metaValueArray.map((item, index) => (
        <Checkbox
          isDisabled
          key={index}
          value="one"
          my={2}
          defaultIsChecked={checkvalue}
          colorScheme="schemahelper"
        >
          {item}
        </Checkbox>
      ))}
    </>
  );
}
