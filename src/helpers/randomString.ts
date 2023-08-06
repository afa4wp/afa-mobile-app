import * as Crypto from 'expo-crypto';

export const generateUniqueUUID = async (length = 30) => {
  const maxLength = 30;
  if (length > maxLength) {
    length = 30;
  }
  Crypto.digestStringAsync;
  const randomBytes = await Crypto.getRandomBytesAsync(maxLength);

  const base64String = randomBytes.toString().substring(0, length);

  const digestString = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    base64String
  );

  return digestString;
};
