import React, { useState, useEffect } from "react";
import style from "./ClockBlock.module.scss";
import clock from "../../../assets/png/clock.png";
import { svgIcons } from "../../../assets/svg/svgIcons";
import clsx from "clsx";
import { claim, roll } from "../../../blockchain/functions";
import { toast } from "react-toastify";

let marketingWallet = "0x153B202F6C6e570f13C27371CdA6Ae2c8768Dca6";

export const ClockBlock = ({
  claimable,
  userInfo,
  getInitialInfo,
  walletType,
}) => {
  const [miners, setMiners] = useState("");
  const [busdBalance, setBusdBalance] = useState("");
  const [eggYield, setEggYield] = useState("");
  const [availableEarnings, setAvailbleEarnings] = useState("");

  const handleCompound = async () => {
    let receipt = await roll(walletType);
    if (receipt) {
      console.log(receipt);
      getInitialInfo();
    }
  };

  const handleClaim = async () => {
    let receipt = await claim(walletType);
    if (receipt) {
      console.log(receipt);
      getInitialInfo();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <div className={style.clockBlock}>
      {/* <img src={clock} alt="" className={style.clock} />

      <div className={style.top}>
        <p className={style.text}>
          <span className={style.green}>{miners}</span>
          <span>Miners</span>
        </p>

        <div>{svgIcons.arrow_right}</div>

        <p className={style.text}>
          <span className={style.green}>{busdBalance}</span>
          <span>$CASH</span>
        </p>
      </div> */}
      {/* 
      <div className={clsx(style.field, style.field_first)}>
        <p className={style.left}>Available:</p>
        <p className={style.right}>
          <span className={style.green}>
            {Number(claimable / 10 ** 18).toFixed(2)}
          </span>
          <span> $CASH</span>
        </p>
      </div>

      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Deposits</p>
        <p className={style.right}>
          <span className={style.green}>
            {" "}
            {userInfo ? Number(userInfo?.deposits / 10 ** 18).toFixed(2) : "0"}
          </span>
          <span> $CASH</span>
        </p>
      </div>
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Claimed</p>
        <p className={style.right}>
          <span className={style.green}>
            {" "}
            {userInfo ? Number(userInfo?.payouts / 10 ** 18).toFixed(2) : "0"}
          </span>
          <span> $CASH</span>
        </p>
      </div> */}
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Referral Rewards</p>
        <p className={style.right}>
          <span className={style.green}>
            {" "}
            {userInfo
              ? Number(userInfo?.match_bonus / 10 ** 18).toFixed(2)
              : "0"}
          </span>
          <span> $CASH</span>
        </p>
      </div>
      {/* <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Max Payout</p>
        <p className={style.right}>
          <span className={style.green}> 100.000</span>
          <span> $CASH</span>
        </p>
      </div> */}
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Team</p>
        <p className={style.right}>
          <span className={style.green}>
            {" "}
            {Number(userInfo?.referrals) || "0"}/15
          </span>
          {/* <span> $</span> */}
        </p>
      </div>
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>My Referral</p>
        <p className={style.right}>
          <span className={style.green}>
            {" "}
            {userInfo?.upline?.toString().slice(0, 6)}...
            {userInfo?.upline?.toString().slice(-10)}{" "}
          </span>
          {/* <span> $CASH</span> */}
        </p>
      </div>
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Marketing Wallet</p>
        <p className={style.right}>
          <span className={style.green}>
            {marketingWallet.slice(0, 6)}...{marketingWallet.slice(-6)}
          </span>
          <button
            style={{ border: "0px" }}
            onClick={() => copyToClipboard(marketingWallet)}
          >
            {svgIcons.union}
          </button>
        </p>
      </div>

      <div className={style.buttons}>
        {/* <button onClick={handleClaim} className={style.firstBtn}>
          <p>
            <span>Claim Rewards</span>
          </p>
        </button>
        <button onClick={handleCompound} className={style.secondBtn}>
          Compound (+12% Bonus)
        </button> */}
      </div>
    </div>
  );
};
