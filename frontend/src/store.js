import {configureStore} from '@reduxjs/toolkit';
import { walletSlice, counterSlice } from './reducer'

export default configureStore({
    reducer: {
        counter: counterSlice.reducer,
        wallet: walletSlice.reducer,
    }
})