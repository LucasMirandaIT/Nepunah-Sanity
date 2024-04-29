import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GlobalState {
    isCSR: boolean;
    isMobile: boolean;
}

const initialState: GlobalState = {
    isCSR: false,
    isMobile: false
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsCSR: (state, action: PayloadAction<boolean>) => {
            state.isCSR = action.payload;
        },
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
            
        },
    }
});

export const {setIsCSR, setIsMobile} = globalSlice.actions;

export default globalSlice.reducer;