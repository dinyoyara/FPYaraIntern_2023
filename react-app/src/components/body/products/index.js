import { useState, useEffect } from 'react';

import { formInputHeight } from '../../../styles/const';
import { HAZARDOUS, NON_HAZARDOUS, EMPTY_STRING, PRODUCT_MIN_PRICE, PRODUCT_MIN_SIZE } from '../../../constants';
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

    const [formIsValid, setFormIsValid] = useState(true);

    const { products, error, createProductAsync, getAllAsync, clearError } = useProductContext();

    useEffect(() => {
        getAllAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        // validateField(fieldName, event.target.value);
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
                onChange: (e) => handleOnChange(e, setInputName, 'name')
            },
            {
                id: 'price',
                value: inputPrice,
                type: 'number',
                label: 'Price:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputPrice, 'price')
            },
            {
                id: 'size',
                value: inputSize,
                type: 'number',
                label: 'Size:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputSize, 'size')
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
            <Form
                selectsInfo={getFormSelects()}
                inputsInfo={getFormInputs()}
                buttonsInfo={getFormButtons()}
                title='Create Product'
                error={error}
            />
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
