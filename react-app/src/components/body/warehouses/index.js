import { useState } from 'react';

import StyledWarehouseScreen from './styles.css';
import Form from '../../shared/Form';
import { formInputHeight } from '../../../styles/const';
import { HAZARDOUS, NON_HAZARDOUS, UNKNOWN } from '../../../constants';

const Warehouses = () => {
    const [inputName, setInputName] = useState();
    const [inputSize, setInputSize] = useState(100);
    const [selectType, setSelectType] = useState(UNKNOWN);

    const [formIsValid, setFormIsValid] = useState(true);

    const handleSubmit = () => {
        console.log(inputName, inputSize, selectType);
    };

    const createWarehouseFormInputs = [
        {
            id: 'name',
            value: inputName,
            type: 'text',
            label: 'Name:',
            height: formInputHeight,
            onChange: (e) => setInputName(e.target.value)
        },
        {
            id: 'size',
            value: inputSize,
            type: 'number',
            label: 'Size:',
            height: formInputHeight,
            onChange: (e) => setInputSize(e.target.value)
        }
    ];

    const createWarehouseFormSelect = [
        {
            id: 'type',
            defaultValue: selectType,
            label: 'Type:',
            onChange: (e) => setSelectType(e.target.value),
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
            />
        </StyledWarehouseScreen>
    );
};

export default Warehouses;
