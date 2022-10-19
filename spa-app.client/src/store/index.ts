import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import messageReducer from './slices/messageSlice'
import messageChildReducer from './slices/messageChildSlice'
import addingReducer from './slices/addingSlice'

const rootReducer = combineReducers({
    messageReducer,
    messageChildReducer,
    addingReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']