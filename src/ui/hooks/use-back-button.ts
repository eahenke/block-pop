import { useEffect } from 'react';

export const usePushState = () => {
  useEffect(() => {
    window.history.pushState({}, '', '');
  }, []);
};

export const useBackButton = (callback: (event: PopStateEvent) => void) => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      callback(event);
      return;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callback]);
};
