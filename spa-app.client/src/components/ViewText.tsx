import dompurify from 'dompurify';
import React from 'react';
import {Buffer} from 'buffer';

interface MessagesProps {
    textFile: string
}

export function ViewText({textFile}:MessagesProps) {
    return (
        <div className='container mx-auto max-w-[760px] pt-2'>
            <div className='px-2'>                                                     
                <p className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300'>
                    <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(Buffer.from(textFile.split(',')[1], 'base64').toString('utf8'))}} />
                </p>
            </div>
        </div>
    )
}