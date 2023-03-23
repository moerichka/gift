import React, { useState } from "react";
import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe";
import { enqueueSnackbar } from "notistack";

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
      if (!emailText.match(regexp)) {
        enqueueSnackbar({
          variant: "trace",
          customTitle: "Error",
          customMessage: "Email is not valid",
          type: "error",
        });
        return;
      }
      // subscribe({ EMAIL: emailText });

      enqueueSnackbar({
        variant: "trace",
        customTitle: "Email has been sended!",
        customMessage: "Stay tuned for updates!",
        type: "correct",
      });
      onClose();
    };

  return (
    <ModalContainer open={open} onClose={() => {}} isClosing={isClosing}>
      <div className={s.modalWindowWrapper}>
        <div className={s.modalWindow}>
          <div className={s.summeryWrapper}>
            <div className={s.summery}>
              <div className={s.title}>Congratulations!</div>
              {/* <button type="button" className={s.close} onClick={onClose}>
                <div className={s.iconClose}>
                  <span className={s.line} />
                  <span className={s.line} />
                </div>
              </button> */}
            </div>
          </div>
          <div className={s.content}>
            <div className={s.textBlock}>
              <p>
                Hooray! You successfully received the gift! To see it, please
                sign up on our Gem platform. We will launch it soon. Stay tuned
                for updates!
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
