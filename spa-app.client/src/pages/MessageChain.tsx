import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { ITEMS_PER_PAGE } from '../models/models';
import { fetchChildMessages } from '../store/actions/messageAction';
import ReactPaginate from 'react-paginate';
import { Messages } from '../components/Messages';
import { ModalContext } from '../context/ModalContext';
import { Modal } from '../components/Modal';
import { ViewText } from '../components/ViewText';
import { ViewImage } from '../components/ViewImage';

export function MessageChain() {
    const params = useParams<'id'>()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const page = useRef(1)
    const { error, loading, messages, pageCount, count } = useAppSelector(state => state.messageChildReducer)
    const {modal, open, close} = useContext(ModalContext) 
    const [loadFile, setLoadFile] = useState('')
    const [imageCheck, setImageCheck] = useState(false)
    const [textCheck, setTextCheck] = useState(false)

    const pageChangeHandler = ({ selected }: { selected: number }) => {
        page.current = selected + 1
        dispatch(fetchChildMessages(page.current, ITEMS_PER_PAGE, params.id!))
    }

    const updateData = (loadFile: string, imageCheck: boolean, textCheck: boolean) => {
        setLoadFile(loadFile)
        setImageCheck(imageCheck)
        setTextCheck(textCheck)
        open()
    }

    const clickHandler = () => navigate(-1)

    useEffect( () => {
        dispatch(fetchChildMessages(page.current, ITEMS_PER_PAGE, params.id!))
    }, [dispatch, params.id])

    return (
        <>
        <button onClick={clickHandler} className='px-2 my-2 mx-2 border border-indigo-700 mr-1 hover:shadow-md hover:bg-gray-500 hover:transition-all cursor-pointer'
            >back</button>
        
        <div className='container mx-auto max-w-[760px]'>
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
                        ? messages.map(message => <Messages key={message.id} message={message} child={true} updateData={updateData}/>)
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