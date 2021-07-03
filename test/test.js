require("dotenv").config();

const RPCAPI = 'https://http-testnet.hecochain.com';

const fs = require('fs');
const request = require('request');
const Web3 = require('web3');
const web3 = new Web3(RPCAPI);


const privkeys = {};
const privkey = process.env.PRIVKEY;
const admin = '0xC048d30D209bbcD0319037d3ea6764774D3875E5';
const lee = '0x64297e2f974041514dF4A9326BB2e03400cdE622';
const zhang = '0x6ab63c36879C16A89ec81A3CFD928f50a2793F63';
const redeem = '0x0c2018C37c2EC91020e73897fB5Ae48e0C936bD3';
const pnode = '0x82bC5Cd564EA21642910796aE7Ec675772AE642F';

const sh = [];
const g = [];

let abiTlb = null;
let abiErc20 = null;

let contractTlb = null;
let precisionTlb = 0;
let contractUsdt = null;
let precisionUsdt = 0;


class Test {
    constructor() {
        const res = JSON.parse(fs.readFileSync(__dirname + '/../frontend/src/config/v1.json'));
        contractTlb = res[256].tlb.contract;
        precisionTlb = res[256].tlb.precision;
        contractUsdt = res[256].usdt.contract;
        precisionUsdt = res[256].usdt.precision;
        abiTlb = JSON.parse(fs.readFileSync(__dirname + '/../frontend/src/config/TLBStaking.json'));
        abiErc20 = JSON.parse(fs.readFileSync(__dirname + '/../frontend/src/config/erc20.json'));
        const lines = fs.readFileSync(__dirname + '/address.csv').toString().split(/\r\n|\r|\n/g);
        for(let v of lines) {
            const x = v.split(',');
            if (x[0].slice(0,2)==='sh') {
                sh.push(x[1]);
            } else {
                g.push(x[1]);
            }
            privkeys[x[1]] = x[2];
        }
        console.log('reading address');
        console.log('TLB =' + contractTlb);
        console.log('USDT =' + contractUsdt);
        console.log('PNode = 1');
        console.log('SH Count = '+sh.length);
        console.log('G Count = '+g.length);
    }
    async test() {
        let index = 0;
        for(let i=0; i<9; i++) {
            let parent = sh[i];
            let count = 0;
            for(let k=0; k<100; k++) {
                let addrs = [g[index]];//,g[index+1],g[index+2],g[index+3],g[index+4],g[index+5],g[index+6],g[index+7],g[index+8],g[index+9]
                let result = await this.callBySigner(admin, contractUsdt, 'addAccount', addrs, parent);
                if (result) {
                    count++;
                    console.log('SH'+(i+1) + ' <=' + count + ' / ' + index);
                } else {
                    continue;
                }
                index += 1;
            }
        }
        for(let i=index; i<4000; i+=10) {
            // let addrs = [g[i],g[i+1],g[i+2],g[i+3],g[i+4],g[i+5],g[i+6],g[i+7],g[i+8],g[i+9]];
            let parent = i = index ? sh[0] : g[i-10];
            let pt = i = index ? 'sh[0]' : 'g['+(i-10)+']';
            for(let k=0; k<10; k++) {
                let result = await this.callBySigner(admin, contractUsdt, 'addAccount', [addrs[i+k]], parent);
                if (result) {
                    console.log(pt + ' <=' + k + ' / ' + (i + k));
                } else {
                    break;
                }
            }
        }
    }
    callRPC(method,params,id=0) {
        if (id===0) id = Math.round(Math.random()*89999998)+10000001;
        return new Promise(resolve=>{
            request(RPCAPI,{method: "post",headers:{'Content-Type': 'application/json'},json:{jsonrpc:"2.0",method,params,id}},(error,res,body)=>{
                if (error) return resolve({error});
                resolve(body);
            })
        })
    }
    
    /* async sendTx(raw) {
        let res = await callRPC('eth_sendRawTransaction',[raw.hex]);
        if (res.error) {
            if (res.error.code===-32000) {
                console.log('insufficient funds for gas * price + value');
            } else {
                console.log(res.error.message);
            }
        }
    } */
    async call(to, method, ...args) {
        try {
            let contract = new web3.eth.Contract(to===contractUsdt?abiErc20:abiTlb, to);
            let res = await contract.methods[method](...args).call();
            return res;
        } catch (err) {
            return {err};
        }
    }
    async callBySigner(from, to, method, ...args) {
        try {
            let contract = new web3.eth.Contract(to===contractUsdt?abiErc20:abiTlb, to, {from});
            let data = contract.methods[method](...args).encodeABI();
            let gasPrice = 1e9; //await web3.eth.getGasPrice();
            let gasLimit = await contract.methods[method](...args).estimateGas();
            let json = {gasPrice, gasLimit, to, value: 0x0, data};
            let signedTx = await web3.eth.accounts.signTransaction( json, privkey);
            let txid;
            let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => txid = res);
            if (receipt && receipt.transactionHash) {
                return true;
            } else {
                console.log('failed', txid);
            }
        } catch (err) {
            console.log(err)
        }
        return false;
    }
    
    /* async waitTransaction(txnHash, blocksToWait=1) {
        try {
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
        } catch (e) {
            return null;
        }
    } */
    
}

new Test().test();
