import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import configChains from './chains';
import { WEB_3 } from './index';

const { chains, publicClient } = configureChains(
  [configChains[WEB_3.NETWORK]],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: WEB_3.APP_NAME,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains, wagmiConfig };
