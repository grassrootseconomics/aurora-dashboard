import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

interface LoadingStateContextValue {
  isLoading: boolean;

  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingStateContext = createContext<LoadingStateContextValue | null>(
  null
);

LoadingStateContext.displayName = 'LoadingStateContext';

export const useLoadingStateContext = () => useSafeContext(LoadingStateContext);

const LoadingStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <LoadingStateContext.Provider
      value={{
        isLoading,
        setLoading,
      }}
    >
      {children}
    </LoadingStateContext.Provider>
  );
};

export default LoadingStateProvider;
