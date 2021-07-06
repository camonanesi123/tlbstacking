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

const setlog = (title=null)=>{
	let date = new Date();
	/* let y=date.getUTCFullYear();
	let m=date.getUTCMonth() + 1;
	let d=date.getUTCDate(); */
	let hh=date.getUTCHours();
	let mm=date.getUTCMinutes();
	let ss=date.getUTCSeconds();
	/* let datetext = [y,("0" + m).slice(-2),("0" + d).slice(-2)].join('-'); */
	let timetext = [("0" + hh).slice(-2),("0" + mm).slice(-2),("0" + ss).slice(-2)].join(':');
	let data = `[${timetext}] ${title}`;
	fs.appendFileSync(__dirname+'/tlb.log',data+'\r\n');
	console.log(data);
}

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
        let k = 0;
        let index = 170;
        if (index===0) {
            for(let i=0; i<9; i++) {
                let parent = sh[i];
                k = 0;
                while(k<10) {
                    let result = await this.callBySigner(admin, contractUsdt, 'addBulk', [
                        g[index],
                        g[index+1],
                        g[index+2],
                        g[index+3],
                        g[index+4],
                        g[index+5],
                        g[index+6],
                        g[index+7],
                        g[index+8],
                        g[index+9]
                    ], parent);
                    if (result) {
                        setlog(`success sh${i} > ${k+1} ~ ${k+10} / ${index}\t${parent}\t${g[index]}`);
                        k+=10;
                        index+=10;
                        continue;
                    } else {
                        setlog(`failed sh${i} > ${k+1} / ${index}\t${parent}\t${g[index]}`);
                    }
                    await new Promise(resolve=>setTimeout(resolve,300));
                }
            }
        }
        
        while(index<10000) {
            let parent = g[index-5];
            /* k = 0; */
            /* while(k<5) { */
                if (index>=10000) return;
                let result = await this.callBySigner(admin, contractUsdt, 'addBulk', [
                    g[index],
                    g[index+1],
                    g[index+2],
                    g[index+3],
                    g[index+4]
                ], parent);
                if (result) {
                    setlog(`success g${index-5} > 5 / ${index}\t${parent}\t${g[index]}`);
                    /* k+=5; */
                    index+=5;
                    continue;
                } else {
                    setlog(`failed g${index-5} > 5 / ${index}\t${parent}\t${g[index]}`);
                }
                await new Promise(resolve=>setTimeout(resolve,300));
            /* } */
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
}




new Test().test();
/* 


const _minerlist =  [1,2,3,4,5,6,7,8,9,10];
let count = 10;
let k = 0;
let i = 0;

for(i = count - 1;i > k; i--) {
    _minerlist[i] = _minerlist[i-1];
}
_minerlist[0] = 11;
console.log(_minerlist); */