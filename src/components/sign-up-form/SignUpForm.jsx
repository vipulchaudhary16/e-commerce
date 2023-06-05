import React, { useState } from 'react';
import Button from '../button/Button';
import FormInput from '../form-component/FormInput';
import './sign-up-form.styles.scss';
import { signUpStart } from '../../store/user/user.action';
import { useDispatch } from 'react-redux';

const SignUpForm = () => {
	const [formFields, setFormFields] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formFields.confirmPassword !== formFields.password) {
			alert('Password does not match');
			return;
		}

		const { name, email, password } = formFields;
		dispatch(signUpStart(name, email, password));
		setFormFields({
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account</h2>
			<span>Sign up using email and password</span>
			<form method='post' onSubmit={handleSubmit}>
				<FormInput
					label='Name'
					type='text'
					required
					name='name'
					value={formFields.name}
					onChange={(e) => handleChange(e)}
				/>

				<FormInput
					label='Email'
					type='email'
					required
					name='email'
					value={formFields.email}
					onChange={(e) => handleChange(e)}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					name='password'
					value={formFields.password}
					onChange={(e) => handleChange(e)}
				/>

				<FormInput
					label='Confirm Password'
					type='password'
					required
					name='confirmPassword'
					value={formFields.confirmPassword}
					onChange={(e) => handleChange(e)}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
