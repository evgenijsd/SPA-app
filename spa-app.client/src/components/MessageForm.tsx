import React, { useContext, useEffect, useRef } from 'react';
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
import { isValidHtml, validationSchema } from '../validations/schema';
import { ValidationError } from 'yup';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'

interface MessageFormProps {
    messageId: string
}

const MAX_WIDTH = 320
const MAX_HEIGHT = 240

export function MessageForm({messageId}: MessageFormProps) {
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [homePage, setHomePage] = useState('')
    const [loadFile, setLoadFile] = useState('')
    const [selectFile, setFile] = useState<File>()
    const [preview, setPreview] = useState('')
    const [textCheck, setTextCheck] = useState(false)
    const [textValid, setTextValid] = useState(true)
    const [errorSize, setErrorSize] = useState(false)
    const [errorLoad, setErrorLoad] = useState<ProgressEvent<FileReader>>()
    const [errorValidate, setErrorValidate] = useState<string[]>([])
    const {modal, open, close} = useContext(ModalContext)
    const captchaRef = useRef<ReCAPTCHA>(null)
    
    const handleEditorChange = (content: string) => {      
      setText(content)
      setTextValid(true)
    };

    const dispatch = useAppDispatch()
    const { error, create } = useAppSelector(state => state.addingReducer)


    useEffect( () => {
        dispatch(clearCreate())
        var italic = Quill.import('formats/italic')
        italic.tagName = 'i'
        Quill.register(italic, true)
    }, [dispatch])

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);

      if ( /.(jpg|png|gif|txt)\b/.test( file.name ) && /(image|text)\b/.test( file.type )) {
        setFile(file)
        if (file.type.includes('text') && file.size > 102400) { setErrorSize(true); }
        setPreview(URL.createObjectURL(file))
        setTextCheck(file.name.includes('txt'))
        getBase64(file)
      }      
    }

    function getBase64(file: File) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (file.type.includes('image')){
          const img = new Image()
          img.src = e.target?.result?.toString()!
          img.onload = () => {
            const elem = document.createElement('canvas')
            const scaleWidth = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1
            const scaleHeight = img.height > MAX_HEIGHT ? MAX_HEIGHT / img.height : 1
            const scaleFactor = scaleWidth > scaleHeight ? scaleHeight : scaleWidth
            if (scaleFactor !== 1) {
              elem.width = img.width * scaleFactor
              elem.height = img.height * scaleFactor

              const ctx = elem.getContext('2d')
              ctx?.drawImage(img, 0, 0, img.width * scaleFactor, img.height * scaleFactor)

              setLoadFile(ctx?.canvas.toDataURL('image/jpeg', 1).toString()!)
            }
            else {
              setLoadFile(e.target?.result?.toString()!)
            }             
          }
        }
        else {
          setLoadFile(e.target?.result?.toString()!)
        }        
      };
      reader.onerror = function (error) {
        setErrorLoad(error)
      };
   }

   function getMessage(): IMessage {
      return {
        id: NIL_UUID,
        messageId: messageId,
        name:  name,
        email: email,
        homePage: homePage,
        layer: 0,
        text: Buffer.from(text, 'utf8').toString('base64'),
        created: new Date(),
        loadFile: loadFile,
        token: captchaRef.current?.getValue()!
      }
   }


    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const isValid = isValidHtml(text)
      setTextValid(isValid)
       
      const message = await validationSchema
          .validate(getMessage())
          .catch((e: ValidationError) => setErrorValidate(e.errors) )

      if (message && isValid) {
        setErrorValidate([])
        setErrorSize(false)
        setErrorLoad(undefined)
        dispatch(createMessage(message))
      }
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

          <div>
            <ReactQuill 
              theme="snow"
              value={text}
              placeholder="Type your message here..."
              modules={{
                toolbar: ['bold', 'italic', 'code', 'link'],
              }} 
              onChange={handleEditorChange}/>
          </div>

          <label className="block mb-1 mt-1 text-normal font-medium text-gray-900 dark:text-gray-300">Load file(image/text)</label>
          <div className='border form-control block w-full px-3 py-1.5 mb-3'>
            <label htmlFor="selectFile" className="w-full hover:bg-gray-500 hover:text-white hover:transition-all">{ `Select: ${selectFile?.name!}` }</label>
            <input type="file" id="selectFile"
                onChange={handleFileInput} multiple={false} style={{display:'none'}}/>              
          </div>
          {selectFile && !textCheck && <img src={preview} className="p-1 mx-auto mb-3 w-52 bg-white border rounded max-w-sm" alt="..." /> }
          {selectFile && textCheck && <img src='../28878.png' className="p-1 mx-auto mb-3 w-52 bg-white border rounded max-w-sm" alt="..." /> }

          { errorLoad && <p className='text-center text-lg text-red-600'>Loading error</p>}
          { errorSize && <p className='text-center text-lg text-red-600'>File is too big</p>}
          { errorValidate && <p className='text-center text-lg text-red-600'>{errorValidate[0]}</p>}
          { create && <p className='text-center text-lg'>The message is created</p>}
          { error && <p className='text-center text-lg text-red-600'>{error}</p>}
          { !textValid && <p className='text-center text-lg text-red-600'>Tex is not valid</p>}

          
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY!} ref={captchaRef} />
          <div className='flex mt-3'>
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