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
  userRole: UserRole | null;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const UserAuthContext = createContext<UserAuthContextValue | null | undefined>(
  null
);

UserAuthContext.displayName = 'UserAuthContext';

export const useUserAuthContext = () => useSafeContext(UserAuthContext);

const UserAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const { disconnect } = useDisconnect();

  const connectedWallet = useMemo(() => {
    return address?.toString();
  }, [address]);

  const clearUserSession = useCallback(() => {
    setIsAuthenticated(false);
    disconnect();
    clearSession();
  }, [disconnect]);

  const isTokenValid = useCallback((token: string, address: string) => {
    const decoded: AccessTokenStructure = jwtDecode(token);

    const secondsNow = Date.now() / 1000;

    return decoded.exp < secondsNow && decoded.address === address;
  }, []);

  const setRole = useCallback((token: string) => {
    const decoded: AccessTokenStructure = jwtDecode(token);
    setUserRole(decoded.role);
  }, []);

  useEffect(() => {
    const token = fetchAccessToken();
    if (token && address) {
      if (isTokenValid(token, address)) {
        clearUserSession();
      } else {
        setRole(token);
        setIsAuthenticated(true);
      }
    } else {
      setUserRole(UserRole.buyer);
      setIsAuthenticated(false);
    }
  }, [address, clearUserSession, isTokenValid, setIsAuthenticated, setRole]);

  const value = useMemo<UserAuthContextValue>(() => {
    return {
      connectedWallet,
      userRole,
      isAuthenticated,
      setIsAuthenticated,
    };
  }, [connectedWallet, userRole, isAuthenticated, setIsAuthenticated]);

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
