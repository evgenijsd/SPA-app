import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMessage } from '../models/models';
import {Buffer} from 'buffer';
import dompurify from 'dompurify';
import { Modal } from './Modal';
import { ModalContext } from '../context/ModalContext';
import { ViewImage } from './ViewImage';
import { ViewText } from './ViewText';

interface MessagesProps {
    message: IMessage
    child: boolean
}

export function Messages({ message, child }: MessagesProps) {
    const navigate = useNavigate()
    const imageCheck = message.loadFile ? message.loadFile.includes('image') : false
    const textCheck = message.loadFile ? message.loadFile.includes('text') : false
    const {modal, open, close} = useContext(ModalContext) 
    const classParam = child ? 'flex-auto border rounded-md w-full mb-2'
        : 'flex-auto border rounded-md w-full mb-2 hover:shadow-md hover:transition-all cursor-pointer'

    const clickHandler = () => { 
        if (!child) navigate(`/message/${message.id}`) 
    }
    const clickAddHandler = () => navigate(`/add/${message.id}`)

    return (
        <div className='flex'>
            <div className='flex-initial text-7xl text-white'>
                { "".padStart(message.layer, "*") }
            </div>
            <div onClick={clickHandler} className={classParam}>
                <div className='justify-between px-5 bg-gray-200 pb-2'>
                    <div className='flex' >
                        <p className='flex-none font-bold mr-5'>{message.name}</p>
                        <p className='flex-1 object-left text-sm font-medium pt-0.5'>{message.email}</p>                    
                        {child && <p className='flex-initial'>
                            <button className="px-2 border border-indigo-700 mt-0.5 hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer"
                                onClick={clickAddHandler}>reply</button>
                        </p>}                                            
                    </div> 
                    <p className='text-sm font-medium'>{message.homePage}</p> 
                </div>
                <div className='px-4'>                                                     
                    <p className='text-sm font-medium my-1'>
                        <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(Buffer.from(message.text, 'base64').toString('utf8'))}} />
                    </p>
                    {imageCheck && <img src={message.loadFile} onClick={() => open()}
                        className="p-1 mx-auto mb-3 w-32 bg-white border rounded max-w-sm hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer" alt="..." /> }
                    {textCheck && message.loadFile?.includes('text') && <img src='../28878.png' onClick={() => open()}
                        className="p-1 mx-auto mb-3 w-32 bg-white border rounded max-w-sm hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer" alt="..." /> }
                        
                </div> 
            </div>
            {modal && imageCheck && <Modal onClose={close}>
                <ViewImage image={message.loadFile!}/> 
            </Modal> }
            {modal && textCheck && <Modal onClose={close}>
                <ViewText textFile={message.loadFile!}/> 
            </Modal> }
        </div>
    )
}