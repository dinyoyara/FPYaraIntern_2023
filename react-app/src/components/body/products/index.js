import { useState, useEffect } from 'react';

import { formInputHeight } from '../../../styles/const';
import {
    HAZARDOUS,
    NON_HAZARDOUS,
    EMPTY_STRING,
    PRODUCT_MIN_PRICE,
    PRODUCT_MIN_SIZE,
    NAME_MIN_LENGTH
} from '../../../constants';
import Form from '../../shared/Form';
import useProductContext from '../../../context/product/hook';
import { StyledError, StyledLink } from '../../styles.css';
import DataContainer from '../../shared/DataContainer';
import { StyledScreen, StyledDataPart } from '../styles.css';

const Products = () => {
    const [inputName, setInputName] = useState(EMPTY_STRING);
    const [inputSize, setInputSize] = useState(PRODUCT_MIN_SIZE);
    const [inputPrice, setInputPrice] = useState(PRODUCT_MIN_PRICE);
    const [selectType, setSelectType] = useState(NON_HAZARDOUS);
    const [showProducts, setShowProducts] = useState(false);

    const [fieldsErrors, setFieldsErrors] = useState({ inputName: '', inputSize: '', inputPrice: '' });
    const [formIsValid, setFormIsValid] = useState(false);

    const { products, error, createProductAsync, getAllAsync, clearError } = useProductContext();

    useEffect(() => {
        getAllAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        checkFormIsValid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputName, inputSize, selectType, inputPrice]);

    const validateField = (fieldName, value) => {
        const currentErrors = { ...fieldsErrors };
        currentErrors[fieldName] = '';
        switch (fieldName) {
            case 'inputSize':
                if (value < PRODUCT_MIN_SIZE) currentErrors[fieldName] = `size should be above ${PRODUCT_MIN_SIZE}`;
                break;
            case 'inputPrice':
                if (value < PRODUCT_MIN_PRICE) currentErrors[fieldName] = `price should be above ${PRODUCT_MIN_PRICE}`;
                break;
            case 'inputName':
                if (value.length < NAME_MIN_LENGTH)
                    currentErrors[fieldName] = `name should be more that ${NAME_MIN_LENGTH} symbols`;
                break;
            default:
                break;
        }
        setFieldsErrors(currentErrors);
    };

    const checkFormIsValid = () => {
        const validValues =
            fieldsErrors.inputSize === '' && fieldsErrors.inputName === '' && fieldsErrors.inputPrice === '';
        const notEmptyValues = inputName !== EMPTY_STRING;
        setFormIsValid(validValues && notEmptyValues);
    };

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        validateField(fieldName, event.target.value);
    };

    const handleCreate = async () => {
        const result = await createProductAsync(inputName, inputPrice, inputSize, selectType);
        if (result) {
            clearForm();
        }
    };

    const clearForm = () => {
        setInputName(EMPTY_STRING);
        setInputSize(PRODUCT_MIN_SIZE);
        setInputPrice(PRODUCT_MIN_PRICE);
        setSelectType(NON_HAZARDOUS);
    };

    const changeShowProducts = () => {
        setShowProducts((prev) => !prev);
    };

    const getFormInputs = () => {
        return [
            {
                id: 'name',
                value: inputName,
                type: 'text',
                label: 'Name:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputName, 'inputName')
            },
            {
                id: 'price',
                value: inputPrice,
                type: 'number',
                label: 'Price:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputPrice, 'inputPrice')
            },
            {
                id: 'size',
                value: inputSize,
                type: 'number',
                label: 'Size:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputSize, 'inputSize')
            }
        ];
    };

    const getFormSelects = () => {
        return [
            {
                id: 'type',
                defaultValue: selectType,
                label: 'Type:',
                onChange: (e) => handleOnChange(e, setSelectType, 'type'),
                height: formInputHeight,
                options: [{ name: HAZARDOUS }, { name: NON_HAZARDOUS }]
            }
        ];
    };

    const getFormButtons = () => {
        return [
            {
                text: 'Create',
                type: 'button',
                active: formIsValid,
                handleClick: handleCreate
            }
        ];
    };

    const getDataLabels = () => {
        const { id, ...props } = products[0];
        return Object.keys(props);
    };

    return (
        <StyledScreen>
            <StyledDataPart width='30%'>
                <Form
                    selectsInfo={getFormSelects()}
                    inputsInfo={getFormInputs()}
                    buttonsInfo={getFormButtons()}
                    title='Create Product'
                    error={error}
                />
                {fieldsErrors.inputName ? <StyledError>{fieldsErrors.inputName}</StyledError> : null}
                {fieldsErrors.inputPrice ? <StyledError>{fieldsErrors.inputPrice}</StyledError> : null}
                {fieldsErrors.inputSize ? <StyledError>{fieldsErrors.inputSize}</StyledError> : null}
            </StyledDataPart>
            <StyledDataPart width='60%'>
                <StyledLink onClick={changeShowProducts}>{showProducts ? 'hide Products' : 'show Products'}</StyledLink>
                {showProducts && products.length > 0 ? (
                    <DataContainer labelData={getDataLabels()} data={products} title='Products' />
                ) : null}
                {showProducts && products.length === 0 ? <StyledError>No products</StyledError> : null}
            </StyledDataPart>
        </StyledScreen>
    );
};

export default Products;
