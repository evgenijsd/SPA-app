import { AppDispatch, RootState } from "../index"
import axios from "../../axios"
import { IMessage, ITEMS_PER_PAGE, PAGE_DEFAULT, ServerResponse } from "../../models/models"
import { messageSlice } from "../slices/messageSlice"
import { messageChildSlice } from "../slices/messageChildSlice"
import { addingSlice } from "../slices/addingSlice"

export const fetchMessages = (pageNumber: number = PAGE_DEFAULT, pageSize: number = ITEMS_PER_PAGE) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(messageSlice.actions.fetching())
            const response = await axios.get<ServerResponse<IMessage>>('MessageOut/all', {
                params: { pageNumber, pageSize }
            })
            dispatch(messageSlice.actions.fetchingSuccess( {
                messages: response.data.result,
                pageCount: response.data.totalPages,
                count: response.data.totalCount
            }))
        } catch (e) {
            dispatch(messageSlice.actions.fetchingError(e as Error))
        }
    }
}

export const fetchChildMessages = (pageNumber: number = PAGE_DEFAULT, pageSize: number = ITEMS_PER_PAGE, id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(messageChildSlice.actions.fetchingChild())            
            const response = await axios.get<ServerResponse<IMessage>>(`MessageOut/${id}`, {
                params: { pageNumber, pageSize }
            })
            dispatch(messageChildSlice.actions.fetchingChildSuccess( {
                messages: response.data.result,
                pageCount: response.data.totalPages,
                count: response.data.totalCount
            }))
        } catch (e) {
            dispatch(messageSlice.actions.fetchingError(e as Error))
        }
    }
}

export const createMessage = (message: IMessage) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(addingSlice.actions.add())
        console.log(message)
        const response = await axios.post<string>(`MessageOut/add`, message)
        dispatch(addingSlice.actions.addMessage(response.data))
      } catch (e) {
        dispatch(addingSlice.actions.add())
        dispatch(addingSlice.actions.addMessageError(e as Error))
      }
    }
  }

  export const clearCreate = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(addingSlice.actions.add())        
    }
  }