import { useEffect, useState } from 'react';

import {
    HAZARDOUS,
    NON_HAZARDOUS,
    UNKNOWN,
    EMPTY_STRING,
    WAREHOUSE_MIN_SIZE,
    NAME_MIN_LENGTH
} from '../../../constants';
import Form from '../../shared/Form';
import Modal from '../../shared/Modal';
import { StyledError } from '../../styles.css';
import DataContainer from '../../shared/DataContainer';
import { formInputHeight } from '../../../styles/const';
import { StyledScreen, StyledDataPart } from '../styles.css';
import useWarehouseContext from '../../../context/warehouse/hook';

const Warehouses = () => {
    const [inputName, setInputName] = useState(EMPTY_STRING);
    const [inputSize, setInputSize] = useState(WAREHOUSE_MIN_SIZE);
    const [selectType, setSelectType] = useState(UNKNOWN);

    const [editedId, setEditedId] = useState();
    const [edit, setEdit] = useState(false);

    const [fieldsErrors, setFieldsErrors] = useState({ inputName: EMPTY_STRING, inputSize: EMPTY_STRING });
    const [formIsValid, setFormIsValid] = useState(false);

    const [limitation, setLimitation] = useState(EMPTY_STRING);

    const {
        warehouses,
        error,
        createWarehouseAsync,
        getAllWarehousesByCustomerAsync,
        clearError,
        deleteWarehouseAsync,
        updateWarehouseAsync
    } = useWarehouseContext();

    useEffect(() => {
        getAllWarehousesByCustomerAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFieldsErrors({ inputName: EMPTY_STRING, inputSize: EMPTY_STRING });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit]);

    useEffect(() => {
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, inputName]);

    useEffect(() => {
        checkFormIsValid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputName, inputSize, selectType]);

    const validateField = (fieldName, value) => {
        const currentErrors = { ...fieldsErrors };
        currentErrors[fieldName] = EMPTY_STRING;
        switch (fieldName) {
            case 'inputSize':
                if (value < WAREHOUSE_MIN_SIZE) currentErrors[fieldName] = `size should be above ${WAREHOUSE_MIN_SIZE}`;
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
        const validValues = fieldsErrors.inputSize === EMPTY_STRING && fieldsErrors.inputName === EMPTY_STRING;
        const notEmptyValues = inputName !== EMPTY_STRING;
        setFormIsValid(validValues && notEmptyValues);
    };

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        validateField(fieldName, event.target.value);
    };

    const handleCreate = async () => {
        const result = await createWarehouseAsync(inputName, inputSize, selectType);
        if (result) {
            clearForm();
        }
    };

    const handleDelete = async (id) => {
        const deletedWarehouse = warehouses.find((x) => x.id === id);
        if (!deletedWarehouse || deletedWarehouse.size > deletedWarehouse.freeSpace) {
            setLimitation('warehouse has products');
            return;
        }
        await deleteWarehouseAsync(id);
    };

    const handleEdit = async () => {
        const result = await updateWarehouseAsync(editedId, inputName, inputSize, selectType);
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

    // SET FORM ELEMENTS
    const getFormInputs = () => {
        return [
            {
                id: 'name',
                value: inputName,
                type: 'text',
                label: 'Name:',
                placeholder: 'Enter warehouse name here',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputName, 'inputName')
            },
            {
                id: 'size',
                value: inputSize,
                type: 'number',
                label: 'Size:',
                placeholder: 'Enter warehouse size here',
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
                onChange: (e) => handleOnChange(e, setSelectType, 'selectType'),
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
                active: true,
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

    //SET WAREHOUSES DATA
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

    //JSX
    return (
        <StyledScreen>
            <StyledDataPart width='30%'>
                <Form
                    selectsInfo={getFormSelects()}
                    inputsInfo={getFormInputs()}
                    buttonsInfo={getFormButtons()}
                    title={edit ? 'Edit Warehouse' : 'Create Warehouse'}
                    error={error}
                />
                {fieldsErrors.inputName ? <StyledError>{fieldsErrors.inputName}</StyledError> : null}
                {fieldsErrors.inputSize ? <StyledError>{fieldsErrors.inputSize}</StyledError> : null}
            </StyledDataPart>
            <StyledDataPart width='60%'>
                {warehouses.length > 0 ? (
                    <DataContainer
                        labelData={getDataLabels()}
                        data={warehouses}
                        actions={getDataActions()}
                        title='Warehouses'
                        height='100%'
                        rowContainerHeight='80%'
                    />
                ) : (
                    <StyledError>No warehouses</StyledError>
                )}
            </StyledDataPart>
            <Modal text={limitation} show={limitation} toggle={() => setLimitation(EMPTY_STRING)} />
        </StyledScreen>
    );
};

export default Warehouses;
