import { useContext } from 'react';
import { WarehouseContext } from '.';

function useWarehouseContext() {
    return useContext(WarehouseContext);
}

export default useWarehouseContext;
