import Web3 from 'web3';
import JSBI from 'jsbi';

import { contractSlice } from './reducer';
import abiTLBStaking from './abis/TLBStaking.json';
import abiErc20 from './abis/erc20.json';
import config from './config/v1.json';

export default class Metamask {
	static chainId = Number(process.env.REACT_APP_CHAIN_ID);
	static contract = config[this.chainId].tlb.contract;
	static precision = config[this.chainId].tlb.precision;
	static usdtPrecision = config[this.chainId].usdt.precision;
	static connect(dispatch) {
		return new Promise(resolve=>{
			const {ethereum} = window;
			if (ethereum) {
				try {
					ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts)=>{
						console.log(accounts[0]);
						if (accounts.length) {
							const chainId = await this.getChainId();
							console.log(chainId);
							if (chainId===this.chainId) {
								dispatch(contractSlice.actions.login(accounts[0]));
								resolve({status:'ok', data:accounts[0]});
							} else {
								resolve({status:'err', data: `🦊 Invalid chainid. expected [${this.chainId}]`});
							}
						} else {
							resolve({status:'err', data: "🦊 No selected address."});
						}
					});
					ethereum.on('accountsChanged', (accounts) => {
						window.location.reload();
						/* if (accounts.length) {
							dispatch(contractSlice.actions.login(accounts[0]));
						} else {
							dispatch(contractSlice.actions.logout());
						} */
					});
					ethereum.on('chainChanged', (chainId) => {
						window.location.reload();
					});
				} catch (error) {
					resolve({status:'err', data: "🦊 Connect to Metamask using the button on the top right."});
				}
			} else {
				resolve({status:'err', data: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"});
			}
		})
	}
	static async getChainId() {
		const {ethereum} = window;
		if (ethereum) return Number(await ethereum.request({ method: 'eth_chainId' }));
		return 0;
	}
	static get isConnected() {
		return window.ethereum && window.ethereum.isConnected();
	}
	static async getUserInfo(dispatch,address) {
		if (window.web3) {
			const result = {};
			const web3 = new Web3(window.ethereum);
			let contract = new web3.eth.Contract(abiErc20, config[this.chainId].usdt.contract);
			let res = await contract.methods.balanceOf(address).call();
			if (res) {
				result.usdt = Number(res)/10**config[this.chainId].usdt.precision;
			}

			contract = new web3.eth.Contract(abiTLBStaking, this.contract);
			res = await contract.methods.basicInfo(address).call();
			if (res) {
				let i = 0;
				let p1 = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(this.precision));
				let p2 = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(this.usdtPrecision));

				result.tps = 			Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p1));
				result.price = 			Number(JSBI.divide(JSBI.multiply(JSBI.BigInt(res[0][i++]),JSBI.BigInt(100)), p2))/100;
				result.totalDeposit = 	Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p2));
				result.redeemAmount = 	Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p2));
				result.totalSupply = 	Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p1));
				result.totalBurnt = 	Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p1));
				result.insuranceCounterTime = Number(res[0][i++]);
				
				result._tps = 			Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p1));
				result._deposit = 		Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p2));
				result._withdrawal = 	Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p2));
				result._limit = 		Number(JSBI.divide(JSBI.BigInt(res[0][i++]), p2));

				result._minerCount = 	Number(res[0][i++]);
				result.totalPower = 	Number(res[0][i++]);
				result._minerCount = 	Number(res[0][i++]);
				result._minerRefTotal = Number(res[0][i++]);

				result.referer = res[1];
			}

			if (Object.keys(result).length) {
				console.log(result);
				dispatch(contractSlice.actions.updateInfo(result));	
			}
		}
		return null;
	}
}