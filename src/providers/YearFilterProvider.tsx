import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

interface YearFilterContextValue {
  selectedYear: number;

  setSelectedYear: Dispatch<SetStateAction<number>>;
}

const YearFilterContext = createContext<YearFilterContextValue | null>(null);

YearFilterContext.displayName = 'YearFilterContext';

export const useYearFilterContext = () => useSafeContext(YearFilterContext);

const YearFilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  return (
    <YearFilterContext.Provider
      value={{
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </YearFilterContext.Provider>
  );
};

export default YearFilterProvider;
