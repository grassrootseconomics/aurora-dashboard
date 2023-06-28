import { newKitFromWeb3 } from '@celo/contractkit';
import Web3 from 'web3';
import { ABI } from './constants/abi';

const contractAddress = "0x023dBFCccE7B897524f02Cf8105d68846C2E59d2";

export const fetchNFTMetadata = async (tokenId: string) => {
  const kit = await initContractKit();
  const contract = new kit.web3.eth.Contract(ABI as any, contractAddress);
  const metadata = await contract.methods.tokenURI(tokenId).call();
  console.log(metadata)
  // You can use the metadata URL to retrieve the metadata details
  // You may need to parse the metadata if it's returned as JSON
  return metadata;
};

const initContractKit = async () => {
  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  await (window as any).ethereum.enable(); // Request access to the user's accounts
  const kit = newKitFromWeb3(web3 as any);
  return kit;
};