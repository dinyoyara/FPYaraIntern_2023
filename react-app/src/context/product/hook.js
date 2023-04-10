import { useContext } from 'react';
import { ProductContext } from '.';

function useProductContext() {
    return useContext(ProductContext);
}

export default useProductContext;
