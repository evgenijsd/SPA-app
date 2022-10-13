import React, { useEffect } from 'react';
import { Messages } from '../components/Messages';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { fetchMessages } from '../store/actions/messageAction';

export function MainPage() {
    const dispatch = useAppDispatch()
    const { error, loading, messages } = useAppSelector(state => state.messageReducer)

    useEffect( () => {
        dispatch(fetchMessages())
    }, [])

    return (
        <div className='container mx-auto max-w-[760px] pt-5'>
            {
                messages.map(message => <Messages key={message.id} message={message} />)
            }
        </div>
    )
}