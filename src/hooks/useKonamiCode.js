// src/hooks/useKonamiCode.js
import { useEffect, useState, useCallback } from 'react';

// Целевая последовательность
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const useKonamiCode = (callback) => {
  const [keys, setKeys] = useState([]);

  const handler = useCallback(({ key }) => {
    // Добавляем новую клавишу и обрезаем массив до длины кода
    const newKeys = [...keys, key.toLowerCase()].slice(-konamiCode.length);
    setKeys(newKeys);

    // Сравниваем
    if (newKeys.join('') === konamiCode.join('')) {
      callback();
    }
  }, [keys, callback]);

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [handler]);
};