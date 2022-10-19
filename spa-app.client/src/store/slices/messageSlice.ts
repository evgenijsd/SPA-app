import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMessage } from "../../models/models"

interface MessageState {
    loading: boolean
    error: string
    count: number
    pageCount: number
    messages: IMessage[]
}

const initialState: MessageState = {
    loading: false,
    error: '',
    count: 0,
    pageCount: 0,
    messages: []
}

interface MessagePayload {
    messages: IMessage[],
    pageCount: number,
    count: number
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchingSuccess(state, action: PayloadAction<MessagePayload>) {
            state.loading = false
            state.messages = action.payload.messages
            state.count = action.payload.count
            state.pageCount = action.payload.pageCount
            state.error = ''
        },
        fetchingError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default messageSlice.reducer