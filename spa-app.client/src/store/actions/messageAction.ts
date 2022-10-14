import { AppDispatch } from "../index"
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

// export const createMessage = (id: string, message: string) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//       try {
//         const access = getState().authReducer.access
//         await axios.post(`airports/${airportId}/comments`, {comment}, {
//           headers: {
//             Authorization: `Bearer ${access}`
//           }
//         })
//         // todo: replace backend response
//         dispatch(addingSlice.actions.addComment({
//           user: {username: 'Vladilen'},
//           created: '12.12.2022',
//           message,
//           id: Math.random()
//         }))
//       } catch (e) {
//         console.log(e)
//       }
//     }
//   }