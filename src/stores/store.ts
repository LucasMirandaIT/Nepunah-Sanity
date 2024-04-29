import { configureStore } from "@reduxjs/toolkit";

import globalReducer from './global/globalSlice';

export const store = configureStore({
    reducer: {
        global: globalReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type ApPDispatch = typeof store.dispatch;