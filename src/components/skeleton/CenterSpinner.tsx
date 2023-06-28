import { Box, Spinner } from 'native-base';

export function CenterSpinner() {
  return (
    <Box flex={1} mt="5" justifyContent={'center'} alignItems={'center'}>
      <Spinner size="lg" color="mark.800" />
    </Box>
  );
}
