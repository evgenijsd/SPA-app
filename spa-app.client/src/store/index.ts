import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import messageReducer from './slices/messageSlice'

const rootReducer = combineReducers({
    message: messageReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']