import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'coracao_valente_sus_done';
const SESSION_KEY = 'coracao_valente_pages_visited';

export function useRatingPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;

    const alreadyDone = localStorage.getItem(STORAGE_KEY);
    if (alreadyDone) return;

    const visited = parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10);
    const newCount = visited + 1;
    sessionStorage.setItem(SESSION_KEY, String(newCount));

    if (newCount >= 3 && newCount % 2 === 1) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => setIsVisible(false);

  const handleSubmitted = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  return { isVisible, handleClose, handleSubmitted };
}