import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { IMessage, ITEMS_PER_PAGE, ServerResponse } from '../models/models';
import { fetchChildMessages } from '../store/actions/messageAction';
import { NIL as NIL_UUID } from 'uuid';
import ReactPaginate from 'react-paginate';
import { Messages } from '../components/Messages';

export function MessageChain() {
    const params = useParams<'id'>()
    const id = params.id == undefined ? NIL_UUID : params.id 

    const dispatch = useAppDispatch()
    const page = useRef(1)
    const { error, loading, messages, pageCount, count } = useAppSelector(state => state.messageChildReducer)

    const pageChangeHandler = ({ selected }: { selected: number }) => {
        page.current = selected + 1
        dispatch(fetchChildMessages(page.current, ITEMS_PER_PAGE, id))
    }

    useEffect( () => {
        dispatch(fetchChildMessages(page.current, ITEMS_PER_PAGE, id))
    }, [dispatch])

    return (
        // <div className='container mx-auto pt-5 max-w-[760px]'>
        //     <h1>
        //         MessageChain {params.id}
        //     </h1>
        // </div>
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
                        ? messages.map(message => <Messages key={message.id} message={message} />)
                        : <p className="text-center">No items</p>
                }  
            </div>      
        </div>
    )
}