import React, { useState, useEffect } from "react";
import style from "./ClockBlock.module.scss";
import clock from "../../../assets/png/clock.png";
import { svgIcons } from "../../../assets/svg/svgIcons";
import clsx from "clsx";
import { changeReferral, checkDeposit } from "../../../blockchain/functions";
import { toast } from "react-toastify";

let marketingWallet = "0x14B97888B5Ee06413856dc05B1b0D8438e71994d";

export const ClockBlock = ({
  claimable,
  userInfo,
  getInitialInfo,
  walletProvider,
  walletType,
}) => {
  const [miners, setMiners] = useState("");
  const [busdBalance, setBusdBalance] = useState("");
  const [eggYield, setEggYield] = useState("");
  const [availableEarnings, setAvailbleEarnings] = useState("");
  const [userHasDeposits, setUserHasDeposit] = useState(false);
  const [refAddress, setRefAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    setIsLoading(true);
    let hasDeposit = await checkDeposit(refAddress);
    if (!hasDeposit) {
      setIsLoading(false);
      return toast.error("Ref should be an address with active deposits");
    }
    let receipt = await changeReferral(refAddress, walletType, walletProvider);
    if (receipt) {
      console.log(receipt);
      toast.success("Transaction Sent Succesfully!");
      getInitialInfo();
    }
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    if (userInfo && userInfo.deposits) {
      setUserHasDeposit(userInfo.deposits > 0);
    }
  }, [userInfo]);

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
      {userHasDeposits && (
        <>
          <div className={clsx(style.field, style.field_second)}>
            <p className={style.left}>Change Referral</p>
            <p className={style.right}>
              <input
                type="text"
                className={style.address}
                value={refAddress}
                placeholder="New Address"
                onChange={(e) => {
                  setRefAddress(e.target.value);
                }}
                onPaste={(e) => {
                  setRefAddress(e.target.value);
                }}
              />
            </p>
          </div>
          <div className={clsx(style.field, style.field_second)}>
            <button
              onClick={handleChange}
              className={isLoading ? style.bottomLoading : style.bottom}
            >
              Change
            </button>
          </div>
        </>
      )}

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
