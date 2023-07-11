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
  fetchAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/util/tokenStorage';
import { useAccount, useSignMessage } from 'wagmi';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  const { signMessageAsync } = useSignMessage();
  const { setIsAuthenticated, clearUserSession } = useUserAuthContext();

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
            window.location.reload();
          }
        }
      }
    }
  };

  useAccount({
    onConnect({ address }) {
      const token = fetchAccessToken();
      if (!token) {
        try {
          authenticateUser(address?.toString()).then(() => {
            setIsAuthenticated(true);
          });
        } catch (err) {
          clearUserSession();
        }
      }
    },
    onDisconnect() {
      window.location.href = '/';
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
