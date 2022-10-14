import {IMessage} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface AddingState {
  comments: IMessage[]
  loading: boolean
  error: string
}

const initialState: AddingState = {
  comments: [],
  loading: false,
  error: ''
}

export const addingSlice = createSlice({
  name: 'adding',
  initialState,
  reducers: {
    commentFetching(state) {
      state.loading = true
    },
    commentFetchingSuccess(state, action: PayloadAction<IMessage[]>) {
      state.loading = false
      state.error = ''
      state.comments = action.payload
    },
    commentFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
    addComment(state, action: PayloadAction<IMessage>) {
      state.comments.push(action.payload)
    }
  }
})

export default addingSlice.reducer