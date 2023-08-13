import React, { useContext, useState } from 'react';
import { Box, Text } from 'native-base';

type Props = {
  message: string;
};
const ErrorMessageToast = ({ message }: Props) => {
  return (
    <Box bg="mark.900" px="2" py="1" rounded="sm" mb={5}>
      <Text color="mark.700" fontSize="md">
        {message}
      </Text>
    </Box>
  );
};

export default ErrorMessageToast;
