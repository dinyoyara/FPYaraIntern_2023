import { useEffect, useState } from 'react';

import Form from '../../shared/Form';
import StyledWarehouseScreen from './styles.css';
import DataContainer from '../../shared/DataContainer';
import { formInputHeight } from '../../../styles/const';
import useWarehouseContext from '../../../context/warehouse/hook';
import { HAZARDOUS, NON_HAZARDOUS, UNKNOWN, EMPTY_STRING, WAREHOUSE_MIN_SIZE } from '../../../constants';
import { StyledDataPart } from '../styles.css';

const Warehouses = () => {
    const [inputName, setInputName] = useState(EMPTY_STRING);
    const [inputSize, setInputSize] = useState(WAREHOUSE_MIN_SIZE);
    const [selectType, setSelectType] = useState(UNKNOWN);
    const [editedId, setEditedId] = useState();
    const [edit, setEdit] = useState(false);

    const [formIsValid, setFormIsValid] = useState(true);

    const { warehouses, error, createWarehouseAsync, getAllAsync, clearError, deleteAsync, updateAsync } =
        useWarehouseContext();

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
        const result = await createWarehouseAsync(inputName, inputSize, selectType);
        if (result) {
            clearForm();
        }
    };

    const handleDelete = async (id) => {
        await deleteAsync(id);
    };

    const handleEdit = async () => {
        const result = await updateAsync(editedId, inputName, inputSize, selectType);
        if (result) {
            clearForm();
            setEdit(false);
        }
    };

    const handleStartEdit = (id) => {
        const warehouse = warehouses.find((x) => x.id === id);
        setEdit(true);
        setInputName(warehouse.name);
        setInputSize(warehouse.size);
        setSelectType(warehouse.type);
        setEditedId(id);
    };

    const handleStopEdit = () => {
        setEdit(false);
        clearForm();
    };

    const clearForm = () => {
        setInputName(EMPTY_STRING);
        setInputSize(WAREHOUSE_MIN_SIZE);
        setSelectType(UNKNOWN);
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
                options: [{ name: HAZARDOUS }, { name: NON_HAZARDOUS }, { name: UNKNOWN }]
            }
        ];
    };

    const getFormButtons = () => {
        const buttons = [];
        if (edit) {
            buttons.push({
                text: 'Edit',
                type: 'button',
                active: formIsValid,
                handleClick: handleEdit
            });
            buttons.push({
                text: 'Return to Create',
                type: 'button',
                active: formIsValid,
                handleClick: handleStopEdit
            });
        } else {
            buttons.push({
                text: 'Create',
                type: 'button',
                active: formIsValid,
                handleClick: handleCreate
            });
        }
        return buttons;
    };

    const getDataLabels = () => {
        const { id, ...props } = warehouses[0];
        return Object.keys(props);
    };

    const getDataActions = () => {
        return [
            { name: 'delete', onClick: (id) => handleDelete(id) },
            { name: 'edit', onClick: (id) => handleStartEdit(id) }
        ];
    };

    return (
        <StyledWarehouseScreen>
            <Form
                selectsInfo={getFormSelects()}
                inputsInfo={getFormInputs()}
                buttonsInfo={getFormButtons()}
                title={edit ? 'Edit Warehouse' : 'Create Warehouse'}
                error={error}
            />
            <StyledDataPart>
                {warehouses ? (
                    <DataContainer
                        labelData={getDataLabels()}
                        data={warehouses}
                        actions={getDataActions()}
                        title='Warehouses'
                    />
                ) : null}
            </StyledDataPart>
        </StyledWarehouseScreen>
    );
};

export default Warehouses;
