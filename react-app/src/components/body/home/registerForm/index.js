import React, { useState, useEffect } from 'react';

import Form from '../../../shared/Form';
import { isEmailValid } from '../helpers';
import { StyledAuthForm } from '../styles.css';
import { StyledError } from '../../../styles.css';
import { EMPTY_STRING } from '../../../../constants';
import { formInputHeight } from '../../../../styles/const';
import useCustomerContext from '../../../../context/customer/hook';

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

    // SET FORM ELEMENTS
    const getFormInputs = () => {
        return [
            {
                id: 'name',
                type: 'text',
                value: name,
                label: 'Name:',
                placeholder: 'Enter your name here',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setName, 'name')
            },
            {
                id: 'email',
                type: 'text',
                value: email,
                label: 'Email:',
                placeholder: 'Enter your email here',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setEmail, 'email')
            },
            {
                id: 'password',
                type: 'password',
                value: password,
                label: 'Password:',
                placeholder: 'Enter your password here',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setPassword, 'password')
            }
        ];
    };

    const getFormButtons = () => {
        return [
            {
                text: 'Sing in',
                type: 'button',
                active: formIsValid,
                handleClick: submitHandler
            }
        ];
    };

    return (
        <StyledAuthForm height='400px'>
            <Form inputsInfo={getFormInputs()} buttonsInfo={getFormButtons()} title='Sing up' error={error} />
            {fieldsErrors.name ? <StyledError>{fieldsErrors.name}</StyledError> : null}
            {fieldsErrors.email ? <StyledError>{fieldsErrors.email}</StyledError> : null}
            {fieldsErrors.password ? <StyledError>{fieldsErrors.password}</StyledError> : null}
        </StyledAuthForm>
    );
};

export default RegisterForm;
