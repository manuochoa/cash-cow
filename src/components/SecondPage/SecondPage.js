import * as React from "react";
import style from "./SecondPage.module.scss";
import header from "../../assets/png/header.png";
import { ItemsBlock } from "./ItemsBlock/ItemsBlock";
import { svgIcons } from "../../assets/svg/svgIcons";
import clsx from "clsx";
import { useState } from "react";
import { UserBlock } from "./UserBlock/UserBlock";
import { SecondBlock } from "./SecondBlock/SecondBlock";
import { ClockBlock } from "./ClockBlock/ClockBlock";
import { Modal } from "./Modal/Modal";
import userLogo from "../../assets/png/userLogo.png";
import arrow_down from "../../assets/png/arrow_down.png";
import { toast } from "react-toastify";

const footerItems = [
  {
    icon: svgIcons.header0,
    icon_selected: svgIcons.header0_selected,
    text: "Stats",
  },
  {
    icon: svgIcons.cash,
    icon_selected: svgIcons.cash_selected,
    text: "Deposit",
  },
  {
    icon: svgIcons.header2,
    icon_selected: svgIcons.header2_selected,
    text: "Referrals",
  },
];

const userMock = {
  userLogo,
  value: "0x7c8d1c7c8d1c7c8d1csda21",
};

export const SecondPage = ({
  walletProvider,
  claimable,
  isAllowed,
  userBalance,
  userInfo,
  siteInfo,
  walletType,
  getInitialInfo,
  connectMetamask,
  connectWalletConnect,
  disconnectWallet,
  userAddress,
  investExample,
}) => {
  const [footerIndex, setFooterIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [connect, setConnect] = useState(false);
  const [wallet, setWallet] = useState("Metamask");
  const [showPopup, setShowPopup] = useState(false);

  const user = userMock;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userAddress);
    toast.success("Copied to clipboard");
  };

  return (
    <section
      className={clsx({
        [style.secondPage]: true,
        [style.secondPage_no_scroll]: show,
      })}
    >
      {show && (
        <Modal
          connectMetamask={connectMetamask}
          connectWalletConnect={connectWalletConnect}
          onClose={() => setShow(false)}
          onConnect={(wallet) => {
            setConnect(true);
            setWallet(wallet);
          }}
        />
      )}

      <header className={style.header}>
        <div className={style.logo}>
          <img src={header} alt="" />
          <p>Cash Cow</p>
        </div>

        <div className={style.btnWrapper}>
          <button
            className={clsx({
              [style.btn]: true,
              [style.btn_connected]: connect,
            })}
            onClick={
              //userAddress
              //</div>  ? disconnectWallet
              // :
              () => {
                if (userAddress) {
                  setShowPopup(!showPopup);
                } else {
                  setShow(true);
                }
              }
            }
          >
            {userAddress ? (
              <div className={style.inner}>
                <img src={user.userLogo} alt="" className={style.logo} />
                <p>{userAddress}</p>
                <img src={arrow_down} alt="" className={style.arrow} />
              </div>
            ) : (
              <span className={style.textNotConnect}>Connect Wallet</span>
            )}
          </button>

          {showPopup && (
            <div className={style.popup}>
              <div className={style.row}>
                <p>Account</p>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    disconnectWallet();
                  }}
                >
                  Disconnect
                </button>
              </div>

              <div className={style.bottom}>
                <img src={user.userLogo} alt="" className={style.logo} />
                <div className={style.texts}>
                  <p>{userAddress}</p>
                  <p>{wallet}</p>
                </div>
                <div className={style.icons}>
                  {/* <a>{svgIcons.union}</a> */}
                  <button onClick={copyToClipboard}>{svgIcons.union}</button>
                  <a
                    href={`https://bscscan.com/address/${userAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {svgIcons.copy}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className={style.mobile}>
        {/* <UserBlock /> */}
        <div className={style.content}>
          {footerIndex === 0 && (
            <ItemsBlock
              claimable={claimable}
              userBalance={userBalance}
              userInfo={userInfo}
            />
          )}
          {footerIndex === 1 && (
            <SecondBlock
              walletProvider={walletProvider}
              userBalance={userBalance}
              claimable={claimable}
              userAddress={userAddress}
              setShow={setShow}
              isAllowed={isAllowed}
              investExample={investExample}
              getInitialInfo={getInitialInfo}
              walletType={walletType}
              userInfo={userInfo}
            />
          )}
          {footerIndex === 2 && (
            <ClockBlock
              claimable={claimable}
              getInitialInfo={getInitialInfo}
              walletProvider={walletProvider}
              walletType={walletType}
              userInfo={userInfo}
            />
          )}
        </div>
      </div>

      <div className={style.desktop}>
        <ItemsBlock
          claimable={claimable}
          userBalance={userBalance}
          userInfo={userInfo}
        />
        {/* <UserBlock className={style.userBlock} /> */}
        <div className={style.doubleBlock}>
          <SecondBlock
            walletProvider={walletProvider}
            userBalance={userBalance}
            userAddress={userAddress}
            setShow={setShow}
            isAllowed={isAllowed}
            investExample={investExample}
            getInitialInfo={getInitialInfo}
            walletType={walletType}
            userInfo={userInfo}
          />
          <ClockBlock
            walletProvider={walletProvider}
            claimable={claimable}
            getInitialInfo={getInitialInfo}
            walletType={walletType}
            userInfo={userInfo}
          />
        </div>
      </div>

      <footer className={style.footer}>
        {footerItems.map(({ icon, icon_selected, text }, index) => (
          <div
            key={index}
            className={clsx({
              [style.item]: true,
              [style.item_selected]: index === footerIndex,
            })}
            onClick={() => setFooterIndex(index)}
          >
            <div className={style.icon}>
              {index === footerIndex ? icon_selected : icon}
            </div>

            <p>{text}</p>
          </div>
        ))}
      </footer>
    </section>
  );
};
