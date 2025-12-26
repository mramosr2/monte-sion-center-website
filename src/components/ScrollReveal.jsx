import { useEffect, useRef, useState } from 'react';

/**
 * Wraps content and fades it in when it enters the viewport,
 * and fades it back out when it leaves.
 */
export default function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Guard in case IntersectionObserver doesn't exist for some reason
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const combinedClassName = [
    'scroll-fade',
    visible ? 'scroll-fade-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={combinedClassName}>
      {children}
    </div>
  );
}
