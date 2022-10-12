import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMessage } from "../../models/models"

interface MessageState {
    loading: boolean
    error: string
    messages: IMessage[]
}

const initialState: MessageState = {
    loading: false,
    error: '',
    messages: []
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchSuccess(state, action: PayloadAction<IMessage[]>) {
            state.loading = false
            state.messages = action.payload
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default messageSlice.reducer