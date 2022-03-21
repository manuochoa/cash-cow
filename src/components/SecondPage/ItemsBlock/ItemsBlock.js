import React, { useState, useEffect } from "react";
import style from "./ItemsBlock.module.scss";
import { svgIcons } from "../../../assets/svg/svgIcons";
import availableIcon from "../../../assets/png/Available.png";
import claimedIcon from "../../../assets/png/Claimed.png";
import depositsIcon from "../../../assets/png/Deposits.png";
import maxIcon from "../../../assets/png/MaxPayout.png";

export const ItemsBlock = ({ usdValue, userInfo, userBalance, claimable }) => {
  const [items, setItems] = useState([
    {
      svg: availableIcon,
      text: "Available",
      value: 0,
      usd: 0,
    },
    {
      svg: depositsIcon,
      text: "Deposits",
      value: 0,
      usd: 0,
    },
    {
      svg: claimedIcon,
      text: "Claimed",
      value: 0,
      usd: 0,
    },
    {
      svg: maxIcon,
      text: "Max Payout",
      value: 0,
      usd: 0,
    },
  ]);

  useEffect(() => {
    if (userInfo) {
      let balance = Number(claimable.net_payout / 10 ** 18).toFixed(2);
      let totalDeposit = Number(userInfo.deposits / 10 ** 18).toFixed(2);
      let withdrawn = Number(userInfo.payouts / 10 ** 18).toFixed(2);
      let maxPayout = Number(claimable.max_payout / 10 ** 18).toFixed(2);

      setItems([
        {
          svg: availableIcon,
          text: "Available",
          value: balance,
          usd: Number(claimable.net_payout / usdValue).toFixed(2),
        },
        {
          svg: depositsIcon,
          text: "Deposits",
          value: totalDeposit,
          usd: Number(userInfo.deposits / usdValue).toFixed(2),
        },
        {
          svg: claimedIcon,
          text: "Claimed",
          value: withdrawn,
          usd: Number(userInfo.payouts / usdValue).toFixed(2),
        },
        {
          svg: maxIcon,
          text: "Max Payout",
          value: maxPayout,
          usd: Number(claimable.max_payout / usdValue).toFixed(2),
        },
      ]);
    }
  }, [userInfo]);

  return (
    <div className={style.itemsBlock}>
      {items.map(({ svg, text, value, usd }, index) => (
        <div key={index} className={style.item}>
          <div className={style.top}>
            <img src={svg} className={style.icon} alt="" />
            {/* <div className={style.icon}>{svg}</div> */}
            <p>{text}</p>
          </div>
          <div className={style.bottom}>
            <div className={style.bottom}>
              <p>{value}</p>
              <p>$CASH</p>
            </div>
            <div className={style.bottom}>
              <p>~{usd}</p>
              <p>BUSD</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
