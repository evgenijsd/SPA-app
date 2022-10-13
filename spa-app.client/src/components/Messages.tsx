import React from 'react';
import { IMessage } from '../models/models';

interface MessageProps {
    message: IMessage
}

export function Messages({ message }: MessageProps) {
    return (
        <div className='container mx-auto max-w-[760px] pt-5'>
            {message.name}
        </div>
    )
}