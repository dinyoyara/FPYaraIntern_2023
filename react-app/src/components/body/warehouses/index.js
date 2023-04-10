import { useEffect, useState } from 'react';

import Form from '../../shared/Form';
import StyledWarehouseScreen from './styles.css';
import DataContainer from '../../shared/DataContainer';
import { formInputHeight } from '../../../styles/const';
import useWarehouseContext from '../../../context/warehouse/hook';
import { HAZARDOUS, NON_HAZARDOUS, UNKNOWN } from '../../../constants';

const Warehouses = () => {
    const [inputName, setInputName] = useState('');
    const [inputSize, setInputSize] = useState(100);
    const [selectType, setSelectType] = useState(UNKNOWN);

    const [formIsValid, setFormIsValid] = useState(true);

    const { warehouses, error, createWarehouseAsync, getAllAsync, clearError } = useWarehouseContext();

    useEffect(() => {
        getAllAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        const result = await createWarehouseAsync(inputName, inputSize, selectType);
        if (result) {
            setInputName('');
            setInputSize(100);
            setSelectType(UNKNOWN);
        }
    };
    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        // validateField(fieldName, event.target.value);
    };

    const handleDelete = (id) => {
        console.log('delete', id);
    };

    const handleEdit = (id) => {
        console.log('edit', id);
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

    const labelData = { name: 'name', type: 'type', size: 'size', freeSpace: 'free space' };

    const dataButtons = [
        { name: 'delete', onClick: (id) => handleDelete(id) },
        { name: 'edit', onClick: (id) => handleEdit(id) }
    ];

    return (
        <StyledWarehouseScreen>
            {warehouses ? (
                <DataContainer labelData={labelData} data={warehouses} dataButtons={dataButtons} title='Warehouses' />
            ) : null}
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
