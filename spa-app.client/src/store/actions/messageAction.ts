import { AppDispatch } from "../index"
import axios from "../../axios"
import { IMessage } from "../../models/models"
import { messageSlice } from "../slices/messageSlice"

export const fetchMessages = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(messageSlice.actions.fetching())
            const responce = await axios.get<IMessage[]>('MessageOut/all')
            dispatch(messageSlice.actions.fetchingSuccess(
                responce.data
            ))
            console.log(responce.data)
        } catch (e) {
            dispatch(messageSlice.actions.fetchingError(e as Error))
        }
    }
}