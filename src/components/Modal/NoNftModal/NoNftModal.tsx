import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";

import useCloseModal from "hooks/modal/useCloseModal";

import metamaskImg from "images/metamask.svg";

import ModalContainer from "../ModalContainer";

import s from "./NoNftModal.module.scss";

interface Props {
  open: boolean;
  close?: () => void;
}

function NoNftModal({ open, close = undefined }: Props) {
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
              <div className={s.title}>No NFT Pass yet</div>
            </div>
          </div>
          <div className={s.content}>
            <div className={s.textBlock}>
              <p>
                Oops, there is no NFT Pass in your wallet. Please get an NFT
                Pass on OpenSea to receive your gift.
              </p>
            </div>
            <a
              href="https://opensea.io/collection/trace-genesis-nft-pass"
              className={s.button}
            >
              OpenSea
            </a>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default NoNftModal;
