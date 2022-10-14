import React, { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

export function MessageAdd() {
    const params = useParams<'id'>()
    
    const submitHandler = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <form className='container mx-auto pt-5 max-w-[500px]'
            onSubmit={submitHandler}>
            <h1>
                 MessageAdd {params.id} 
            </h1>
        </form>
    )
}