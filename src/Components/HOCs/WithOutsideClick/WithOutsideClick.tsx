import { cloneElement, ReactElement, useEffect, useRef } from 'react';

interface WithOutsideClickProps {
  children: ReactElement;
  onOutsideClick(): void;
}

function WithOutsideClick({ children, onOutsideClick }: WithOutsideClickProps) {
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const wrapper = wrapperRef.current;

      if (wrapper && !wrapper.contains(e.target as Node)) {
        onOutsideClick();
      }
    }

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  });

  return cloneElement(children, { ref: wrapperRef });
}

export default WithOutsideClick;
