import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMessage } from '../models/models';

interface MessagesProps {
    message: IMessage
}

export function Messages({ message }: MessagesProps) {
    const navigate = useNavigate()

    const clickHandler = () => navigate(`/message/${message.id}`)

    return (
        <div className='flex'>
            <div className='flex-initial text-7xl text-white'>
                { "".padStart(message.layer, "*") }
            </div>
            <div onClick={clickHandler} className='flex-auto border rounded-md py-1 px-5 mb-2 hover:shadow-md hover:transition-all cursor-pointer'>
                <p className='font-bold'>{message.name}</p>
                <p className='text-sm font-medium'>{message.email}</p>
                <p className='text-sm font-medium'>{message.homePage}</p>
                <p className='text-sm font-medium'>{message.text}</p>
                <p className='text-sm font-medium'>{message.layer}</p>
            </div>
        </div>
    )
}