import { useState } from 'react';

import StyledWarehouseScreen from './styles.css';
import Form from '../../shared/Form';
import { formInputHeight } from '../../../styles/const';
import { HAZARDOUS, NON_HAZARDOUS, UNKNOWN } from '../../../constants';
import useWarehouseContext from '../../../context/warehouse/hook';

const Warehouses = () => {
    const [inputName, setInputName] = useState('');
    const [inputSize, setInputSize] = useState(100);
    const [selectType, setSelectType] = useState(UNKNOWN);

    const [formIsValid, setFormIsValid] = useState(true);

    const { error, createWarehouseAsync, clearError } = useWarehouseContext();

    const handleSubmit = async () => {
        await createWarehouseAsync(inputName, inputSize, selectType);
    };
    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        // validateField(fieldName, event.target.value);
    };

    const createWarehouseFormInputs = [
        {
            id: 'name',
            value: inputName,
            type: 'text',
            label: 'Name:',
            height: formInputHeight,
            onChange: (e) => handleOnChange(e, setInputName, 'name')
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

    const createWarehouseFormSelect = [
        {
            id: 'type',
            defaultValue: selectType,
            label: 'Type:',
            onChange: (e) => handleOnChange(e, setSelectType, 'type'),
            height: formInputHeight,
            options: [{ name: HAZARDOUS }, { name: NON_HAZARDOUS }, { name: UNKNOWN }]
        }
    ];

    const createWarehouseButton = {
        text: 'Create',
        type: 'button',
        active: formIsValid,
        handleClick: handleSubmit
    };

    return (
        <StyledWarehouseScreen>
            <Form
                selectsInfo={createWarehouseFormSelect}
                inputsInfo={createWarehouseFormInputs}
                buttonInfo={createWarehouseButton}
                title='Create Warehouse'
                error={error}
            />
        </StyledWarehouseScreen>
    );
};

export default Warehouses;
