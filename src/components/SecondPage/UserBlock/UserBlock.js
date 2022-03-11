import * as React from "react";
import { svgIcons } from "../../../assets/svg/svgIcons";
import style from "./UserBlock.module.scss";
import copy from "../../../assets/png/copy.png";
import { FC } from "react";
import clsx from "clsx";

export const UserBlock = ({ className }) => {
  return (
    <div className={clsx(style.userBlock, className && className)}>
      <div className={style.left}>
        <div className={style.user}>{svgIcons.user_plus}</div>
        <p>Earn 0% when someone uses your referral link! </p>
      </div>

      <img src={copy} alt="" className={style.copy} />
    </div>
  );
};
