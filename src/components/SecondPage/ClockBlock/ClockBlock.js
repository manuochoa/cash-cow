import React, { useState, useEffect } from "react";
import style from "./ClockBlock.module.scss";
import clock from "../../../assets/png/clock.png";
import { svgIcons } from "../../../assets/svg/svgIcons";
import clsx from "clsx";
import { hatchEggs, sellEggs } from "../../../blockchain/functions";

export const ClockBlock = ({ userInfo, getInitialInfo, walletType }) => {
  const [miners, setMiners] = useState("");
  const [busdBalance, setBusdBalance] = useState("");
  const [eggYield, setEggYield] = useState("");
  const [availableEarnings, setAvailbleEarnings] = useState("");

  const handleCompound = async () => {
    let receipt = await hatchEggs(walletType);
    if (receipt) {
      console.log(receipt);
      getInitialInfo();
    }
  };

  const handleClaim = async () => {
    let receipt = await sellEggs(walletType);
    if (receipt) {
      console.log(receipt);
      getInitialInfo();
    }
  };

  useEffect(() => {
    console.log("inside clock block", {
      userInfo,
    });
    if (userInfo?.dailyYield) {
      setEggYield(Number(userInfo.dailyYield / 10 ** 18).toFixed(2));
      setAvailbleEarnings(
        Number(userInfo.availableEarnings / 10 ** 18).toFixed(2)
      );
    }
  }, [userInfo]);

  return (
    <div className={style.clockBlock}>
      <img src={clock} alt="" className={style.clock} />

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
      </div>

      <div className={clsx(style.field, style.field_first)}>
        <p className={style.left}>Est. Daily Yield:</p>
        <p className={style.right}>
          <span className={style.green}>{eggYield}</span>
          <span> $CASH</span>
        </p>
      </div>

      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Available Earnings</p>
        <p className={style.right}>
          <span className={style.green}>{availableEarnings}</span>
          <span> $CASH</span>
        </p>
      </div>

      <div className={style.buttons}>
        <button onClick={handleClaim} className={style.firstBtn}>
          <p>
            <span>Claim Rewards</span>
            {/* <span>(-40% Tax)</span> */}
          </p>
        </button>
        <button onClick={handleCompound} className={style.secondBtn}>
          Compound (+12% Bonus)
        </button>
      </div>
    </div>
  );
};
