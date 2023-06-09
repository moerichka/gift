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
              <div className={s.title}>Connect your wallet!</div>
            </div>
          </div>
          <div className={s.content}>
            <div className={s.textBlock}>
              <p>
                Hello, tracer! So great to see you here! To receive the gift,
                please connect your MetaMask wallet so we can verify your NFT
                Pass.
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
