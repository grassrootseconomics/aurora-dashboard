import { Chain, celo, celoAlfajores } from 'viem/chains';

type AppChainsProp = {
  [key: string]: Chain;
};

const chains: AppChainsProp = {
  MAINNET: celo,
  TESTNET: celoAlfajores,
};

export default chains;
