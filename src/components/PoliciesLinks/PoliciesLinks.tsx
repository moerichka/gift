import React from "react";

import s from "./PoliciesLinks.module.scss";

interface Props {
  className?: string;
  classNameLink?: string;
}

function PoliciesLinks({ className = "", classNameLink = "" }: Props) {
  return (
    <div className={`${s.policiesLinks} ${className}`}>
      <a
        href="https://mixr.gitbook.io/ru/mixr/legal/terms"
        className={`${s.link} ${classNameLink}`}
      >
        Terms of use
      </a>
      <a
        href="https://mixr.gitbook.io/en/mixr/legal/cookie"
        className={`${s.link} ${classNameLink}`}
      >
        Сookie policy
      </a>
      <a
        href="https://mixr.gitbook.io/en/mixr/legal/privacy"
        className={`${s.link} ${classNameLink}`}
      >
        Privacy policy
      </a>
    </div>
  );
}

export default PoliciesLinks;
