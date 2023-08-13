import { Box, Spinner, useToast, Text, Modal, Heading } from 'native-base';
import { useEffect, useState, useContext } from 'react';
import { FormItem } from './FormItem';
import * as configService from '../../../../services/config';
import AuthContext from '../../../../context/AuthContext';
import LanguageContext from '../../../../context/LanguageContext';
import { getSingleKey } from '../../../../helpers/manipulateObject';
import ErrorMessageToast from '../../../general/ErrorMessageToast';
interface FormData {
  [key: string]: string;
}

export function FormItems() {
  const [showModal, setShowModal] = useState(true);
  const { i18n } = useContext(LanguageContext)!;
  const [data, setData] = useState<FormData>({});
  const { updateFormType, state } = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const toast = useToast();

  async function formsPlugins() {
    try {
      setLoad(true);
      const data = await configService.formsPlugins();

      const key = getSingleKey(data);
      if (key) {
        updateFormType(key);
      } else {
        setData(data);
      }
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <ErrorMessageToast message={i18n.t('general.errorOccurred')} />
          );
        },
      });
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    formsPlugins();
  }, []);

  return (
    <Box safeAreaTop flex={1} bg="mark.700">
      <Modal
        isOpen={showModal}
        flex={1}
        animationPreset="slide"
        size="full"
        justifyContent="flex-end"
      >
        <Modal.Content height="100%" borderBottomRadius={0}>
          <Modal.Header color="mark.800" style={{ flexDirection: 'row' }}>
            {i18n.t('screen.home.availableFormBuilders')}
          </Modal.Header>
          <Modal.Body padding={0}>
            {!load ? (
              <Box>
                {Object.keys(data).map((key) => (
                  <FormItem
                    label={data[key]}
                    key={key}
                    onPress={async () => {
                      updateFormType(key);
                    }}
                  ></FormItem>
                ))}
                {Object.keys(data).length === 0 && (
                  <Box px="4" py="4">
                    <Text color="mark.800" fontSize="lg">
                      {i18n.t('screen.home.noFormbuilders')}
                    </Text>
                  </Box>
                )}
              </Box>
            ) : (
              <Box flex={1} mt="5">
                <Spinner
                  accessibilityLabel="Loading"
                  size="lg"
                  color="mark.800"
                />
              </Box>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
