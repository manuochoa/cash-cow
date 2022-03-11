import React, { useState, useEffect } from "react";
import style from "./ClockBlock.module.scss";
import clock from "../../../assets/png/clock.png";
import { svgIcons } from "../../../assets/svg/svgIcons";
import clsx from "clsx";
import { hatchEggs } from "../../../blockchain/functions";

export const ClockBlock = ({ userInfo }) => {
  const [miners, setMiners] = useState("");
  const [busdBalance, setBusdBalance] = useState("");

  useEffect(() => {
    console.log("inside clock block", {
      userInfo,
    });
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
          <span>BUSD</span>
        </p>
      </div>

      <div className={clsx(style.field, style.field_first)}>
        <p className={style.left}>Est. Daily Yield:</p>
        <p className={style.right}>
          <span className={style.green}>500</span>
          <span> BUSD</span>
        </p>
      </div>

      <div className={clsx(style.field, style.field_second)}>
        <p className={style.left}>Est. Daily Yield:</p>
        <p className={style.right}>
          <span>00:00:00:00</span>
        </p>
      </div>

      <div className={style.buttons}>
        <button className={style.firstBtn}>
          <p>
            <span>Withdraw in 00:00:00:00 </span>
            <span>(-40% Tax)</span>
          </p>
        </button>
        <button onClick={() => hatchEggs("")} className={style.secondBtn}>
          Compound (+12% Bonus)
        </button>
      </div>
    </div>
  );
};
