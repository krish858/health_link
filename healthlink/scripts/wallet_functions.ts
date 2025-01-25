import { ethers } from "ethers";

const RPC_PROVIDER = "https://ethereum-sepolia-rpc.publicnode.com";

export const convertPrivateToPublic = (private_key: string): string => {
  const wallet = new ethers.Wallet(private_key);
  return wallet.address;
};

export const createRandomWallet = () => {
  let privateKey = "0x";
  const length = 64;
  const characters = "0123456789abcdef";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    privateKey += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return privateKey;
};

export const getBalance = async (address: string) => {
  const provider = new ethers.JsonRpcProvider(RPC_PROVIDER);
  let balance = await provider.getBalance(address);
  //@ts-ignore
  balance = ethers.formatEther(balance);
  return Math.round(Number(balance) * 100000000) / 100000000;
};

export async function convertEthToUsd(ethAmount: number) {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const data = await response.json();
  const ethPrice = data.ethereum.usd;

  const usdAmount = ethAmount * ethPrice;
  console.log(`Current price of ETH: $${ethPrice}`);
  console.log(`Equivalent in USD: $${usdAmount}`);
  return usdAmount;
}
