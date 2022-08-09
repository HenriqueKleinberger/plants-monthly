import { useEffect } from 'react';
import Order from './Components/Order';
import { registerForPushNotificationsAsync } from './utils/pushNotification';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return <Order />;
}
