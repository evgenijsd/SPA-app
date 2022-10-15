import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMessage } from '../models/models';

interface MessagesProps {
    message: IMessage
    child: boolean
}

export function Messages({ message, child }: MessagesProps) {
    const navigate = useNavigate()

    const clickHandler = () => { if (!child) navigate(`/message/${message.id}`) }
    const clickAddHandler = () => navigate(`/add/${message.id}`)

    return (
        <div className='flex'>
            <div className='flex-initial text-7xl text-white'>
                { "".padStart(message.layer, "*") }
            </div>
            <div onClick={clickHandler} className='flex-auto border rounded-md w-full mb-2 hover:shadow-md hover:transition-all cursor-pointer'>
                <div className='flex justify-between px-5 py-1 h-[35px] bg-gray-200' >
                    <p className='flex-initial font-bold mr-5'>{message.name}</p>
                    {child && <p className='flex-initial'>
                        <button className="px-2 border border-indigo-700 mr-1 hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer"
                            onClick={clickAddHandler}>reply</button>
                    </p>}
                </div>  
                <div className='px-4'>             
                    <p className='text-sm font-medium'>{message.email}</p>
                    <p className='text-sm font-medium'>{message.homePage}</p>
                    <p className='text-sm font-medium'>{message.text}</p>
                    <p className='text-sm font-medium'>{message.layer}</p>
                </div> 

            </div>
        </div>
    )
}