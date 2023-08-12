export const getSingleKey = (obj: { [key: string]: string }): string | null => {
  const keys = Object.keys(obj);

  if (keys.length === 1) {
    return keys[0];
  }

  return null;
};
