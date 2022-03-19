import React, { useState, useEffect } from "react";
import style from "./App.module.scss";
import { SecondPage } from "../SecondPage/SecondPage";
import { getUserInfo } from "../../blockchain/functions";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const [userAddress, setUserAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [claimable, setClaimable] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [siteInfo, setSiteInfo] = useState([]);
  const [investExample, setInvestExample] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);
  const [walletProvider, setWalletProvider] = useState();

  const getInitialInfo = async () => {
    if (userAddress) {
      let userDetails = await getUserInfo(userAddress);

      setClaimable(userDetails.available);
      setUserBalance(userDetails.balance);
      setIsAllowed(userDetails.allowance);
      setUserInfo(userDetails.receipt);
    }
  };

  const connectMetamask = async () => {
    console.log("hola");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);

      window.localStorage.setItem("userAddress", accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (chainId !== "0x61") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x61" }],
        });
      }

      window.ethereum.on("accountsChanged", function (accounts) {
        setUserAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletConnect = async () => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          //56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        network: "binance testnet",
        chainId: 97,
        infuraId: null,
      });

      await provider.enable();
      setWalletProvider(provider);
      const web3 = new Web3(provider);

      // const accounts = await ethers.listAccounts();
      const accounts = await web3.eth.getAccounts();

      setUserAddress(accounts[0]);
      setWalletType("WALLET_CONNECT");
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    if (walletType === "WALLET_CONNECT") {
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",

          97: "https://speedy-nodes-nyc.moralis.io/1d19a6082204e3ecd8dcf0b9/bsc/testnet",
        },
        chainId: 97,
        infuraId: null,
      });
      await provider.disconnect();
    } else {
    }

    setUserAddress("");
  };

  useEffect(() => {
    getInitialInfo();
  }, [userAddress]);

  return (
    <div className={style.app}>
      <SecondPage
        walletProvider={walletProvider}
        claimable={claimable}
        isAllowed={isAllowed}
        userBalance={userBalance}
        investExample={investExample}
        userAddress={userAddress}
        disconnectWallet={disconnectWallet}
        getInitialInfo={getInitialInfo}
        walletType={walletType}
        userInfo={userInfo}
        siteInfo={siteInfo}
        connectMetamask={connectMetamask}
        connectWalletConnect={connectWalletConnect}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="dark"
      />
    </div>
  );
};
