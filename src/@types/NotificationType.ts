interface UserCreated {
  user_id: number;
  user_name: string;
  user_email: string;
  avatar_url: string;
}

interface MetaValue {
  entry_id: number;
  post_type: string;
  post_tiltle: string;
  user_id: string;
}

interface Notification {
  id: string;
  user_id?: string | null;
  notification_type_id: string;
  meta_value: MetaValue;
  created_at: string;
  type: string;
  title: string;
  user_created?: UserCreated | null;
  message: string;
}

export type { Notification };
