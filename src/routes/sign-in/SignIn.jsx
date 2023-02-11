import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import "./sign-in.styles.scss";
import {
  auth,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/fireabase";

const SignIn = () => {
  useEffect(() => {
    getRedirectRes();
  }, []);

  const getRedirectRes = async () => {
    const res = await getRedirectResult(auth);
    console.log(res);
  };

  const signInWithGoogle = async () => {
    const res = await signInWithGooglePopup();
    console.log(res);
    await createUserDocFromAuth(res.user);
  };

  const logInWithRedirect = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logInWithRedirect}>Log In With Redirect</button>
    </div>
  );
};

export default SignIn;
