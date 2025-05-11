import { useEffect } from 'react';

export const useOnlineStatus = ({
  onOffline = () => {},
  onOnline = () => {},
  onReconnect = () => {},
}) => {
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      if (!navigator.onLine) {
        onOffline();
      } else {
        onOnline();
        onReconnect();
      }
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [onOffline, onOnline, onReconnect]);

  return {
    isOnline: navigator.onLine,
  };
};

export default useOnlineStatus;
