import React from "react";
import "./sign-in.styles.scss";
import { createUserDocFromAuth, signInWithGooglePopup } from "../../utils/firebase/fireabase";

const SignIn = () => {
  const logGoogleUser = async () => {
    const res = await signInWithGooglePopup();
    console.log(res);
    await createUserDocFromAuth(res.user)
  };

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
