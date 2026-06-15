import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'coracao_valente_sus_done';
const SESSION_KEY = 'coracao_valente_pages_visited';

export function useRatingPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  const alreadyDone = !!localStorage.getItem(STORAGE_KEY);

  useEffect(() => {
    if (isAdmin || alreadyDone) return;

    const visited = parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10);
    const newCount = visited + 1;
    sessionStorage.setItem(SESSION_KEY, String(newCount));

    if (newCount >= 8 && newCount % 5 === 0) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, alreadyDone, isAdmin]);

  const open  = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  const handleSubmitted = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  return {
    isVisible,
    open,
    close,
    handleSubmitted,
    showFloatingBtn: !isAdmin,
  };
}