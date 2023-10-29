import { Heading, VStack } from 'native-base';
import { useContext } from 'react';
import LanguageContext from '../../../../context/LanguageContext';
import FormContext from '../../../../context/FormContext';

import { CardForm } from './CardForm';

export function CardFormEntryHomeHeader({ hideHeading = false }) {
  const { state } = useContext(FormContext) || {};
  const { i18n } = useContext(LanguageContext)!;
  return (
    <VStack mt="5" key="headerCardFormEntry">
      {!hideHeading && (
        <Heading color="mark.800">{i18n.t('screen.form.submissions')}</Heading>
      )}
    </VStack>
  );
}
