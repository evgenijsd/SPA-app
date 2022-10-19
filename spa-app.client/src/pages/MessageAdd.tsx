import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageForm } from '../components/MessageForm';

export function MessageAdd() {
    const params = useParams<'id'>()
    const navigate = useNavigate()

    const clickHandler = () => navigate(-1)

    return (
        <>
         <button onClick={clickHandler} className='px-2 my-2 mx-2 border border-indigo-700 mr-1 hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer'
            >back</button>
        <MessageForm key='adding' messageId={params.id!} />
        </>
    )
}