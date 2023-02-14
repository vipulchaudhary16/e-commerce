import React, { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
} from "../../utils/firebase/fireabase";
import Button from "../button/Button";
import FormInput from "../form-component/FormInput";
import './sign-up-form.styles.scss'

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
		<div className="sign-up-container">
			<h2>Don't have an account</h2>
			<span>Sign up using email and password</span>
			<form method="post" onSubmit={handleSubmit}>
				<FormInput
					label="Name"
					type="text"
					required
					name="name"
					value={formFields.name}
					onChange={(e) => handleChange(e)}
				/>

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

				<FormInput
					label="Confirm Password"
					type="password"
					required
					name="confirmPassword"
					value={formFields.confirmPassword}
					onChange={(e) => handleChange(e)}
				/>

				<Button type='submit' >Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
