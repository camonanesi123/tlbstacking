import { createSlice } from '@reduxjs/toolkit';

export const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        address: '',
        referer: '',
        
        tps: 0,
        usdt: 0,
        
        price: 0,
        lastAmount: 0,
        totalDeposit: 0,
        redeemAmount: 0,
        totalSupply: 0,
        totalBurnt: 0,
        insuranceCounterTime: 0, 
        insuranceAmount: 0, 
        totalPower: 0, 
        minerCount: 0, 
        
        _deposit: 0,
        _withdrawal: 0,
        _limit: 0,  
        _minerCount: 0, 
        _minerRefTotal: 0,

        _mineTier: 0,
        _mineStatus: false,
        _mineType: 0,

        _overflowed: false,
        _staticRewards: 0,
        _dynamicRewards: 0,
        _rewards: 0,
        _withdrawable: 0,
        
        _children: 0,
        _contribution: 0,

        blockHeight: 0,
        allowance: 0,
        

        
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
        },
        updateInfo: (state,action) => {
            for(let k in action.payload) {
                if (state[k]!==undefined) {
                    state[k] = action.payload[k];
                } else {
                    new Error('🦊 undefined account item')
                }
            }
        }
    }
});