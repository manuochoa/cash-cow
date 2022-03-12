import React, { useState, useEffect } from "react";
import style from "./ItemsBlock.module.scss";
import { svgIcons } from "../../../assets/svg/svgIcons";

export const ItemsBlock = ({ userInfo }) => {
  const [items, setItems] = useState([
    {
      svg: svgIcons.credit_card_plus,
      text: "Initial Deposit",
      value: 0,
    },
    {
      svg: svgIcons.cash,
      text: "Total Deposit",
      value: 0,
    },
    {
      svg: svgIcons.credit_card_plus,
      text: "Withdrawn",
      value: 0,
    },
    {
      svg: svgIcons.trophy,
      text: "Refferal Rewards",
      value: 0,
    },
  ]);

  useEffect(() => {
    if (userInfo && userInfo.contractInfo) {
      let initialDeposit = Number(
        userInfo.contractInfo._initialDeposit / 10 ** 18
      ).toFixed(2);
      let totalDeposit = Number(
        userInfo.contractInfo._userDeposit / 10 ** 18
      ).toFixed(2);
      let withdrawn = Number(
        userInfo.contractInfo._totalWithdrawn / 10 ** 18
      ).toFixed(2);
      let refRewards = Number(
        userInfo.contractInfo._referrals / 10 ** 18
      ).toFixed(2);

      setItems([
        {
          svg: svgIcons.credit_card_plus,
          text: "Initial Deposit",
          value: initialDeposit,
        },
        {
          svg: svgIcons.cash,
          text: "Total Deposit",
          value: totalDeposit,
        },
        {
          svg: svgIcons.credit_card_plus,
          text: "Withdrawn",
          value: withdrawn,
        },
        {
          svg: svgIcons.trophy,
          text: "Refferal Rewards",
          value: refRewards,
        },
      ]);
    }
  }, [userInfo]);

  return (
    <div className={style.itemsBlock}>
      {items.map(({ svg, text, value }, index) => (
        <div key={index} className={style.item}>
          <div className={style.top}>
            <div className={style.icon}>{svg}</div>
            <p>{text}</p>
          </div>
          <div className={style.bottom}>
            <p>{value}</p>
            <p>$CASH</p>
          </div>
        </div>
      ))}
    </div>
  );
};
