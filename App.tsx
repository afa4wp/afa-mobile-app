import { useEffect } from 'react';
import AppProviders from './src/providers/Providers';
import { getOrCreateDeviceId } from './src/helpers/secureStore';

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        await getOrCreateDeviceId();
      } catch (error) {}
    })();
  }, []);
  return <AppProviders />;
}
