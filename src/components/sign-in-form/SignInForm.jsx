import React, { useState } from "react";
import { createUserDocFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/fireabase";

import Button, { BUTTON_TYPE_CLASSES } from "../button/Button";
import FormInput from "../form-component/FormInput";
import './sign-in-form.styles.scss'
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

const SignInForm = () => {

	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
	});

	const dispatch = useDispatch()


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(emailSignInStart(formFields.email, formFields.password ))
		} catch (err) {
			console.log(`sign in error ${err}`)
			if (err.code === 'auth/wrong-password') alert("Wrong credentials ")
			else if (err.code === 'auth/user-not-found') alert('User does not exists')
		}
	};

	const signInWithGoogle = () => {
		dispatch(googleSignInStart())
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account</h2>
			<span>Sign in using email and password</span>
			<form method="post" onSubmit={handleSubmit}>

				<FormInput
					label="Email"
					type="email"
					required
					name="email"
					value={formFields.email}
					onChange={(e) => handleChange(e)}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					name="password"
					value={formFields.password}
					onChange={(e) => handleChange(e)}
				/>

				<div className="buttons-container">
					<Button type='submit' >Sign In</Button>
					<Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}  >Sign In Google</Button>
				</div>

			</form>
		</div>
	);
};

export default SignInForm;
