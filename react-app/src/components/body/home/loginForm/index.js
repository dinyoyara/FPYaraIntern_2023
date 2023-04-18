import { useState, useEffect } from 'react';

import Form from '../../../shared/Form';
import { isEmailValid } from '../helpers';
import { StyledAuthForm } from '../styles.css';
import { StyledError } from '../../../styles.css';
import { EMPTY_STRING } from '../../../../constants';
import { formInputHeight } from '../../../../styles/const';
import useCustomerContext from '../../../../context/customer/hook';

const LoginForm = () => {
    const [email, setEmail] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);

    const [formIsValid, setFormIsValid] = useState(false);
    const [fieldsErrors, setFieldsErrors] = useState({ email: EMPTY_STRING, password: EMPTY_STRING });

    const { signinAsync, clearError, error } = useCustomerContext();

    useEffect(() => {
        checkFormIsValid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password]);

    const validateField = (fieldName, value) => {
        const currentErrors = { ...fieldsErrors };
        currentErrors[fieldName] = EMPTY_STRING;
        switch (fieldName) {
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
        const validValues = fieldsErrors.email === EMPTY_STRING && fieldsErrors.password === EMPTY_STRING;
        const notEmptyValues = email !== EMPTY_STRING && password !== EMPTY_STRING;
        setFormIsValid(validValues && notEmptyValues);
    };

    const submitHandler = async () => {
        await signinAsync(email, password);
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
        <StyledAuthForm height='320px'>
            <Form inputsInfo={getFormInputs()} buttonsInfo={getFormButtons()} title='Sing in' error={error} />
            {fieldsErrors.email ? <StyledError>{fieldsErrors.email}</StyledError> : null}
            {fieldsErrors.password ? <StyledError>{fieldsErrors.password}</StyledError> : null}
        </StyledAuthForm>
    );
};

export default LoginForm;
