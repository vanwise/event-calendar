import { useCallback, useState } from 'react';

export function useSmallEventTitle() {
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const measuredTitleRef = useCallback((titleNode: HTMLParagraphElement) => {
    if (titleNode !== null) {
      const titleParentRect = titleNode.parentElement?.getBoundingClientRect();
      const titleRect = titleNode.getBoundingClientRect();

      if (titleParentRect) {
        const titleTopPosition = titleRect.top - titleParentRect.top;

        if (titleTopPosition > 0) {
          const isVisible =
            titleTopPosition + titleRect.height <= titleParentRect.height;
          setIsTitleVisible(isVisible);
        }
      }
    }
  }, []);

  return { isTitleVisible, measuredTitleRef };
}
