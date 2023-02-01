import { useEffect, useRef } from 'react';

/**
 * @param onOutsideClick must be wrapped in useCallback
 */

function useOutsideClick<Element extends HTMLElement>(
  onOutsideClick: () => void,
) {
  const wrapperRef = useRef<Element>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const wrapper = wrapperRef.current;

      if (wrapper && !wrapper.contains(e.target as Node)) {
        onOutsideClick();
      }
    }

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [onOutsideClick]);

  return wrapperRef;
}

export default useOutsideClick;
