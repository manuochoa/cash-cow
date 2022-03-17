import { abi } from "./abi";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

let tokenAddress = "0x0993bcC05b342Dd0afeeE82863e403C1b0eaFC74";
let vaultAddress = "0x7b2FB0BE8843A281E3EF55c4a8a31B5690827b5e";
let faucetAddress = "0x7155EFd9F66ED154e936017A5358F4a05d98D3d2";

let tokenAbi = [
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

let provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);

let contractInstance = new ethers.Contract(faucetAddress, abi, provider);
let tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider);

// function deposit(address _upline, uint256 _amount) external {
// function claim() external {
// function roll() public {

export const getUserInfo = async (userAddress) => {
  try {
    let receipt = await contractInstance.users(userAddress);
    let available = await contractInstance.claimsAvailable(userAddress);
    let balance = await tokenInstance.balanceOf(userAddress);
    let allowance = await tokenInstance.allowance(userAddress, faucetAddress);

    return { receipt, available, balance, allowance: Number(allowance) > 0 };
  } catch (error) {
    console.log(error, "getUserInfo");
  }
};

export const deposit = async (ref, _amount, walletType) => {
  try {
    let amount = ethers.utils.parseUnits(_amount.toString(), "ether");

    let newInstance = await faucetContractInstance(walletType);

    let tx = await newInstance.deposit(ref, amount);

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "deposit");

    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const claim = async (walletType) => {
  try {
    let newInstance = await faucetContractInstance(walletType);

    let tx = await newInstance.claim();

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "claim");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const roll = async (walletType) => {
  try {
    let newInstance = await faucetContractInstance(walletType);

    let tx = await newInstance.roll();

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "roll");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const approveToken = async (walletType) => {
  try {
    const maxInt =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";

    let newInstance = await tokenContractInstance(walletType);

    let tx = await newInstance.approve(faucetAddress, maxInt);
    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "approveBUSD");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

const faucetContractInstance = async (walletType) => {
  if (walletType === "WALLET_CONNECT") {
    let newProvider = new WalletConnectProvider({
      rpc: {
        97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      },
      network: "binance testnet",
      chainId: 97,
      infuraId: null,
    });

    await newProvider.enable();

    const web3Provider = new providers.Web3Provider(newProvider);

    let signer = web3Provider.getSigner(0);

    return new ethers.Contract(faucetAddress, abi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(faucetAddress, abi, signer);
  }
};

const tokenContractInstance = async (walletType) => {
  if (walletType === "WALLET_CONNECT") {
    let newProvider = new WalletConnectProvider({
      rpc: {
        97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      },
      network: "binance testnet",
      chainId: 97,
      infuraId: null,
    });

    await newProvider.enable();

    const web3Provider = new providers.Web3Provider(newProvider);

    let signer = web3Provider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  }
};
