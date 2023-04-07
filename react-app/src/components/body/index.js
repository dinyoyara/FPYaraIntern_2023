import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../header';

import Home from './home';
import Products from './products';
import Warehouses from './warehouses';
import Movements from './movements';

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
