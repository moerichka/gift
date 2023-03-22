import React, { useState } from "react";
import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe";

import useCloseModal from "hooks/modal/useCloseModal";

import ModalContainer from "../ModalContainer";

import s from "./EmailRequestModal.module.scss";

const MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL || "";

const regexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Props {
  open: boolean;
  close: () => void;
}

function EmailRequestModal({ open, close }: Props) {
  const { isClosing, onClose } = useCloseModal(close);
  const [emailText, setEmailText] = useState("");

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(e.target.value);
  };

  const onSubmit =
    (subscribe: (data: EmailFormFields) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // subscribe({ EMAIL: emailText });
    };

  return (
    <ModalContainer open={open} onClose={onClose} isClosing={isClosing}>
      <div className={s.modalWindowWrapper}>
        <div className={s.modalWindow}>
          <div className={s.summeryWrapper}>
            <div className={s.summery}>
              <div className={s.title}>Congratulations!</div>
              <button type="button" className={s.close} onClick={onClose}>
                <div className={s.iconClose}>
                  <span className={s.line} />
                  <span className={s.line} />
                </div>
              </button>
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
            </div>
            <MailchimpSubscribe
              url={MAILCHIMP_URL}
              render={({ subscribe }) => {
                return (
                  <form className={s.emailInput} onSubmit={onSubmit(subscribe)}>
                    <input
                      type="text"
                      className={s.input}
                      value={emailText}
                      onChange={onEmailChange}
                      placeholder="Enter your e-mail"
                    />
                    <button type="submit" className={s.submit}>
                      Send
                    </button>
                  </form>
                );
              }}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default EmailRequestModal;
