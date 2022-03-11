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

const footerItems = [
  {
    icon: svgIcons.header0,
    icon_selected: svgIcons.header0_selected,
    text: "Stats",
  },
  {
    icon: svgIcons.header1,
    icon_selected: svgIcons.header1_selected,
    text: "Mining",
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
  userInfo,
  siteInfo,
  walletType,
  getInitialInfo,
}) => {
  const [footerIndex, setFooterIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [connect, setConnect] = useState(false);
  const [wallet, setWallet] = useState("Metamask");
  const [showPopup, setShowPopup] = useState(false);

  const user = userMock;

  return (
    <section
      className={clsx({
        [style.secondPage]: true,
        [style.secondPage_no_scroll]: show,
      })}
    >
      {show && (
        <Modal
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
            onClick={() => {
              if (connect) {
                setShowPopup(!showPopup);
              } else {
                setShow(true);
              }
            }}
          >
            {connect ? (
              <div className={style.inner}>
                <img src={user.userLogo} alt="" className={style.logo} />
                <p>{user.value}</p>
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
                    setConnect(false);
                  }}
                >
                  Disconnect
                </button>
              </div>

              <div className={style.bottom}>
                <img src={user.userLogo} alt="" className={style.logo} />
                <div className={style.texts}>
                  <p>{user.value}</p>
                  <p>{wallet}</p>
                </div>
                <div className={style.icons}>
                  <div>{svgIcons.union}</div>
                  <div>{svgIcons.copy}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className={style.mobile}>
        <UserBlock />
        <div className={style.content}>
          {footerIndex === 0 && <ItemsBlock userInfo={userInfo} />}
          {footerIndex === 1 && (
            <SecondBlock
              getInitialInfo={getInitialInfo}
              walletType={walletType}
              userInfo={userInfo}
            />
          )}
          {footerIndex === 2 && <ClockBlock userInfo={userInfo} />}
        </div>
      </div>

      <div className={style.desktop}>
        <ItemsBlock userInfo={userInfo} />
        <UserBlock className={style.userBlock} />
        <div className={style.doubleBlock}>
          <SecondBlock
            getInitialInfo={getInitialInfo}
            walletType={walletType}
            userInfo={userInfo}
          />
          <ClockBlock userInfo={userInfo} />
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
