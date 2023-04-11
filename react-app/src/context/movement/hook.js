import { useContext } from 'react';

import { MovementContext } from '.';

const useMovementContext = () => {
    return useContext(MovementContext);
};

export default useMovementContext;
