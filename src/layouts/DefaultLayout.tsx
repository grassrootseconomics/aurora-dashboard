import { FC, ReactNode } from 'react';

import AuroraAppBar from '@/components/core/AuroraAppBar';
import Footer from '@/components/core/Footer';
import Body from '@/components/defaultLayout/Body';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import {
  generateAccessToken,
  generateRefreshToken,
  getNonce,
} from '@/services/auth';
import {
  RefreshTokenStructure,
  clearSession,
  fetchRefreshToken,
  setRefreshToken,
} from '@/util/tokenStorage';
import jwtDecode from 'jwt-decode';
import { useAccount, useSignMessage } from 'wagmi';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  const { signMessageAsync } = useSignMessage();
  const { isAuthenticated, setAccessToken } = useUserAuthContext();

  const authenticateUser = async (connectedWallet: string | undefined) => {
    if (connectedWallet) {
      const { nonce } = await getNonce(connectedWallet);
      if (nonce) {
        const signedNonce = await signMessageAsync({ message: nonce });
        if (signedNonce) {
          const { rToken } = await generateRefreshToken(
            connectedWallet,
            nonce,
            signedNonce
          );
          if (rToken) {
            setRefreshToken(rToken);
            const { aToken } = await generateAccessToken(rToken);
            if (aToken) {
              setAccessToken(aToken);
            }
          }
        }
      }
    }
  };

  useAccount({
    onConnect({ address, isReconnected }) {
      if (!isReconnected) {
        if (!isAuthenticated) {
          try {
            authenticateUser(address?.toString()).then(() => {});
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        const rToken = fetchRefreshToken();
        if (rToken) {
          const decoded: RefreshTokenStructure = jwtDecode(rToken);

          const secondsNow = Date.now() / 1000;
          if (decoded.exp < secondsNow) {
            setAccessToken('');
            clearSession();
          } else {
            generateAccessToken(rToken).then(({ aToken }) => {
              if (aToken) {
                setAccessToken(aToken);
              }
            });
          }
        }
      }
    },
    onDisconnect() {
      setAccessToken('');
      clearSession();
    },
  });

  return (
    <>
      <AuroraAppBar />
      <Body>{children}</Body>
      <Footer />
    </>
  );
};

export default DefaultLayout;
