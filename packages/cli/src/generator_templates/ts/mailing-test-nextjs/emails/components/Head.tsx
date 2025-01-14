// import { resolve } from "path";
import React, { ReactChild } from "react";
import { MjmlHead, MjmlFont, MjmlAttributes, MjmlAll } from "mjml-react";

type HeadProps = { children: ReactChild };

const Head: React.FC<HeadProps> = ({ children }) => {
  return (
    <MjmlHead>
      <MjmlFont
        name="Inter"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900"
      />
      <MjmlAttributes>
        <MjmlAll font-family="Inter" />
      </MjmlAttributes>
      {children}
    </MjmlHead>
  );
};

export default Head;
