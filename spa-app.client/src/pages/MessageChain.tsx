import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { ITEMS_PER_PAGE } from '../models/models';
import { fetchChildMessages } from '../store/actions/messageAction';
import ReactPaginate from 'react-paginate';
import { Messages } from '../components/Messages';

export function MessageChain() {
    const params = useParams<'id'>()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const page = useRef(1)
    const { error, loading, messages, pageCount, count } = useAppSelector(state => state.messageChildReducer)

    const pageChangeHandler = ({ selected }: { selected: number }) => {
        page.current = selected + 1
        dispatch(fetchChildMessages(page.current, ITEMS_PER_PAGE, params.id!))
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
                        ? messages.map(message => <Messages key={message.id} message={message} child={true}/>)
                        : <p className="text-center">No items</p>
                }  
            </div>      
        </div>
        </>
    )
}