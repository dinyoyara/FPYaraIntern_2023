import React, { useState } from 'react';

import StyledLoginForm from './styles.css';
import { StyledTitle, StyledError } from '../../../styles.css';
import InputContainer from '../../../shared/Input';
import Button from '../../../shared/Button';
import { formInputHeight } from '../../../../styles/const';
import useCustomerContext from '../../../../context/customer/hook';

const RegisterForm = ({ goToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formIsValid, setFormIsValid] = useState(true);
    //const [fieldsErrors, setFieldsErrors] = useState({ email: '', password: '', name: '' });

    const { signupAsync, error, clearError } = useCustomerContext();

    const submitHandler = async () => {
        const isSuccessful = await signupAsync(name, email, password);
        goToLogin(isSuccessful);
    };

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        // validateField(fieldName, event.target.value);
    };

    return (
        <StyledLoginForm>
            <StyledTitle>Sign up</StyledTitle>
            {error ? <StyledError>{error}</StyledError> : null}
            <InputContainer
                height={formInputHeight}
                type='name'
                id='name'
                label='Name:'
                placeholder='Enter your name here'
                value={name}
                onChange={(e) => handleOnChange(e, setName, 'name')}
            />
            <InputContainer
                height={formInputHeight}
                type='email'
                id='email'
                label='Email:'
                placeholder='Enter your email here'
                value={email}
                onChange={(e) => handleOnChange(e, setEmail, 'email')}
            />
            <InputContainer
                height={formInputHeight}
                type='password'
                id='password'
                label='Password:'
                placeholder='Enter your password here'
                value={password}
                onChange={(e) => handleOnChange(e, setPassword, 'password')}
            />{' '}
            <Button type='button' text='Sign up' handleClick={submitHandler} active={formIsValid} />
        </StyledLoginForm>
    );
};

export default RegisterForm;
