import { useEffect, useState } from "react";

import "./sign-in.styles.scss";
import {
  createUserDocFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/fireabase";
import SignUpForm from "../../components/sign-up-form/SignUpForm";

const SignIn = () => {
  

  useEffect(() => {}, []);

  const signInWithGoogle = async () => {
    const res = await signInWithGooglePopup();
    console.log(res);
    await createUserDocFromAuth(res.user);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
