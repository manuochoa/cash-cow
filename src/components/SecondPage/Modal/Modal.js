import * as React from "react";
import { FC, useState } from "react";
import style from "./Modal.module.scss";
import { svgIcons } from "../../../assets/svg/svgIcons";
import btnSrc1 from "../../../assets/png/metamask.png";
import btnSrc2 from "../../../assets/png/wallet.png";
import clsx from "clsx";

export const Modal = ({
  connectMetamask,
  connectWalletConnect,
  onClose,
  onConnect,
}) => {
  const [wallet, setWallet] = useState("Metamask");

  return (
    <div className={style.modal}>
      <div className={style.content}>
        <button className={style.close} onClick={onClose}>
          {svgIcons.close}
        </button>

        <p className={style.title}>Connect Wallet</p>
        <p className={style.text}>Please select your provider</p>

        <div className={style.buttons}>
          <div
            className={clsx({
              [style.btn]: true,
              [style.btn_selected]: wallet === "Metamask",
            })}
            onClick={() => {
              connectMetamask();
              onClose();
            }}
          >
            <img src={btnSrc1} alt="" />
            <p>Metamask</p>
          </div>

          <div
            className={clsx({
              [style.btn]: true,
              [style.btn_selected]: wallet === "WalletConnect",
            })}
            onClick={() => {
              connectWalletConnect();
              onClose();
            }}
          >
            <img src={btnSrc2} alt="" />
            <p>WalletConnect</p>
          </div>
        </div>

        <button
          className={style.closeBtn}
          onClick={() => {
            onConnect(wallet);
          }}
        >
          Connect
        </button>
      </div>
    </div>
  );
};
