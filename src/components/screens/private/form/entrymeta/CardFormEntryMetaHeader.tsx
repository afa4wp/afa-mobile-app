import { VStack } from 'native-base';
import { useContext, useEffect, useState } from 'react';
import FormContext from '../../../../../context/FormContext';
import * as entryService from '../../../../../services/formEntry';
import { CardFormEntry } from '../CardFormEntry';
import { SkeletonItem } from '../../../../skeleton/form/SkeletonFormEntry';
import AuthContext from '../../../../../context/AuthContext';
export function CardFormEntryMetaHeader({ entry_id }: { entry_id: number }) {
  const { state, setEntry } = useContext(FormContext) || {};
  const { state: authState } = useContext(AuthContext);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    getEntry();
  }, [entry_id]);

  async function getEntry() {
    setShowLoading(true);
    try {
      const data = await entryService.entry_by_id(
        authState.formType as string,
        entry_id
      );
      if (data) {
        setEntry(data);
      }
    } catch (error) {
    } finally {
      setShowLoading(false);
    }
  }

  if (showLoading || Object.keys(state.entry).length === 0) {
    return (
      <VStack mt="1" key="headerCardFormEntry">
        {showLoading ? <SkeletonItem showDivider={false} /> : <></>}
      </VStack>
    );
  }

  return (
    <VStack mt="1" key="headerCardFormEntry">
      <CardFormEntry entry={state.entry} />
    </VStack>
  );
}
