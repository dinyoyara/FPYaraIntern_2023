import React, { useState } from 'react';

import StyledLoginForm from './styles.css';
import { StyledTitle } from '../styles.css';
import InputContainer from '../../../shared/Input';
import Button from '../../../shared/Button';
import { formInputHeight } from '../../../../styles/const';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);
    //const [fieldsErrors, setFieldsErrors] = useState({ email: '', password: '', name: '' });

    const submitHandler = () => {
        console.log('signup');
    };

    return (
        <StyledLoginForm>
            <StyledTitle>Signup</StyledTitle>
            <InputContainer
                height={formInputHeight}
                type='name'
                id='name'
                label='Name:'
                placeholder='Enter your name here'
                value={name}
                onChange={(e) => {
                    e.persist();
                    setName(e.target.value);
                    // validateField('firstName', e.target.value);
                }}
            />
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
            <Button type='button' text='Signup' handleClick={submitHandler} active={formIsValid} />
        </StyledLoginForm>
    );
};

export default RegisterForm;
