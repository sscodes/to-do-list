import { Theme, ToastPosition } from 'react-toastify';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';

export function formatDate(date: DateValue) {
  if (date) {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = (date as Date).toLocaleDateString('en-US', options);
    return formattedDate;
  }
}

export const notificationProperties = {
  position: 'top-right' as ToastPosition,
  autoClose: 2000,
  theme: 'colored' as Theme,
};
