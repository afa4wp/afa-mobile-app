import { Box, ScrollView, VStack, useToast, Heading, Text } from 'native-base';
import * as userService from '../../../services/user';
import { useEffect, useState, useContext } from 'react';
import { FormItems } from '../../../components/screens/private/homescreen/FormItems';
import AuthContext from '../../../context/AuthContext';
import ErrorMessageToast from '../../../components/general/ErrorMessageToast';
import { CardProfile } from '../../../components/screens/private/profile/CardProfile';
import { CardFormEntry } from '../../../components/screens/private/form/CardFormEntry';
import { SeparatorItem } from '../../../components/screens/private/form/SeparatorItem';
import { SkeletonHome } from '../../../components/skeleton/form/SkeletonHome';
import { EntryType } from '../../../@types/EntryType';
import LanguageContext from '../../../context/LanguageContext';

export function HomeScreen() {
  const [home, setHome] = useState({} as any);
  const { updateFormType, state } = useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(true);
  const { i18n } = useContext(LanguageContext)!;
  const toast = useToast();

  async function getHome() {
    setShowSpinner(true);
    try {
      const data = await userService.home(state.formType as string);
      setHome(data);
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <ErrorMessageToast message={i18n.t('general.errorOccurred')} />
          );
        },
      });
    } finally {
      setShowSpinner(false);
    }
  }

  useEffect(() => {
    getHome();
  }, []);

  if (!state.formType) {
    return <FormItems />;
  } else {
    if (showSpinner) {
      return (
        <Box safeArea flex={1} bg="mark.700" px="5">
          <SkeletonHome />
        </Box>
      );
    } else {
      return (
        <ScrollView showsVerticalScrollIndicator={false} flex={1} bg="mark.700">
          <Box safeArea flex={1} bg="mark.700" px="5">
            {home.user_data ? (
              <VStack py="5">
                <CardProfile user={home.user_data} />
              </VStack>
            ) : (
              <VStack py="5">
                <Box
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg="mark.700"
                  flexDirection="column"
                >
                  <Text color="mark.800" fontSize="md">
                    {i18n.t('screen.profile.failedLoadInformation')}
                  </Text>
                </Box>
              </VStack>
            )}
            {home.last_entries && home.last_entries.length > 0 && (
              <VStack>
                <Heading color="mark.800" fontSize="xl">
                  {i18n.t('screen.form.submissions')}, {home.plugin_name}
                </Heading>
              </VStack>
            )}
            <Box>
              {home.last_entries &&
                home.last_entries.length > 0 &&
                home.last_entries.map((item: EntryType, index: number) => (
                  <Box key={index}>
                    <CardFormEntry entry={item} />
                    <SeparatorItem />
                  </Box>
                ))}
            </Box>
          </Box>
        </ScrollView>
      );
    }
  }
}
