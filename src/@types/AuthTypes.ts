interface State {
  isLoggedIn: boolean;
  activeUser: string | null;
  isLoading: boolean;
  user: User;
}

interface AuthContextProps {
  // Define the shape of the context value
  state: State;
  handleLogin: (
    userToken: string,
    userRefreshToken: string,
    url: string,
    email: string
  ) => void;
  handleToken: () => void;
  handleLogout: () => void;
}

interface User {
  id: number;
  email: string;
  display_name: string;
  first_name: string;
  user_login: string;
  user_registered: string;
  last_name: string;
  user_roles: Array<string>;
  number_of_posts: number;
  avatar_url: string;
}

type Action =
  | { type: 'LOGGED_IN'; payload: string }
  | { type: 'LOGGED_OUT'; payload: null }
  | {
      type: 'RESTORE_TOKEN';
      payload: { isLoggedIn: boolean; activeUser: string | null };
    }
  | { type: 'FETCH_USER'; payload: User };

interface LoginData {
  username: string;
  password: string;
}

interface LoggedData {
  id: string;
  userToken: string;
  userRefreshToken: string;
  url: string;
}
export type { State, User, Action, AuthContextProps, LoginData, LoggedData };
