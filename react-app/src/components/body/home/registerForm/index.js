import React, { useState, useEffect } from 'react';

import StyledLoginForm from './styles.css';
import { StyledTitle, StyledError } from '../../../styles.css';
import InputContainer from '../../../shared/Input';
import Button from '../../../shared/Button';
import { formInputHeight } from '../../../../styles/const';
import useCustomerContext from '../../../../context/customer/hook';
import { EMPTY_STRING } from '../../../../constants';
import { isEmailValid } from '../helpers';

const RegisterForm = ({ goToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);
    const [fieldsErrors, setFieldsErrors] = useState({ email: '', password: '', name: '' });

    const { signupAsync, error, clearError } = useCustomerContext();

    useEffect(() => {
        checkFormIsValid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, email, password]);

    const validateField = (fieldName, value) => {
        const currentErrors = { ...fieldsErrors };
        currentErrors[fieldName] = '';
        switch (fieldName) {
            case 'name':
                if (value.length < 2) currentErrors[fieldName] = `name should be more that 1 symbols`;
                break;
            case 'email':
                if (!isEmailValid(value)) currentErrors[fieldName] = `invalid email address`;
                break;
            case 'password':
                if (value.length < 5) currentErrors[fieldName] = `password should be more that 5 symbols`;
                break;
            default:
                break;
        }
        setFieldsErrors(currentErrors);
    };

    const checkFormIsValid = () => {
        const validValues = fieldsErrors.email === '' && fieldsErrors.password === '' && fieldsErrors.name === '';
        const notEmptyValues = email !== EMPTY_STRING && password !== EMPTY_STRING && name !== EMPTY_STRING;
        setFormIsValid(validValues && notEmptyValues);
    };

    const submitHandler = async () => {
        const isSuccessful = await signupAsync(name, email, password);
        goToLogin(isSuccessful);
    };

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        validateField(fieldName, event.target.value);
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
            {fieldsErrors.name ? <StyledError>{fieldsErrors.name}</StyledError> : null}
            {fieldsErrors.email ? <StyledError>{fieldsErrors.email}</StyledError> : null}
            {fieldsErrors.password ? <StyledError>{fieldsErrors.password}</StyledError> : null}
        </StyledLoginForm>
    );
};

export default RegisterForm;
