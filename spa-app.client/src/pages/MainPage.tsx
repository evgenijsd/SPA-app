import React, { useEffect } from 'react';
import { Messages } from '../components/Messages';
import { useAppDispatch } from '../hook/redux';
import { fetchMessages } from '../store/actions/messageAction';

export function MainPage() {
    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(fetchMessages())
    }, [])

    return (
        <div className='container mx-auto max-w-[760px] pt-5'>
            <Messages />
        </div>
    )
}