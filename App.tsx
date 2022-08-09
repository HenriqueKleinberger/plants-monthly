import { useEffect } from 'react';
import Order from './Components/Order';
import { registerForPushNotificationsAsync } from './utils/pushNotification';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return <Order />;
}
