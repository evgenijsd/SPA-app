import React from 'react';

interface ModalProps {
    children: React.ReactNode
    onClose: () => void
}

export function Modal({children, onClose}: ModalProps) {

    return (
        <>        
            <div className='mx-auto flex items-center justify-center fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto' id='modal' onClick={onClose}>

            </div>

            <div className='flex fixed max-h-screen z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md drop-shadow-lg overflow-y-auto px-1'>
                { children }
            </div>
            
        </>
//flex fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    )
}