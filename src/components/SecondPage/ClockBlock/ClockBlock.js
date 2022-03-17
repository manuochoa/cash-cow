import React, { useState, useEffect } from "react";
import style from "./ClockBlock.module.scss";
import clock from "../../../assets/png/clock.png";
import { svgIcons } from "../../../assets/svg/svgIcons";
import clsx from "clsx";
import { claim, roll } from "../../../blockchain/functions";

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
            {Number(userInfo?.deposits / 10 ** 18).toFixed(2)}
          </span>
          <span> $CASH</span>
        </p>
      </div>
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Claimed</p>
        <p className={style.right}>
          <span className={style.green}>
            {" "}
            {Number(userInfo?.payouts / 10 ** 18).toFixed(2)}
          </span>
          <span> $CASH</span>
        </p>
      </div>
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Referral Rewards</p>
        <p className={style.right}>
          <span className={style.green}>
            {" "}
            {Number(userInfo?.match_bonus / 10 ** 18).toFixed(2)}
          </span>
          <span> $CASH</span>
        </p>
      </div>
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Max Payout</p>
        <p className={style.right}>
          <span className={style.green}> 100.000</span>
          <span> $CASH</span>
        </p>
      </div>
      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Team</p>
        <p className={style.right}>
          <span className={style.green}> {Number(userInfo?.referrals)}/15</span>
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
