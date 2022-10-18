import dompurify from 'dompurify';
import React from 'react';
import {Buffer} from 'buffer';

interface MessagesProps {
    textFile: string
}

export function ViewText({textFile}:MessagesProps) {
    console.log(textFile)

    return (
        <div className='container mx-auto max-w-[760px] pt-5'>
            <div className='px-4'>                                                     
                <p className='text-sm font-medium my-1'>
                    <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(Buffer.from(textFile, 'base64').toString('utf8'))}} />
                </p>
            </div>
        </div>
    )
}