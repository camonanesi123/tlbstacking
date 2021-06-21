import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: null,
    },
    reducers: {
        login: (state, action) => {
            console.log(action);
            state.address = action.payload;
        },
        logout: state => {
            state.address = null;
        },
        rejected: state => {
            state.address = null;
        }
    }
});

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 200,
    },
    reducers: {
        increment: state => {
            state.value += 100
        },
        decrement: state => {
            state.value -= 100
        },
        redoCounterAction: state=> {
            state.value = 200
        }
        
    }
});


/* export const { 
    increment,
    decrement,
    redoCounterAction
} = counterSlice.actions */