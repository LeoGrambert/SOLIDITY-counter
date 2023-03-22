import { ethers } from "ethers";

const localProvider = new ethers.providers.JsonRpcProvider(
  "http://localhost:8545"
);

export const getProvider = () => {
  return localProvider;
};

export const getSigner = (index = 0) => {
  const provider = getProvider();
  const signer = provider.getSigner(index);
  return signer;
};

export const getContract = (address, abi, signerIndex) => {
  const signer = getSigner(signerIndex);
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};