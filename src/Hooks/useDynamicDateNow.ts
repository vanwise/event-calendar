import { useEffect, useState } from 'react';
import { TimeService } from 'Services';

function useDynamicDateNow(updateTimeoutInSeconds = 60) {
  const [dateNow, setDateNow] = useState(TimeService.getDate());

  useEffect(() => {
    const interval = setInterval(
      () => setDateNow(TimeService.getDate()),
      updateTimeoutInSeconds * 1000,
    );

    return () => clearInterval(interval);
  }, [updateTimeoutInSeconds]);

  return dateNow;
}

export default useDynamicDateNow;
