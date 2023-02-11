import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/fireabase";

const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formFields.confirmPassword !== formFields.password) {
      alert("Password does not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password
      );
      const displayName = formFields.name;
      await createUserDocFromAuth(user, { displayName });
      alert("Account created");
      setFormFields({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        alert("Email already exists");
      console.log(`User creation error ${err}`);
    }
  };

  return (
    <div>
      <h1>Sign up using email and password</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          required
          name="name"
          value={formFields.name}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="">Email</label>
        <input
          type="email"
          required
          name="email"
          value={formFields.email}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          required
          name="password"
          value={formFields.password}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassword"
          value={formFields.confirmPassword}
          onChange={(e) => handleChange(e)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
