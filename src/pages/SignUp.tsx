import React from "react";
import "./SignUp.css";

interface Props {
  authUrl: string;
}

const SignIn: React.FC<Props> = ({ authUrl }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <a className="auth-button" href={authUrl}>
          <img style={{ height: "26px" }} src="/icon-google.png"></img>
          <span style={{ textAlign: "center" }}>Conectare cu Google</span>
        </a>
        <p>
          Magna eiusmod culpa enim sit esse est ut nostrud do excepteur et
          proident enim eiusmod.
        </p>
        <p>
          Magna eiusmod culpa enim sit esse est ut nostrud do excepteur et
          proident enim eiusmod. Magna eiusmod culpa enim sit esse{" "}
          <a href="/terms">Termeni si conditii</a> si{" "}
          <a href="/gdpr">Politica GDPR</a> ut nostrud do excepteur et proident
          enim eiusmod.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
