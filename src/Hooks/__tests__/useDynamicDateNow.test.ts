import { act, renderHook } from '@testing-library/react';
import useDynamicDateNow from 'Hooks/useDynamicDateNow';
import { sleep } from 'Utils/helpers/common';

describe('Use Dynamic Date Now', () => {
  it('should be returning dynamic time', async () => {
    const { result } = renderHook(() => useDynamicDateNow(3));

    const firstDate = result.current;
    await act(async () => await sleep(3050));
    expect(result.current.second()).toBe(firstDate.add(3, 'second').second());
  });
});
