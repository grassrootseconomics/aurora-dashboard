import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import { UserRole } from '@/util/constants/users';
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
  // Role doesn't have to be undefined.
  // If there is not user authenticated,
  // we treat it as if a buyer is present.
  userRole: 'buyer' | 'association' | 'project';
}

const UserAuthContext = createContext<UserAuthContextValue | null | undefined>(
  null
);

UserAuthContext.displayName = 'UserAuthContext';

export const useUserAuthContext = () => useSafeContext(UserAuthContext);

export const UserAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  const isTokenExpired = useCallback((token: string) => {
    const decoded: AccessTokenStructure = jwtDecode(token);

    const secondsNow = Date.now() / 1000;

    return decoded.exp < secondsNow;
  }, []);

  const { disconnect } = useDisconnect();

  const clearUserSession = useCallback(() => {
    disconnect();
    clearSession();
  }, [disconnect]);

  const isAuthenticated = useMemo(() => {
    const token = fetchAccessToken();
    if (token) {
      const decoded: AccessTokenStructure = jwtDecode(token);
      if (decoded.address !== address) {
        clearSession();
        return false;
      } else return !isTokenExpired(token);
    } else return false;
  }, [isTokenExpired, address]);

  const userRole = useMemo(() => {
    if (isAuthenticated) {
      const token = fetchAccessToken();
      if (token) {
        const decoded: AccessTokenStructure = jwtDecode(token);
        return decoded.role;
      } else return UserRole.buyer;
    } else return UserRole.buyer;
  }, [isAuthenticated]);

  const connectedWallet = useMemo(() => {
    return address?.toString();
  }, [address]);

  useEffect(() => {
    const token = fetchAccessToken();
    if (token) {
      if (isTokenExpired(token)) clearUserSession();
    }
  }, [clearUserSession, isTokenExpired]);

  const value = useMemo<UserAuthContextValue>(() => {
    return {
      connectedWallet,
      isAuthenticated,
      userRole,
    };
  }, [connectedWallet, isAuthenticated, userRole]);

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};
