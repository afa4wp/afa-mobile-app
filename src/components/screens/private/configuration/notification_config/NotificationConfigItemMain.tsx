import { FormCreated } from './FormCreated';
import { FormSubmission } from './FormSubmission';
import { NotificationSubscriptionType } from '../../../../../@types/NotificationSubscriptionType';
export function NotificationConfigItemMain({
  notificationSubscription,
}: {
  notificationSubscription: NotificationSubscriptionType;
}) {
  switch (notificationSubscription.type) {
    case 'form_submission':
      return (
        <FormSubmission notificationSubscription={notificationSubscription} />
      );
    case 'form_created':
      return (
        <FormCreated notificationSubscription={notificationSubscription} />
      );
    default:
      return (
        <FormSubmission notificationSubscription={notificationSubscription} />
      );
  }
}
