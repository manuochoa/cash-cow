import React, { useState, useEffect } from "react";
import style from "./SecondBlock.module.scss";
import clsx from "clsx";
import enlarge from "../../../assets/png/enlarge.png";
import { svgIcons } from "../../../assets/svg/svgIcons";
import {
  deposit,
  claim,
  roll,
  approveToken,
} from "../../../blockchain/functions";

export const SecondBlock = ({
  setShow,
  userAddress,
  isAllowed,
  getInitialInfo,
  userInfo,
  walletType,
  investExample,
}) => {
  const [busdBalance, setBusdBalance] = useState("");
  const [busdApproved, setBusdApproved] = useState("");
  const [number1, setNumber1] = useState(10);
  const [number2, setNumber2] = useState(10);
  const [refAddress, setRefAddress] = useState("");

  const handleBuy = async () => {
    if (refAddress === "") {
      return window.alert("Please use a valid Referral Address");
    }
    let receipt = await deposit(refAddress, number2, walletType);
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

  const handleRoll = async () => {
    let receipt = await roll(walletType);
    if (receipt) {
      console.log(receipt);
      getInitialInfo();
    }
  };

  const handleApprove = async () => {
    console.log("approve");
    let receipt = await approveToken(walletType);
    if (receipt) {
      console.log(receipt);
      getInitialInfo();
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.allowance) {
      let allowance = userInfo.allowance / 10 ** 18;
      let balance = userInfo.balance / 10 ** 18;

      setBusdApproved(allowance);
      setBusdBalance(balance);
      console.log("inside clock block", userInfo.allowance.toString(), {
        userInfo,
      });
    }
  }, [userInfo]);

  return (
    <div className={style.secondBlock}>
      {/* <div className={clsx(style.field, style.row)}>
        <input type="text" placeholder="Your Wallet:" className={style.left} />

        <p className={style.right}>
          <span className={style.green}>{busdBalance}</span>
          <span> $CASH</span>
        </p>
      </div> */}

      {/* <div className={clsx(style.field, style.secondField)}>
        <div className={clsx(style.row, style.topRow)}>
          <p className={style.left}>Investment Example:</p>
          <p className={style.right}>
            <span className={style.green}>500</span>
            <span> $CASH</span>
          </p>
        </div>

        <div className={style.row}>
          <p className={style.left}>Daily Yield:</p>
          <p className={style.right}>
            <span className={style.green}>
              {investExample[1] &&
                Number(investExample[1] / 10 ** 18).toFixed(2)}
            </span>
            <span> $CASH = </span>
            <span className={style.green}>
              {investExample[0] && Number(investExample[0])}
            </span>
            <span> Miners</span>
          </p>
        </div>
      </div> */}

      {/* <div className={style.titleField}>
        <p>Approve $CASH</p>
        <p>({busdApproved} $CASH approved)</p>
      </div> */}
      {/* 
      <div className={style.numberField}>
        <div className={style.top}>
          <input
            type="number"
            className={style.number}
            value={number1}
            onChange={(e) => {
              setNumber1(Number(e.target.value));
            }}
          />

          <div className={style.right}>
            <p>MAX</p>
            <div className={style.arrow_buttons}>
              <button
                className={style.btn}
                onClick={() => setNumber1(number1 + 1)}
              >
                {svgIcons.arrow_up}
              </button>
              <button
                className={style.btn}
                onClick={() => setNumber1(number1 - 1)}
              >
                {svgIcons.arrow_down}
              </button>
            </div>
          </div>
        </div>

        <div onClick={handleApprove} className={style.bottom}>
          Approve
        </div>
      </div> */}

      <div className={style.titleField}>
        <p>Deposit $CASH</p>
        {/* <p>(30.000 max)</p> */}
      </div>

      <div className={style.numberField}>
        <div className={style.top}>
          {/*<p className={style.number}>10</p>*/}

          <input
            type="text"
            className={style.number}
            value={refAddress}
            placeholder="Referral Address"
            onChange={(e) => {
              setRefAddress(e.target.value);
            }}
            onPaste={(e) => {
              setRefAddress(e.target.value);
            }}
          />
        </div>
        <div className={style.top}>
          {/*<p className={style.number}>10</p>*/}

          <input
            type="number"
            className={style.number}
            value={number2}
            onChange={(e) => {
              setNumber2(Number(e.target.value));
            }}
          />

          <div className={style.right}>
            {/* <p>MAX</p> */}
            <div className={style.arrow_buttons}>
              <button
                className={style.btn}
                onClick={() => setNumber2(number2 + 1)}
              >
                {svgIcons.arrow_up}
              </button>
              <button
                className={style.btn}
                onClick={() => setNumber2(number2 - 1)}
              >
                {svgIcons.arrow_down}
              </button>
            </div>
          </div>
        </div>

        <div
          onClick={
            !userAddress
              ? () => setShow(true)
              : isAllowed
              ? handleBuy
              : handleApprove
          }
          className={style.bottom}
        >
          {isAllowed ? "Deposit" : "Approve"}
        </div>
      </div>
      <div className={style.titleField}>
        <p>Options</p>
        {/* <p>(30.000 max)</p> */}
      </div>

      <div className={style.numberField}>
        <div
          onClick={!userAddress ? () => setShow(true) : handleRoll}
          className={style.bottom}
        >
          Compound
        </div>
      </div>
      <div className={style.numberField}>
        <div
          onClick={!userAddress ? () => setShow(true) : handleClaim}
          className={style.bottom}
        >
          Claim
        </div>
      </div>
    </div>
  );
};
