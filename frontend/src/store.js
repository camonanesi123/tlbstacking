import {configureStore} from '@reduxjs/toolkit';
import { contractSlice, counterSlice } from './reducer'

export default configureStore({
    reducer: {
        counter: counterSlice.reducer,
        contract: contractSlice.reducer,
    }
})