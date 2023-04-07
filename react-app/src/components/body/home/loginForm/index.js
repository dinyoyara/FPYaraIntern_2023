import React, { useState } from 'react';

import StyledLoginForm from './styles.css';
import InputContainer from '../../../shared/Input';
import Button from '../../../shared/Button';
import { formINputHeight } from '../../../../styles/const';
import { StyledTitle } from '../styles.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);
    //const [fieldsErrors, setFieldsErrors] = useState({ email: '', password: '' });

    const submitHandler = () => {
        console.log('signin');
    };

    return (
        <StyledLoginForm>
            <StyledTitle>Signin</StyledTitle>
            <InputContainer
                height={formINputHeight}
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
                height={formINputHeight}
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
