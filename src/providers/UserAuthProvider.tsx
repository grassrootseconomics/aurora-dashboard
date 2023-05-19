import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import '@/util/tokenStorage';
import {
  AccessTokenStructure,
  clearSession,
  fetchAccessToken,
} from '@/util/tokenStorage';
import jwtDecode from 'jwt-decode';
import { useAccount, useDisconnect } from 'wagmi';

interface UserAuthContextValue {
  connectedWallet: string | undefined;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const UserAuthContext = createContext<UserAuthContextValue | null | undefined>(
  null
);

UserAuthContext.displayName = 'UserAuthContext';

export const useUserAuthContext = () => useSafeContext(UserAuthContext);

export const UserAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { disconnect } = useDisconnect();

  const connectedWallet = useMemo(() => {
    return address?.toString();
  }, [address]);

  const clearUserSession = useCallback(() => {
    setIsAuthenticated(false);
    disconnect();
    clearSession();
  }, [disconnect]);

  const isTokenExpired = useCallback((token: string) => {
    const decoded: AccessTokenStructure = jwtDecode(token);

    const secondsNow = Date.now() / 1000;

    return decoded.exp < secondsNow;
  }, []);

  useEffect(() => {
    const token = fetchAccessToken();
    if (token) {
      if (isTokenExpired(token)) {
        clearUserSession();
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [clearUserSession, isTokenExpired, setIsAuthenticated]);

  const value = useMemo<UserAuthContextValue>(() => {
    return {
      connectedWallet,
      isAuthenticated,
      setIsAuthenticated,
    };
  }, [connectedWallet, isAuthenticated, setIsAuthenticated]);

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};
