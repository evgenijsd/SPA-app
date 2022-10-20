import dompurify from 'dompurify';
import React from 'react';
import { IMessage } from '../models/models';
import {Buffer} from 'buffer';

interface MessagesProps {
    message: IMessage
}

export function ViewMessage({ message }: MessagesProps) {
    const imageCheck = message.loadFile ? message.loadFile.includes('image') : false
    const textCheck = message.loadFile ? message.loadFile.includes('text') : false 

    return (
        <div className='container mx-auto max-w-[760px] min-w-[760px] pt-5'>
            <div className='flex'>
                <div className='flex-initial text-7xl text-white'>
                    { "".padStart(message.layer, "*") }
                </div>
                <div className='flex-auto border rounded-md w-full mb-2 hover:shadow-md hover:transition-all cursor-pointer'>
                    <div className='justify-between px-5 bg-gray-200 pb-2'>
                        <div className='flex' >
                            <p className='flex-none font-bold mr-5'>{message.name}</p>
                            <p className='flex-1 object-left text-sm font-medium pt-0.5'>{message.email}</p>                                                             
                        </div> 
                        <p className='text-sm font-medium'>{message.homePage}</p> 
                    </div>
                    <div className='px-4'>                                                     
                        <p className='text-sm font-medium my-1'>
                            <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(Buffer.from(message.text, 'base64').toString('utf8'))}} />
                        </p>
                        {imageCheck && <img src={message.loadFile} 
                            className="p-1 mx-auto mb-3 w-32 bg-white border rounded max-w-sm" alt="..." /> }
                        {textCheck && message.loadFile?.includes('text') && <img src='../28878.png' 
                            className="p-1 mx-auto mb-3 w-32 bg-white border rounded max-w-sm" alt="..." /> }
                    </div> 

                </div>
            </div>            
        </div>
    )
}
