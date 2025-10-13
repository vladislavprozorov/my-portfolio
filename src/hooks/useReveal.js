import { useEffect, useRef, useState } from 'react';

// useReveal: нативное появление при входе во viewport
export function useReveal({ threshold = 0.2, rootMargin = '0px 0px -10% 0px', disabled = false } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, disabled]);

  return { ref, visible };
}
