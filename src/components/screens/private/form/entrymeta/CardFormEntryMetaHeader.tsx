import { Heading, VStack } from 'native-base';
import { useContext } from 'react';
import LanguageContext from '../../../../../context/LanguageContext';
import FormContext from '../../../../../context/FormContext';

import { CardFormEntry } from '../CardFormEntry';

export function CardFormEntryMetaHeader({ hideHeading = false }) {
  const { state } = useContext(FormContext) || {};
  const { i18n } = useContext(LanguageContext)!;
  return (
    <VStack mt="1" key="headerCardFormEntry">
      <CardFormEntry entry={state.entry} />
    </VStack>
  );
}
