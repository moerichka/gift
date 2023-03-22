import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";

import useCloseModal from "hooks/modal/useCloseModal";

import metamaskImg from "images/metamask.svg";

import ModalContainer from "../ModalContainer";

import s from "./ConnectWalletModal.module.scss";

interface Props {
  open: boolean;
  close?: () => void;
}

function ConnectWalletModal({ open, close = undefined }: Props) {
  const { isClosing, onClose } = useCloseModal(close);
  const [userInfo, setUserInfo] = useState("");

  const { open: openWalletConnect } = useWeb3Modal();

  const userInfoChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInfo(e.target.value);
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInfo) {
      return;
    }

    onClose();
  };

  return (
    <ModalContainer
      open={open}
      onClose={close ? onClose : () => {}}
      isClosing={isClosing}
    >
      <div className={s.modalWindowWrapper}>
        <div className={s.modalWindow}>
          <div className={s.summeryWrapper}>
            <div className={s.summery}>
              <div className={s.title}>HOW IT WORKS?</div>
            </div>
          </div>
          <div className={s.content}>
            <div className={s.title}>Referral request form</div>
            <div className={s.textBlock}>
              <p>
                The Trace referral system is designed for influencers around the
                world. Bring value and get rewarded! Apply by telling us about
                yourself and your amazing experience:
              </p>
              <p>
                The Trace referral system is designed for influencers around the
                world. Bring value and get rewarded! Apply by telling us about
                yourself and your amazing experience:
              </p>
            </div>
            <button
              type="button"
              className={s.button}
              onClick={() => openWalletConnect()}
            >
              <img src={metamaskImg} alt="" className={s.icon} />
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ConnectWalletModal;
