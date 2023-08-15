import { Box, FlatList, Spinner, Heading, useToast, Text } from 'native-base';
import { useEffect, useState, useContext } from 'react';
import * as notificationService from '../../../services/notification';
import LanguageContext from '../../../context/LanguageContext';
import { CardNotification } from '../../../components/screens/private/notification/CardNotification';
import { SeparatorItem } from '../../../components/general/SeparatorItem';
import { CenterSpinner } from '../../../components/skeleton/CenterSpinner';
import { Notification } from '../../../@types/NotificationType';
import AuthContext from '../../../context/AuthContext';
import ErrorMessageToast from '../../../components/general/ErrorMessageToast';

export function NotificationScreen() {
  const { i18n, locale } = useContext(LanguageContext)!;
  const { state: authState } = useContext(AuthContext);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([] as Notification[]);
  const [showSpinner, setShowSpinner] = useState(true);
  const toast = useToast();

  async function getNotifications() {
    if (!hasMoreData) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const supported_plugin = authState.formType as string;
      const device_language = locale;

      const data = await notificationService.notifications(
        page,
        supported_plugin,
        device_language
      );
      if (data.results && data.results.length > 0) {
        const currentForm = data.results;
        setNotifications([...notifications, ...currentForm]);
        if (data.info.pages === page) {
          setHasMoreData(false);
        } else {
          setPage(page + 1);
        }
      } else {
        setHasMoreData(false);
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
      setIsLoading(false);
      setShowSpinner(false);
    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  const handleLoadMore = () => {
    if (!isLoading) {
      // Add this check
      getNotifications();
    }
  };

  function RenderItem({ item }: { item: Notification }) {
    return <CardNotification notification={item} />;
  }
  return (
    <Box flex={1} bg="mark.700">
      <Box flex={1}>
        {!showSpinner ? (
          notifications.length > 0 ? (
            <FlatList
              ItemSeparatorComponent={SeparatorItem}
              removeClippedSubviews={true}
              data={notifications}
              renderItem={({ item }) => <RenderItem item={item} />}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                isLoading ? <Spinner size="lg" color="mark.900" /> : null
              }
            />
          ) : (
            <Box mt="4" px="4">
              <Heading color="mark.800">
                {i18n.t('screen.notification.noNotification')}
              </Heading>
            </Box>
          )
        ) : (
          <CenterSpinner />
        )}
      </Box>
    </Box>
  );
}
