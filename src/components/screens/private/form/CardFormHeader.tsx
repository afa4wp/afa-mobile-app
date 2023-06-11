import { Heading, VStack } from 'native-base';
import { useContext } from 'react';
import LanguageContext from '../../../../context/LanguageContext';

export function CardFormHeader() {
  const { i18n } = useContext(LanguageContext)!;
  return (
    <VStack mt="5" mb="5" key="headerCardForm">
      <Heading color="mark.800">{i18n.t('screen.form.title')}</Heading>
    </VStack>
  );
}
