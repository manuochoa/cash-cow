import { abi } from "./abi";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { toast } from "react-toastify";

let tokenAddress = "0xA947046884fDDC230458448ef9C4A7cBc4703d50";
let vaultAddress = "0x8c773FF7b4F78d638A50e9351eD7d5f5284b4415";
// let faucetAddress = "0xF9D1bD94A734f26A1A77223a57c6b926b4219063";
let faucetAddress = "0xBa9Cec669E12DeFA8741a3964F1EDaF30E8065b0";

let tokenAbi = [
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

let provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed1.ninicoin.io/"
);

let contractInstance = new ethers.Contract(faucetAddress, abi, provider);
let tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider);

// function deposit(address _upline, uint256 _amount) external {
// function claim() external {
// function roll() public {

export const getUserInfo = async (userAddress) => {
  try {
    let receipt = await contractInstance.users(userAddress);
    let available = await contractInstance.payoutOf(userAddress);
    let balance = await tokenInstance.balanceOf(userAddress);
    let allowance = await tokenInstance.allowance(userAddress, faucetAddress);

    return {
      receipt,
      available,
      balance,
      allowance: Number(allowance) > 0,
    };
  } catch (error) {
    console.log(error, "getUserInfo");
  }
};

export const checkDeposit = async (userAddress) => {
  try {
    let info = await contractInstance.userInfo(userAddress);

    return info.deposits > 0;
  } catch (error) {
    console.log(error, "checkDeposit");
  }
};

export const deposit = async (ref, _amount, walletType, walletProvider) => {
  try {
    let amount = ethers.utils.parseUnits(_amount.toString(), "ether");

    let newInstance = await faucetContractInstance(walletType, walletProvider);

    let tx = await newInstance.deposit(ref, amount, { gasLimit: 700000 });

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "deposit");
    toast.error("Something Went Wrong");

    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

// function changeUpline(address _upline) public

export const changeReferral = async (ref, walletType, walletProvider) => {
  let newInstance = await faucetContractInstance(walletType, walletProvider);

  let tx = await newInstance.changeUpline(ref, { gasLimit: 700000 });

  let receipt = await tx.wait();

  return receipt;
};

export const claim = async (walletType, walletProvider) => {
  try {
    let newInstance = await faucetContractInstance(walletType, walletProvider);

    let tx = await newInstance.claim({ gasLimit: 700000 });

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "claim");
    toast.error("Something Went Wrong");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const roll = async (walletType, walletProvider) => {
  try {
    let newInstance = await faucetContractInstance(walletType, walletProvider);

    let tx = await newInstance.roll({ gasLimit: 700000 });

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "roll");
    toast.error("Something Went Wrong");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const approveToken = async (walletType, walletProvider) => {
  try {
    const maxInt =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";

    let newInstance = await tokenContractInstance(walletType, walletProvider);

    let tx = await newInstance.approve(faucetAddress, maxInt, {
      gasLimit: 50000,
    });
    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "approveBUSD");
    toast.error("Something Went Wrong");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

const faucetContractInstance = async (walletType, walletProvider) => {
  if (walletType === "WALLET_CONNECT") {
    const web3Provider = new providers.Web3Provider(walletProvider);

    let signer = web3Provider.getSigner(0);

    return new ethers.Contract(faucetAddress, abi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(faucetAddress, abi, signer);
  }
};

const tokenContractInstance = async (walletType, walletProvider) => {
  if (walletType === "WALLET_CONNECT") {
    const web3Provider = new providers.Web3Provider(walletProvider);

    let signer = web3Provider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  }
};
