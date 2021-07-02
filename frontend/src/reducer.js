import { createSlice } from '@reduxjs/toolkit';

export const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        address: null,
        referer: null,
        
        price: 0,
        totalDeposit: 0,
        redeemAmount: 0,
        totalSupply: 0,
        totalBurnt: 0,
        insuranceCounterTime: 0, 
        insuranceAmount: 0, 
        minerCount: 0, 
        minerWorkingPower: 0, 
        minerWorkingCount: 0, 
        minerTierPrice1: 0,
        minerTierPrice2: 0,
        minerTierPrice3: 0,
        minerTierPrice4: 0,

        minerTier1: 0,
        minerTier2: 0,
        minerTier3: 0,
        minerTier4: 0,
        minerList: [],

        
        _userid: 0,
        _tlb: 0,
        _usdt: 0,
        
        _lastAmount: 0,
        _deposit: 0,
        _withdrawal: 0,
        _limit: 0,  
        
        _overflowed: false,
        _staticRewards: 0,
        _dynamicRewards: 0,
        _rewards: 0,
        _withdrawable: 0,
        
        _children: 0,
        _contribution: 0,

        _minerTier: 0, 
        _mineType: 0,
        _mineBlockRewards: 0,
        _minerCount: 0, 
        _minerRefTotal: 0,
        _mineStatus: false,
        _mineLastBlock: 0,
        _mineLastTime: 0,
        _mineRewards: 0,
        _minePending: 0,
        _minePendingBlocks: 0,

        block: {
            number: 0,
            hash:null,
            time:0,
        },
        /* blockHash: 0,
        blockTime: 0, */
        allowance: 0,
        
        orders: [],
        pending: [],
        blocks: [],
        lastTime: 0


        
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
        update: (state,action) => {
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