import Web3 from 'web3';
import JSBI from 'jsbi';

import { contractSlice } from './reducer';
import abiTlb from './config/TLBStaking.json';
import abiErc20 from './config/erc20.json';
import config from './config/v1.json';

const blockExplorer = process.env.REACT_APP_BLOCK_EXPLORER;
const blockTime = (Number(process.env.REACT_APP_BLOCKTIME) || 3)*1000;
const chainId = Number(process.env.REACT_APP_CHAIN_ID);
const contractUsdt = config[chainId].usdt.contract;
const precisionUsdt = config[chainId].usdt.precision;
const contractTlb = config[chainId].tlb.contract;
const precisionTlb = config[chainId].tlb.precision;

export default class Metamask {
	static explorer = blockExplorer;
	static contract = contractTlb;
	static address;
	static timeHandler;
	static start(dispatch) {
		return new Promise(resolve=>{
			if (this.timeHandler) clearTimeout(this.timeHandler);
			this.getInfo(dispatch,this.address).then(()=>resolve(true));
			this.timeHandler = setTimeout(()=>this.start(dispatch),blockTime);
		})
	}
	static connect(dispatch) {
		return new Promise(resolve=>{
			const {ethereum} = window;
			if (ethereum) {
				try {
					ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts)=>{
						console.log(accounts[0]);
						if (accounts.length) {
							const address = accounts[0];
							const currrentChainId = await this.getChainId();
							if (chainId===currrentChainId) {
								this.address = address;
								dispatch(contractSlice.actions.login(address));
								this.getInfo(dispatch,address);
								resolve({status:'ok', data:address});
							} else {
								resolve({status:'err', data: `🦊 Invalid chainid. expected [${chainId}]`});
							}
						} else {
							resolve({status:'err', data: "🦊 No selected address."});
						}
					});
					ethereum.on('accountsChanged', (accounts) => {
						if (accounts.length) {
							this.address = accounts[0];
							dispatch(contractSlice.actions.login(this.address));
							this.getInfo(dispatch,this.address);
							resolve({status:'ok', data:this.address});
						} else {
							dispatch(contractSlice.actions.logout());
						}
					});
					ethereum.on('chainChanged', (currentChainId) => {
						if (chainId===currentChainId) {
							this.getInfo(dispatch,this.address);
							resolve({status:'ok', data:this.address});
						} else {
							dispatch(contractSlice.actions.logout());
							resolve({status:'err', data: `🦊 Invalid chainid. expected [${chainId}]`});
						}
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
	
	static validAddress(address) {
		if (Web3) {
			const web3 = new Web3();
			return web3.utils.isAddress(address)
		}
		return false;
	}
	static async call(to, method, ...args) {
		try {
			if (window.web3) {
				const web3 = new Web3(process.env.REACT_APP_NETWORK_URL);
				let contract = new web3.eth.Contract(to===contractUsdt?abiErc20:abiTlb, to);
				let res = await contract.methods[method](...args).call();
				return res;
			}
			return {err: '无知错误'};
		} catch (err) {
			return {err};
		}
	}
	static async callBySigner(to, method, ...args) {
		try {
			const {ethereum} = window;
			if (ethereum) {
				const web3 = new Web3(ethereum);
				let contract = new web3.eth.Contract(to===contractUsdt?abiErc20:abiTlb, to, {from: this.address});
				let data = contract.methods[method](...args).encodeABI();
				const json = {from: this.address, to, value: 0x0, data};
				const res = await ethereum.request({method: 'eth_sendTransaction',params: [json]});
				if (res) return {txid: res};
			}
			return {err: '无知错误'};
		} catch (err) {
			return {err:err.message};
		}
	}
	
	 static async waitTransaction(txnHash, blocksToWait=1) {
		try {
			if (window.web3) {
				const web3 = new Web3(process.env.REACT_APP_NETWORK_URL);
				let repeat = 100;
				while(--repeat > 0) {
					let time = +new Date();
					let receipt = await web3.eth.getTransactionReceipt(txnHash);
					if (receipt) {
						let resolvedReceipt = await receipt;
						if (resolvedReceipt && resolvedReceipt.blockNumber){
							let block = await web3.eth.getBlock(resolvedReceipt.blockNumber);
							let current = await web3.eth.getBlock("latest");
							if (current.number - block.number >= blocksToWait) {
								let txn = await web3.eth.getTransaction(txnHash);
								if (txn.blockNumber != null) return Number(resolvedReceipt.status)===1;
							}
						}
					}
					let delay = blockTime - (+new Date() - time);
					if (delay<1000)  delay = 1000;
					await new Promise(resolve=>setTimeout(resolve,delay));
				}
			}
		} catch (e) {
			return null;
		}
	}
	static async getInfo(dispatch,address) {
		if (window.web3) {
			const result = {};
			const web3 = new Web3(process.env.REACT_APP_NETWORK_URL);
			let res = await web3.eth.getBlockNumber();
			if (res) {
				result.blockHeight = Number(res);
			}
			/* res = await this.call(contractTlb, 'insuranceAmount');
			if (res) {
				result.insuranceAmount = Math.round(Number(res) / 10 ** precisionUsdt) * 0.05;
			} */
			
			let p1 = 10**precisionTlb;
			let p2 = 10**precisionUsdt;
			res = await this.call(contractTlb, 'contractInfo');
			if (res) {
				let i = 0;
				result.price = 			Number(res[i++]) / p2;
				result.totalDeposit = 	Number(res[i++]) / p2;
				result.redeemAmount = 	Number(res[i++]) / p2;
				result.totalSupply = 	Number(res[i++]) / p1;
				result.totalBurnt = 	Number(res[i++]) / p1;
				result.insuranceCounterTime = Number(res[i++]);
				result.totalPower = 	Number(res[i++]);
				result.minerCount = 	Number(res[i++]);
				result.insuranceAmount= Number(res[i++]) / p2;
			}
			if (address) {
				res = await this.call(contractUsdt, 'balanceOf', address);
				if (res) {
					result._usdt = Math.round(Number(res) / p2);
				}
				res = await this.call(contractTlb, 'accountInfo', address);
				if (res) {
					let i = 0;
					result._userid = 		Number(res[i++]);
					result._tlb = 			Number(res[i++]) / p1;
					result._lastAmount = 	Number(res[i++]) / p2;
					result._deposit = 		Number(res[i++]) / p2;
					result._withdrawal = 	Number(res[i++]) / p2;
					result._limit = 		Number(res[i++]) / p2;
					result._minerCount = 	Number(res[i++]);
					result._minerRefTotal = Number(res[i++]);
					result._children = 		Number(res[i++]);
					result._contribution = 	Number(res[i++]) / p2;
				}
				res = await this.call(contractTlb, 'profits', address);
				if (res) {
					let i = 0;
					result._overflowed = 	res[i++];
					result._staticRewards = Number(res[i++]) / p2;
					result._dynamicRewards= Number(res[i++]) / p2;
					result._rewards = 		Number(res[i++]) / p2;
					result._withdrawable = 	Number(res[i++]) / p2;
				}
			}
			if (Object.keys(result).length) {
				console.log('info',result);
				dispatch(contractSlice.actions.updateInfo(result));	
			}
		}
		return null;
	}
	
	static async allowance() {
		let res = await this.call(contractUsdt, 'allowance', this.address, contractTlb)
		if (res) {
			console.log('allowance',res);
			return Number(res) / 10 ** precisionUsdt;
		}
		return null;
	}
	static async amountForDeposit(amount) {
		let res = await this.call(contractTlb, 'amountForDeposit', amount * 10 ** precisionUsdt)
		if (res) {
			console.log('amountForDeposit',res);
			return Number(res) / 10 ** precisionTlb;
		}
		return null;
	}
	static async amountForWithdraw(address) {
		let res = await this.call(contractTlb, 'amountForWithdraw', address)
		if (res) {
			console.log('amountForWithdraw',res);
			return Number(res) / 10 ** precisionTlb;
		}
		return null;
	}
	
	static approve(amount) {
		return this.callBySigner(contractUsdt, 'approve', contractTlb, amount * 10 ** precisionUsdt);
	}
	static deposit(referalLink, amount) {
		return this.callBySigner(contractTlb, 'deposit', referalLink, amount * 10 ** precisionUsdt);
	}
	static withdraw() {
		return this.callBySigner(contractTlb, 'withdraw');
	}
}