import React from 'react';
import { Link } from 'react-router-dom';
import { NIL as NIL_UUID } from 'uuid';

export function Navigation() {

    return (
        <nav className='flex justify-between px-5 h-[50px] bg-gray-200 items-center shadow-md'>            
            <Link to='/'>Messages</Link>
            <Link to={{
                pathname: '/add/' + NIL_UUID
            }}>Add</Link>
        </nav>
    )
}