import React, { useContext, useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { IMessage } from '../models/models';
import { NIL as NIL_UUID } from 'uuid';
import { clearCreate, createMessage } from '../store/actions/messageAction';
import {Buffer} from 'buffer';
import { Modal } from './Modal';
import { ModalContext } from '../context/ModalContext';
import { ViewMessage } from './ViewMessage';
import ReCAPTCHA from 'react-google-recaptcha';

interface MessageFormProps {
    messageId: string
}

export function MessageForm({messageId}: MessageFormProps) {
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [homePage, setHomePage] = useState('')
    const [loadFile, setLoadFile] = useState('')
    const [selectFile, setFile] = useState<File>()
    const [preview, setPreview] = useState('')
    const [textCheck, setTextCheck] = useState(false)
    const [errorLoad, setErrorLoad] = useState<ProgressEvent<FileReader>>()
    const {modal, open, close} = useContext(ModalContext)

    const dispatch = useAppDispatch()
    const { error, create } = useAppSelector(state => state.addingReducer)


    useEffect( () => {
        dispatch(clearCreate())
    }, [dispatch])

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);

      if ( /.(jpg|png|gif|txt)\b/.test( file.name ) && /(image|text)\b/.test( file.type )) {
        setFile(file)
        setPreview(URL.createObjectURL(file))
        setTextCheck(file.name.includes('txt'))
        getBase64(file)
        console.log(loadFile)
      }      
    }

    function getBase64(file: File) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setLoadFile(reader.result?.toString()!)
      };
      reader.onerror = function (error) {
        setErrorLoad(error)
      };
   }

   function getMessage() {
      const text64 = Buffer.from(text, 'utf8').toString('base64') 

      const message: IMessage = {
        id: NIL_UUID,
        messageId: messageId,
        name:  name,
        email: email,
        homePage: homePage,
        layer: 0,
        text: text64,
        created: new Date(),
        loadFile: loadFile,
      }
      return message
   }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const message = getMessage()

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
            className="border py-2 mt-2 px-4 w-full outline-0 resize-none max-h-[500px]"
            placeholder="Type your message here"
            onChange={e => setText(e.target.value)}
          />

          <label className="block mb-1 mt-1 text-normal font-medium text-gray-900 dark:text-gray-300">Image file</label>
          <div className='border form-control block w-full px-3 py-1.5 mb-3'>
            <label htmlFor="selectFile" className="w-full hover:bg-gray-500 hover:text-white hover:transition-all">{ `Select: ${selectFile?.name!}` }</label>
            <input type="file" id="selectFile"
                onChange={handleFileInput} multiple={false} style={{display:'none'}}/>              
          </div>
          {selectFile && !textCheck && <img src={preview} className="p-1 mx-auto mb-3 w-52 bg-white border rounded max-w-sm" alt="..." /> }
          {selectFile && textCheck && <img src='../28878.png' className="p-1 mx-auto mb-3 w-52 bg-white border rounded max-w-sm" alt="..." /> }

          { errorLoad && <p className='text-center text-lg'>Loading error</p>}
          { create && <p className='text-center text-lg'>The message is created</p>}
          { error && <p className='text-center text-lg text-red-600'>{error}</p>}
          
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY!} />
          <div className='flex'>
              <button type="submit"
              className="border py-2 px-4 mr-1 flex-auto hover:bg-gray-500 hover:text-white hover:transition-all"
              >Create</button>
              <button type="button" onClick={open}
              className="border py-2 px-4 ml-1 flex-auto hover:bg-gray-500 hover:text-white hover:transition-all"
              >Preview</button>
          </div>

          {modal && <Modal onClose={close} >
            <ViewMessage message={getMessage()} />
          </Modal>}

      </form>
      </>
    )
}