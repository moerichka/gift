import React, { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useContract,
  useNetwork,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { enqueueSnackbar } from "notistack";

import background from "images/background.jpg";
import backgroundMobile from "images/backgroundMobile.jpg";

import PoliciesLinks from "components/PoliciesLinks";
import ConnectWalletModal from "components/Modal/ConnectWalletModal";
import EmailRequestModal from "components/Modal/EmailRequestModal";
import NoNftModal from "components/Modal/NoNftModal";

import salesAbi from "assets/sales-abi.json";
import nftAbi from "assets/nft-abi.json";

import s from "./MainPage.module.scss";

const REACT_APP_API_ENDPOINT = "https://trace-core.flamma.app";

const SALES_CONTRACT_ADDRESS = "0x7ba75866bF445b476b1004D0e41BD1749E0cb1CF";
const NFT_CONTRACT_ADDRESS = "0x25bf876880A40b77F51F878470C9Ca1c67F7fd4a";

const CURRENT_CHAIN_ID = polygonMumbai.id; // TODO: изменить на polygon.id при релизе на продакшн

function MainPage() {
  const [isInitial, setIsInitial] = useState(true);
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [isGiftGot, setIsGiftGot] = useState(false);

  const [count, setCount] = useState<"0" | "1" | "2" | undefined>(undefined);
  const [emailRequestModalOpen, setEmailRequestModalOpen] = useState(false);
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(
    !address,
  );
  const [noNftModalOpen, setNoNftModalOpen] = useState(false);

  useEffect(() => {
    setWalletConnectModalOpen(!address);
  }, [address]);

  const nftContactInstance = useContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftAbi,
    signerOrProvider: signer,
  });

  const getNFTCount = async () => {
    if (address === undefined) throw new Error("Address does not exist");
    const response = await nftContactInstance?.balanceOf(address);
    return response?.toString(); // '0' | '1' | '2'
  };

  const isInitializing =
    address === undefined ||
    chain === undefined ||
    switchNetwork === undefined ||
    signer === undefined;

  useEffect(() => {
    if (isInitializing) return;

    const initialize = async () => {
      try {
        if (chain?.id !== CURRENT_CHAIN_ID) {
          switchNetwork(CURRENT_CHAIN_ID);
        } else {
          const nftCount = await getNFTCount();
          setCount(nftCount);
        }
      } catch (error: any) {
        enqueueSnackbar({
          variant: "trace",
          customTitle: "Error",
          customMessage: error?.message,
          type: "error",
        });
      }
    };

    initialize();
  }, [isInitializing]);

  const onGetGift = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_ENDPOINT}/gifts/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: address,
        }),
      });

      if (response.status === 400) {
        throw new Error("Hmm, there is no you're wallet address...");
      }
      if (response.status === 404) {
        throw new Error("You are not registered on Gem platform");
      }
      if (response.status === 405) {
        setIsGiftGot(true);
        throw new Error("You've already got your gift!");
      }
      if (response.ok) {
        setEmailRequestModalOpen(true);
        setIsGiftGot(true);
        return;
      }
    } catch (error: any) {
      enqueueSnackbar({
        variant: "trace",
        customTitle: "Error",
        customMessage: error?.message,
        type: "error",
      });
    }
  };
  const closeEmailModal = () => {
    setEmailRequestModalOpen(false);
  };

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    if (address) {
      enqueueSnackbar({
        variant: "trace",
        customTitle: "Congratulations!",
        customMessage: "Wallet has been connected",
        type: "correct",
      });
    }
  }, [address]);

  useEffect(() => {
    // if (isInitial) {
    //   setIsInitial(false);
    //   return;
    // }
    if (count === "0") {
      setNoNftModalOpen(true);
    }
    if (count === "1" || count === "2") {
      setNoNftModalOpen(false);
    }
  }, [count, address]);

  useEffect(() => {
    if (count && !address) {
      setCount(undefined);
    }
  }, [count, address]);

  const isButtonShown = useMemo(
    () => !isGiftGot && (count === "1" || count === "2"),
    [count, isGiftGot],
  );

  return (
    <>
      <div className={s.mainPage}>
        {isButtonShown && (
          <div className={s.buttonWrapper}>
            <button className={s.button} type="button" onClick={onGetGift}>
              Get reward
            </button>
          </div>
        )}
        <div className={s.backgroundWrapper}>
          <img
            src={background}
            alt=""
            className={`fill ${s.backgroundDesktop}`}
          />
          <img
            src={backgroundMobile}
            alt=""
            className={`fill ${s.backgroundMobile}`}
          />
        </div>
        <div className={s.footer}>
          <PoliciesLinks />
        </div>
      </div>
      <ConnectWalletModal open={walletConnectModalOpen} />
      <EmailRequestModal open={emailRequestModalOpen} close={closeEmailModal} />
      <NoNftModal open={noNftModalOpen} />
    </>
  );
}

export default MainPage;
