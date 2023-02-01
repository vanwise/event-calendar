import { useEffect, useRef, useState } from 'react';
import { sleep } from 'Utils/helpers/common';

export function useSmallEventTitle(startTime: string, duration: string) {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [isTitleVisible, setIsTitleVisible] = useState(true);

  useEffect(() => {
    async function changeTitleVisibility() {
      const title = titleRef.current;
      await sleep(100);

      if (startTime && duration && title !== null) {
        const titleParentRect = title.parentElement?.getBoundingClientRect();
        const titleRect = title.getBoundingClientRect();

        if (titleParentRect) {
          const titleTopPosition = titleRect.top - titleParentRect.top;

          if (titleTopPosition > 0) {
            const isVisible =
              titleTopPosition + titleRect.height <= titleParentRect.height;
            setIsTitleVisible(isVisible);
          }
        }
      }
    }

    changeTitleVisibility();
  }, [startTime, duration]);

  return { isTitleVisible, titleRef };
}
