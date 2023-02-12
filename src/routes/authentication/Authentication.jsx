import { useEffect } from "react";
import SignUpForm from "../../components/sign-up-form/SignUpForm";
import SignInForm from "../../components/sign-in-form/SignInForm";

import './authentication.styles.scss'

const Authentication = () => {
  useEffect(() => { }, []);
  return (
    <div className="authentication-container" >
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
