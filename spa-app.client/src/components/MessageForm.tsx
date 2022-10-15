import React, { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { IMessage } from '../models/models';
import { NIL as NIL_UUID } from 'uuid';
import { clearCreate, createMessage } from '../store/actions/messageAction';

interface MessageFormProps {
    messageId: string
}

export function MessageForm({messageId}: MessageFormProps) {
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [homePage, setHomePage] = useState('')

    const dispatch = useAppDispatch()
    const { error, create } = useAppSelector(state => state.addingReducer)

    useEffect( () => {
        dispatch(clearCreate())
    }, [dispatch])

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const message: IMessage = {
        id: NIL_UUID,
        messageId: messageId,
        name:  name,
        email: email,
        homePage: homePage,
        layer: 0,
        text: text,
        created: new Date()
      }

      console.log(message)
      dispatch(createMessage(message))
    }

    return (
        <>
        <form onSubmit={submitHandler} className="container mx-auto pt-5 max-w-[700px] mb-4">
        <div>
          <label htmlFor="username" className="mr-2 ">Username</label>
          <input type="text" id="username" className="border py-1 px-4 mb-2 w-full outline-0" name="username"  
                onChange={e => setName(e.target.value)}/>
          <label htmlFor="email" className="mr-2 ">E-mail</label>
          <input type="text" id="email" className="border py-1 px-4 mb-2 w-full outline-0" name="email"  
                onChange={e => setEmail(e.target.value)} />
          <label htmlFor="homepage" className="mr-2 ">Home page</label>
          <input type="text" id="homepage" className="border py-1 px-4 mb-2 w-full outline-0" name="homepage" 
                onChange={e => setHomePage(e.target.value)} />
        </div>
        <textarea
          className="border py-2 my-2 px-4 w-full outline-0 resize-none max-h-[500px]"
          placeholder="Type your message here"
          onChange={e => setText(e.target.value)}
        />
        { create && <p className='text-center text-lg'>The message is created</p>}
        { error && <p className='text-center text-lg text-red-600'>{error}</p>}

        <div className='flex'>
            <button
            type="submit"
            className="border py-2 px-4 mr-1 flex-auto hover:bg-gray-500 hover:text-white hover:transition-all"
            >Create</button>
            <button
            type="button"
            className="border py-2 px-4 ml-1 flex-auto hover:bg-gray-500 hover:text-white hover:transition-all"
            >Preview</button>
        </div>

      </form>
      </>
    )
}