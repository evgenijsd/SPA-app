import React from 'react';

interface MessagesProps {
    image: string
}

export function ViewImage({image}:MessagesProps) {

    return (
        <div>
            <img src={image} 
                        className="p-1 mx-auto m-1 w-auto bg-white border rounded " alt="..." />
        </div>
    )
}