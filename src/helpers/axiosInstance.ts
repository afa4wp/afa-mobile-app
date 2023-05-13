import axios from 'axios';

// Public API instance

export const publicApi = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
  });
};
