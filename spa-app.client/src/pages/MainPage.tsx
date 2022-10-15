import React, { useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { Messages } from '../components/Messages';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { ITEMS_PER_PAGE } from '../models/models';
import { fetchMessages } from '../store/actions/messageAction';

export function MainPage() {
    const dispatch = useAppDispatch()
    const page = useRef(1)
    const { error, loading, messages, pageCount, count } = useAppSelector(state => state.messageReducer)

    const pageChangeHandler = ({ selected }: { selected: number }) => {
        page.current = selected + 1
        dispatch(fetchMessages(page.current, ITEMS_PER_PAGE))
    }

    useEffect( () => {
        dispatch(fetchMessages(page.current, ITEMS_PER_PAGE))
    }, [dispatch])

    return (
        <div className='container mx-auto max-w-[760px] pt-5'>
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
                        ? messages.map(message => <Messages key={message.id} message={message} child={false}/>)
                        : <p className="text-center">No items</p>
                }                  
            </div>      
        </div>
    )
}