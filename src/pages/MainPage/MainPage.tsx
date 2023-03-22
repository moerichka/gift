import React, { useState } from "react";

import background from "images/background.jpg";

import PoliciesLinks from "components/PoliciesLinks";
import ConnectWalletModal from "components/Modal/ConnectWalletModal";

import s from "./MainPage.module.scss";

function MainPage() {
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(true);

  return (
    <>
      <div className={s.mainPage}>
        <div className={s.buttonWrapper}>
          <button className={s.button} type="button">
            Get reward
          </button>
        </div>
        <div className={s.backgroundWrapper}>
          <img src={background} alt="" className="fill" />
        </div>
        <div className={s.footer}>
          <PoliciesLinks />
        </div>
      </div>
      <ConnectWalletModal open={walletConnectModalOpen} />
    </>
  );
}

export default MainPage;
