import { Box, KeyboardAvoidingView, Text } from 'native-base';
import { ValidateURL } from '../../../components/screens/public/ValidateURL';
import { SignInCredentials } from '../../../components/screens/public/SignInCredentials';
import { useState } from 'react';

export function SignInCredentialsScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const [url, setUrl] = useState('');

  const hendleData = (data: { url: string; status: boolean }) => {
    if (true === data.status) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
    setUrl(data.url);
  };

  return (
    <Box flex={1} bg="mark.700">
      <KeyboardAvoidingView flex={1}>
        {showLogin ? (
          <SignInCredentials />
        ) : (
          <ValidateURL onData={hendleData} />
        )}
      </KeyboardAvoidingView>
    </Box>
  );
}
