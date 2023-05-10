import { Box, KeyboardAvoidingView } from 'native-base';
import { ValidateURL } from '../../../components/screens/public/ValidateURL';

export function SignInCredentialsScreen() {
  return (
    <Box flex={1} bg="mark.700">
      <KeyboardAvoidingView flex={1}>
        <ValidateURL />
      </KeyboardAvoidingView>
    </Box>
  );
}
