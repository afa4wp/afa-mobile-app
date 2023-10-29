import { Box, ScrollView, VStack, useToast, Heading, Text, Button } from 'native-base';
import * as userService from '../../../services/user';
import { useEffect, useState, useContext } from 'react';
import { FormItems } from '../../../components/screens/private/homescreen/FormItems';
import AuthContext from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
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

  const navigation = useNavigation();
  const goToEntryHome = () => {
    navigation.navigate('FormStack', {
      screen: 'EntryHome'
    });
  };

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
    if (state.formType) {
      getHome();
    }
  }, [state.formType]);

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
        <Box safeArea flex={1} bg="mark.700" px="5">
          <ScrollView showsVerticalScrollIndicator={false}  flex={1} >
            <Box  flex={1} >
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
              {home.last_entries && (
                <VStack>
                  <Heading color="mark.800" fontSize="lg">
                    {i18n.t('screen.home.recentSubmissions')}
                  </Heading>
                </VStack>
              )}
              <Box>
                {home.last_entries &&
                  home.last_entries.length > 0 &&
                  home.last_entries.map((item: EntryType, index: number) => (
                    <Box key={index}>
                      <CardFormEntry entry={item} />
                      {index !== home.last_entries.length - 1 && (
                        <SeparatorItem />
                      )}
                    </Box>
                  ))}
              </Box>
              {home.last_entries &&
                  home.last_entries.length >= 3 && ( <Box mb="5">
                <Button
                    variant="link"
                    colorScheme="mark"
                    onPress={() => goToEntryHome()}
                  >
                    {i18n.t('screen.home.seeMore')}
                </Button>
              </Box>
              )}
            </Box>
          </ScrollView>
        </Box>
      );
    }
  }
}
