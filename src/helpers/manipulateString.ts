export const sanitizeEndpoint = (endpoint: string) => {
  // Regular expression to replace consecutive forward slashes ('/') with an empty string
  const sanitizedEndpoint = endpoint.replace(/\/(?=\/)/g, '');
  return sanitizedEndpoint;
};
