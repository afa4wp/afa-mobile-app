interface NotificationSubscriptionType {
  enabled: boolean;
  id: string;
  notification_type_id: string;
  title: string;
  type: 'form_created' | 'form_submission';
  user_devices_id: string;
}

export type { NotificationSubscriptionType };
