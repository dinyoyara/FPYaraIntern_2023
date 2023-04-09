import React, { useState } from 'react';

import StyledLoginForm from './styles.css';
import { StyledTitle, StyledError } from '../styles.css';
import { formInputHeight } from '../../../../styles/const';
import InputContainer from '../../../shared/Input';
import Button from '../../../shared/Button';
import useCustomerContext from '../../../../context/customer/hook';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formIsValid, setFormIsValid] = useState(true);
    //const [fieldsErrors, setFieldsErrors] = useState({ email: '', password: '' });

    const { signinAsync, clearError, error } = useCustomerContext();

    const submitHandler = async () => {
        await signinAsync(email, password);
    };

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        // validateField(fieldName, event.target.value);
    };

    return (
        <StyledLoginForm>
            <StyledTitle>Signin</StyledTitle>
            {error ? <StyledError>{error}</StyledError> : null}
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
            <Button type='button' text='Signin' handleClick={submitHandler} active={formIsValid} />
        </StyledLoginForm>
    );
};

export default LoginForm;
