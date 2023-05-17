import { FC } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectWalletButton: FC = () => {
  return <ConnectButton showBalance={false} accountStatus={'address'} />;
};

export default ConnectWalletButton;
