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

    const { signin, customer, error } = useCustomerContext();

    const submitHandler = async () => {
        await signin(email, password);
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
                onChange={(e) => {
                    e.persist();
                    setEmail(e.target.value);
                    // validateField('firstName', e.target.value);
                }}
            />
            <InputContainer
                height={formInputHeight}
                type='password'
                id='password'
                label='Password:'
                placeholder='Enter your password here'
                value={password}
                onChange={(e) => {
                    e.persist();
                    setPassword(e.target.value);
                    // validateField('firstName', e.target.value);
                }}
            />{' '}
            <Button type='button' text='Signin' handleClick={submitHandler} active={formIsValid} />
        </StyledLoginForm>
    );
};

export default LoginForm;
