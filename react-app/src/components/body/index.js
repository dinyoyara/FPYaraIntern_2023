import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './home';
import Header from '../header';
import Products from './products';
import Movements from './movements';
import Warehouses from './warehouses';

const Body = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <Header handleNavigation={handleNavigation} />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/warehouses' element={<Warehouses />} />
                <Route path='/movements' element={<Movements />} />
            </Routes>
        </>
    );
};

export default Body;
