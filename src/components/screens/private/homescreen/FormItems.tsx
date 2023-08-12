import {
  Box,
  ScrollView,
  HStack,
  VStack,
  Avatar,
  Text,
  Modal,
} from 'native-base';
import { useEffect, useState, useContext } from 'react';
import { FormItem } from './FormItem';
import * as configService from '../../../../services/config';
import AuthContext from '../../../../context/AuthContext';

interface FormData {
  [key: string]: string;
}

export function FormItems() {
  const [showModal, setShowModal] = useState(true);
  const [data, setData] = useState<FormData>({});
  const { updateFormType, state } = useContext(AuthContext);

  async function formsPlugins() {
    console.log('estado:', state.formType);
    try {
      const data = await configService.formsPlugins();
      setData(data);
    } catch (error) {
      console.log('erro', error);
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
            Plugins no sistema
          </Modal.Header>
          <Modal.Body padding={0}>
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
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
