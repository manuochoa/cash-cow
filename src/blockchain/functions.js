import { abi } from "./abi";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

let minerAddress = "0x4bbfF816B143e4ae18118cBECBf05Ce276EEfaB7";
let tokenAddress = "0x26D09B98f9c07B73Fa851d4E312d89Ef8B7a6D0b";

let tokenAbi = [
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

let provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);

let contractInstance = new ethers.Contract(minerAddress, abi, provider);
let tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider);

// function buyEggs(address ref, uint256 amount) public payable
// function hatchEggs(bool isCompound) public
// function sellEggs() public {
// function calculateEggBuySimple(uint256 eth) public view returns (uint256)
// function calculateEggSell(uint256 eggs) public view returns (uint256) {
// function getAvailableEarnings(address _adr) public view returns (uint256)
// function getEggsYield(uint256 amount) public view returns (uint256, uint256)
// function getSiteInfo()
// function getUserInfo(address _adr)

export const calculateEggBuySimple = async (_amount) => {
  try {
    let amount = ethers.utils.parseUnits(_amount.toString(), "ether");
    let receipt = await contractInstance.calculateEggBuySimple(amount);

    return receipt;
  } catch (error) {
    console.log(error, "calculateEggBuySimple");
  }
};

export const calculateEggSell = async (eggs) => {
  try {
    let receipt = await contractInstance.calculateEggSell(eggs);

    return receipt;
  } catch (error) {
    console.log(error, "calculateEggSell");
  }
};

export const getAvailableEarnings = async (address) => {
  try {
    let receipt = await contractInstance.getAvailableEarnings(address);

    return receipt;
  } catch (error) {
    console.log(error, "getAvailableEarnings");
  }
};

export const getUserInfo = async (address) => {
  try {
    let contractInfo = await contractInstance.getUserInfo(address);
    let allowance = await tokenInstance.allowance(address, minerAddress);
    let balance = await tokenInstance.balanceOf(address);

    return { contractInfo, allowance, balance };
  } catch (error) {
    console.log(error, "getUserInfo");
  }
};

export const getEggsYield = async (amount) => {
  try {
    let receipt = await contractInstance.getEggsYield(amount);

    return receipt;
  } catch (error) {
    console.log(error, "getEggsYield");
  }
};

export const getSiteInfo = async () => {
  try {
    let receipt = await contractInstance.getSiteInfo();

    return receipt;
  } catch (error) {
    console.log(error, "getSiteInfo");
  }
};

export const buyEggs = async (ref, _amount, walletType) => {
  try {
    let amount = ethers.utils.parseUnits(_amount.toString(), "ether");

    let newInstance = await minerContractInstance(walletType);

    let tx = await newInstance.buyEggs(ref, amount);

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "buyEggs");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const hatchEggs = async (walletType) => {
  try {
    let newInstance = await minerContractInstance(walletType);

    let tx = await newInstance.hatchEggs("true");

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "hatchEggs");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const sellEggs = async (walletType) => {
  try {
    let newInstance = await minerContractInstance(walletType);

    let tx = await newInstance.sellEggs();

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "sellEggs");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const approveToken = async (_amount, walletType) => {
  try {
    let amount = ethers.utils.parseUnits(_amount.toString(), "ether");

    let newInstance = await tokenContractInstance(walletType);

    let tx = await newInstance.approve(minerAddress, amount);
    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "approveBUSD");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

const minerContractInstance = async (walletType) => {
  if (walletType === "WALLET_CONNECT") {
    let newProvider = new WalletConnectProvider({
      rpc: {
        97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      },
    });

    await newProvider.enable();
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(minerAddress, abi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(minerAddress, abi, signer);
  }
};

const tokenContractInstance = async (walletType) => {
  if (walletType === "WALLET_CONNECT") {
    let newProvider = new WalletConnectProvider({
      rpc: {
        97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      },
    });

    await newProvider.enable();
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  }
};
