import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMessage } from "../../models/models"

interface MessageChildState {
    loading: boolean
    error: string
    count: number
    pageCount: number
    messages: IMessage[]
}

const initialState: MessageChildState = {
    loading: false,
    error: '',
    count: 0,
    pageCount: 0,
    messages: []
}

interface MessageChildPayload {
    messages: IMessage[],
    pageCount: number,
    count: number
}

export const messageChildSlice = createSlice({
    name: 'messageChild',
    initialState,
    reducers: {
        fetchingChild(state) {
            state.loading = true
        },
        fetchingChildSuccess(state, action: PayloadAction<MessageChildPayload>) {
            state.loading = false
            state.messages = action.payload.messages
            state.count = action.payload.count
            state.pageCount = action.payload.pageCount
            state.error = ''
        },
        fetchingChildError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default messageChildSlice.reducer