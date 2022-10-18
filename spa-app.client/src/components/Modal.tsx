import React from 'react';

interface ModalProps {
    children: React.ReactNode
    onClose: () => void
}

export function Modal({children, onClose}: ModalProps) {

    return (
        <>
            <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto' id='modal' onClick={onClose}>

            </div>
            <div className='absolute top-10 left-10 bg-white'>
                { children }
            </div>
            
        </>

    )
}