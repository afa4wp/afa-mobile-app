import {
  Box,
  ScrollView,
  VStack,
  useToast,
  Heading,
  Text,
  Spinner,
} from 'native-base';
import { CardFormEntryMetaHeader } from '../../../components/screens/private/form/entrymeta/CardFormEntryMetaHeader';
import { CardFormEntryMeta } from '../../../components/screens/private/form/entrymeta/card/CardFormEntryMeta';
import { EntryMetaType } from '../../../@types/EntryMetaType';
import { useEffect, useState, useContext } from 'react';
import * as entryMetaService from '../../../services/formEntryMeta';
import LanguageContext from '../../../context/LanguageContext';
import AuthContext from '../../../context/AuthContext';
import ErrorMessageToast from '../../../components/general/ErrorMessageToast';

export function FormEntryMetaScreen({ route }) {
  const { entryId } = route.params;
  const [entryMetas, setEntryMetas] = useState([] as EntryMetaType[]);
  const { i18n } = useContext(LanguageContext)!;
  const { state: authState } = useContext(AuthContext);
  const [showLoading, setShowLoading] = useState(false);
  const toast = useToast();

  async function getEntryMeta() {
    try {
      setShowLoading(true);
      setEntryMetas([]);
      const data = await entryMetaService.entryMeta(
        authState.formType as string,
        entryId
      );
      setEntryMetas([...data]);
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <ErrorMessageToast message={i18n.t('general.errorOccurred')} />
          );
        },
      });
    } finally {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    getEntryMeta();
  }, [entryId]);

  return (
    <ScrollView flex={1} bg="mark.700">
      <Box flex={1}>
        <Box px="5" flex={1}>
          <VStack>
            <CardFormEntryMetaHeader entry_id={entryId} />
            <Heading color="mark.800" mt="2" mb="5">
              {i18n.t('screen.form.allAnswers')}
            </Heading>
            {!showLoading ? (
              <VStack>
                {entryMetas.map((item, index) => {
                  return <CardFormEntryMeta key={index} entryMeta={item} />;
                })}
              </VStack>
            ) : (
              <Box flex={1} mt="5">
                <Spinner
                  accessibilityLabel="Loading"
                  size="lg"
                  color="mark.900"
                />
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
}
