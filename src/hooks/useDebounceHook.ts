import debounce from 'lodash.debounce';
import { useMemo } from 'react';

export const useDebounce = (fn: (value: any) => void, ms: number) => {
  return useMemo(() => debounce(fn, ms), [ms]);
};
