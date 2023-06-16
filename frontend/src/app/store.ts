import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from "redux-logger";
import userSlice from "../features/user/userSlice";
import questionSlice from "../features/question/questionSlice";

const logger = createLogger()

const store = configureStore({
    reducer: {
        user: userSlice,
        question: questionSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
