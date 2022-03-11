import React, { useState, useEffect } from "react";
import style from "./App.module.scss";
import { SecondPage } from "../SecondPage/SecondPage";
import { getUserInfo, getSiteInfo } from "../../blockchain/functions";

export const App = () => {
  const [userAddress, setUserAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [siteInfo, setSiteInfo] = useState([]);

  const getInitialInfo = async () => {
    let userDetails = await getUserInfo(
      "0x153B202F6C6e570f13C27371CdA6Ae2c8768Dca6"
    );
    let contractDetails = await getSiteInfo();

    setUserInfo(userDetails);
    setSiteInfo(contractDetails);

    console.log({ userDetails, contractDetails });
  };

  useEffect(() => {
    getInitialInfo();
  }, []);

  return (
    <div className={style.app}>
      <SecondPage
        getInitialInfo={getInitialInfo}
        walletType={walletType}
        userInfo={userInfo}
        siteInfo={siteInfo}
      />
    </div>
  );
};
