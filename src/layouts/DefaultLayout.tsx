import { useRouter } from 'next/router';

import { FC, ReactNode } from 'react';

import AuroraAppBar from '@/components/core/AuroraAppBar';
import Body from '@/components/defaultLayout/Body';
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
  const router = useRouter();

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
    onConnect({ address }) {
      const token = fetchAccessToken();
      if (!token) {
        try {
          authenticateUser(address?.toString()).then(() => {
            console.log('Welcome User!');
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    onDisconnect() {
      router.push('/');
    },
  });

  return (
    <>
      <AuroraAppBar />
      <Body>{children}</Body>
    </>
  );
};

export default DefaultLayout;
