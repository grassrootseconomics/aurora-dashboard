import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { API } from '@/config';
import { useSafeContext } from '@/hooks/useSafeContext';
import { UserRole } from '@/util/constants/users';
import '@/util/tokenStorage';
import { AccessTokenStructure, clearSession } from '@/util/tokenStorage';
import jwtDecode from 'jwt-decode';
import useLocalStorage from 'use-local-storage';
import { useAccount, useDisconnect } from 'wagmi';

interface UserAuthContextValue {
  connectedWallet: string | undefined;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  // eslint-disable-next-line no-unused-vars
  setAccessToken: (value: string) => void;
}

const UserAuthContext = createContext<UserAuthContextValue | null | undefined>(
  null
);

UserAuthContext.displayName = 'UserAuthContext';

export const useUserAuthContext = () => useSafeContext(UserAuthContext);

const UserAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [accessToken, setAccessToken] = useLocalStorage<string>(
    API.ACCESS_TOKEN_STORAGE,
    '',
    {
      serializer: (obj) => {
        return obj ? obj : '';
      },
    }
  );

  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const { disconnect } = useDisconnect();

  const connectedWallet = useMemo(() => {
    return address?.toString();
  }, [address]);

  const clearUserSession = useCallback(() => {
    disconnect();
    clearSession();
  }, [disconnect]);

  const isTokenExpired = useCallback((token: string) => {
    const decoded: AccessTokenStructure = jwtDecode(token);

    const secondsNow = Date.now() / 1000;

    return decoded.exp < secondsNow;
  }, []);

  const setRole = useCallback((token: string) => {
    const decoded: AccessTokenStructure = jwtDecode(token);
    setUserRole(decoded.role);
  }, []);

  useEffect(() => {
    if (accessToken && accessToken !== 'null') {
      if (isTokenExpired(accessToken)) {
        clearUserSession();
        setIsAuthenticated(false);
      } else {
        setRole(accessToken);
        setIsAuthenticated(true);
      }
    } else {
      setUserRole(UserRole.buyer);
      setIsAuthenticated(false);
    }
  }, [
    clearUserSession,
    isTokenExpired,
    setIsAuthenticated,
    setRole,
    accessToken,
  ]);

  const value = useMemo<UserAuthContextValue>(() => {
    return {
      connectedWallet,
      userRole,
      isAuthenticated,
      setAccessToken,
    };
  }, [connectedWallet, userRole, isAuthenticated, setAccessToken]);

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
