import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Messages } from '../components/Messages';
import { Modal } from '../components/Modal';
import { ViewImage } from '../components/ViewImage';
import { ViewText } from '../components/ViewText';
import { ModalContext } from '../context/ModalContext';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { ESortingMessagesType, ITEMS_PER_PAGE } from '../models/models';
import { fetchMessages } from '../store/actions/messageAction';

export function MainPage() {
    const dispatch = useAppDispatch()
    const page = useRef(1)
    const { error, loading, messages, pageCount, count } = useAppSelector(state => state.messageReducer)
    const {modal, open, close} = useContext(ModalContext) 
    const [loadFile, setLoadFile] = useState('')
    const [imageCheck, setImageCheck] = useState(false)
    const [textCheck, setTextCheck] = useState(false)
    const [sortType, setSortType] = useState(ESortingMessagesType.None)

    const pageChangeHandler = ({ selected }: { selected: number }) => {
        page.current = selected + 1
        dispatch(fetchMessages(page.current, ITEMS_PER_PAGE, sortType))
    }

    const updateData = (loadFile: string, imageCheck: boolean, textCheck: boolean) => {
        setLoadFile(loadFile)
        setImageCheck(imageCheck)
        setTextCheck(textCheck)
        open()
    }

    useEffect( () => {
        dispatch(fetchMessages(page.current, ITEMS_PER_PAGE, sortType))
    }, [dispatch, sortType])

    const sortChangeHandler = (sort: ESortingMessagesType) => {
        setSortType(sort);
        if (sort === sortType) dispatch(fetchMessages(page.current, ITEMS_PER_PAGE, sortType))
    }

    return (
        <>        
            <div className='container mx-auto max-w-[760px] pt-2'>
            <div className='flex mb-2'>
                <button onClick={() => sortChangeHandler(ESortingMessagesType.ByName)} className='flex-auto border border-indigo-700 hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer'
                    >User Name</button>
                <button onClick={() => sortChangeHandler(ESortingMessagesType.ByEmail)} className='flex-auto border border-indigo-700 hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer'
                    >E-mail</button>
                <button onClick={() => sortChangeHandler(ESortingMessagesType.ByDate)} className='flex-auto border border-indigo-700 hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer'
                    >Date</button>
            </div>
                { pageCount && <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={pageChangeHandler}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    forcePage={page.current - 1}
                    previousLabel="<"
                    containerClassName='flex'
                    pageClassName='py-1 px-3 border mr-2'
                    previousClassName='py-1 px-3 border mr-2'
                    nextClassName='py-1 px-3 border'
                    activeClassName='bg-gray-500 text-white'
                />}

                <div className='mt-2'>
                    { loading && <p className='text-center text-lg'>Loading...</p>}
                    { error && <p className='text-center text-lg text-red-600'>{error}</p>}
                    {
                        count > 0
                            ? messages.map(message => <Messages key={message.id} message={message} child={false} updateData={updateData}/>)
                            : <p className="text-center">No items</p>
                    }                
                </div>      
            </div>
            {modal && imageCheck && <Modal onClose={close}>
                <ViewImage image={loadFile!}/> 
            </Modal> }
            {modal && textCheck && <Modal onClose={close}>
                <ViewText textFile={loadFile!}/> 
            </Modal> } 
        </> 
    )
}