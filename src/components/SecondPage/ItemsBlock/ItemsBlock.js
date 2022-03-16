import React, { useState, useEffect } from "react";
import style from "./ItemsBlock.module.scss";
import { svgIcons } from "../../../assets/svg/svgIcons";

export const ItemsBlock = ({ userInfo, userBalance }) => {
  const [items, setItems] = useState([
    {
      svg: svgIcons.credit_card_plus,
      text: "Balance",
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
    if (userInfo) {
      let balance = Number(userBalance / 10 ** 18).toFixed(2);
      let totalDeposit = Number(userInfo.deposits / 10 ** 18).toFixed(2);
      let withdrawn = Number(userInfo.payouts / 10 ** 18).toFixed(2);
      let refRewards = Number(userInfo.match_bonus / 10 ** 18).toFixed(2);

      setItems([
        {
          svg: svgIcons.credit_card_plus,
          text: "Balance",
          value: balance,
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
