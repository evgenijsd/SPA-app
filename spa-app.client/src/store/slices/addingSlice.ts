import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { NIL as NIL_UUID } from 'uuid';

interface AddingState {
  error: string
  create: boolean
}

const initialState: AddingState = {
  error: '',
  create: false
}

export const addingSlice = createSlice({
  name: 'adding',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<string>) {
      state.create = action.payload !== NIL_UUID
      state.error = ''
    },
    addMessageError(state, action: PayloadAction<Error>) {
      state.create = false
      state.error = action.payload.message
    }, 
    add(state) {
      state.create = false
      state.error = ''
    }
  }
})

export default addingSlice.reducer