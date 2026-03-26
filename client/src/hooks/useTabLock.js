import { useEffect, useState } from 'react';

export const useTabLock = (onTabSwitch) => {
  const [isTabActive, setIsTabActive] = useState(true);
  const [switchCount, setSwitchCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isActive = document.visibilityState === 'visible';
      
      if (!isActive && isTabActive) {
        // Tab was switched away
        setSwitchCount(prev => prev + 1);
        if (onTabSwitch) {
          onTabSwitch();
        }
      }
      
      setIsTabActive(isActive);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTabActive, onTabSwitch]);

  return { isTabActive, switchCount };
};