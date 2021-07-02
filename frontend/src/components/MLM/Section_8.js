import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';

import ImgUSDT from '../../img/usdt.svg'
import ImgLogo from '../../img/logo.webp'
import { NF } from '../../util';
import Metamask from '../../connector';
import Loading from '../Layout/Loading';


const Section = styled.section`
	margin-top: 100px;
	h2 {
		margin-bottom: 1em;

	}
	button.h3 {
		margin-bottom: 0;
	}
	
	.icon {
		width: 1em;
		height: 1em;
	}
	.content_wrapper {
		border-radius: 20px;
		padding: 20px;

	}
	.btn_control_tab{
		.btn_custom_group{
			border-radius: 20px;
			overflow: hidden;
			.btn{
				border-radius: 20px;
			}
		}
	}
`
const Dialog = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgb(0 0 0 / 20%);
	z-index: 100;
	.dialog {
		position: fixed;
		width: 800px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #424242;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
		z-index: 100;
		@media (max-width: 768px) {
			width: 600px;
		}
		@media (max-width: 576px) {
			width: 90%;
		}
	}
`;

const TYPE_BUY = 1;
const TYPE_SELL = 2;
function TradeDialog(props) {
	const dispatch = useDispatch();
	const {type,amount,amount2} = props;
	const [status, setStatus] = useState({
		allowance: null,
		err: null,
		loading: type===TYPE_BUY,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	useEffect(() => {
		if (!contract.address) {
			Metamask.connect(dispatch);
		} else {
			if (type===TYPE_BUY && status.allowance===null) {
				Metamask.allowance(contract.address).then(res=>setStatus({...status, loading:false, allowance:res}));
			}
		}
	});
	const handleApprove = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.approve(contract.address, amount).then(res=>{
			if (res.txid) {
				const txid = res.txid;
				Metamask.waitTransaction(res.txid).then(res=>{
					if (res===true) {
						Metamask.allowance(contract.address).then(res=>setStatus({...status, txid, err: null, loading:false, allowance:res}));
					} else {
						setStatus({...status, loading:false, txid, err: res===false ? '失败合约授权' : '无知错误'});
					}
				})
			} else {
				setStatus({...status, loading:false, err:res.err || '无知错误'});
			}
		});
	}
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask[type===TYPE_BUY?'buy':'sell'](contract.address, amount).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = '失败' + (type===TYPE_BUY?'购买交易':'出售交易');
					} else if (res===null) {
						err = '无知错误';
					}
					setStatus({...status, loading:false, completed:true, txid, err});
				})
			} else {
				setStatus({...status, loading:false, txid: null, ...res});
			}
		});
	}

	return (
		<Dialog>
			{status.loading?<Loading/>:null}
			{type===TYPE_BUY ? (
				<div className="dialog">
					<h3 className="mb-4">购买TLB</h3>
					<h4 className="mb-4">USDT {amount ? NF(amount,Metamask.precisionUsdt) : '-'} {contract._usdt<amount ? <span className="text-danger">余额不够</span> : null}</h4>
					<h4 className="mb-4">TLB {amount2 ? NF(amount2,Metamask.precisionTlb) : '-'}</h4>
					{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
					{status.txid ? <div className="text-center">交易哈希 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
					<div className="text-center mt-3">
						{(status.completed || amount<=0 || contract._usdt<amount) ? null : (
							status.allowance < amount ? (
								<button onClick={()=>handleApprove()} className="h4 btn btn-outline-info text-white">合约授权</button>
							) : (
								<button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">提交</button>
							)
						)}
						<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">取消</button>
					</div>
				</div>
			) : (
				<div className="dialog">
					<h3 className="mb-4">出售TLB</h3>
					<h4 className="mb-4">TLB {NF(amount,Metamask.precisionTlb)} {contract._tlb<amount ? <span className="text-danger">余额不够</span> : null}</h4>
					<h4 className="mb-4">USDT {NF(amount2,Metamask.precisionUsdt)}</h4>
					{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
					{status.txid ? <div className="text-center">交易哈希 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
					<div className="text-center mt-3">
						{(status.completed || contract._tlb<amount) ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">提交</button>}
						<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">取消</button>
					</div>
				</div>
			)}
		</Dialog>
	);
}
function CancelDialog(props) {
	const [status, setStatus] = useState({
		err: null,
		loading: false,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask['cancel'+(props.type===TYPE_BUY?'Buy':'Sell')+'Order'](contract.address).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = '失败撤销挂单';
					} else if (res===null) {
						err = '无知错误';
					}
					setStatus({...status, loading:false, txid, err});
				})
			} else {
				setStatus({...status, loading:false, txid: null, ...res});
			}
		});
	}

	return (
		<Dialog>
			{status.loading?<Loading/>:null}
			<div className="dialog">
				<h3 className="mb-4">撤销{(props.type===TYPE_BUY?'购买':'出售')}挂单</h3>
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">交易哈希 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{status.completed ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">提交</button>}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">取消</button>
				</div>
			</div>
		</Dialog>
	);
}

function Section_8(props) {
	let [status,setStatus] = useState({
		type: TYPE_BUY,
		trade: false,
		cancel: false,
		amount: 0
	});
	
	let contract = useSelector(state => state.contract);
	const amount2 = contract.price ? Number(status.type===TYPE_BUY?(status.amount/contract.price).toFixed(Metamask.precisionTlb):(status.amount*contract.price*0.998).toFixed(6)) : '';

	console.log(NF(contract._usdt, 6));
	console.log(NF(contract._tlb, Metamask.precisionTlb));
	const balance = contract.address ? (status.type===TYPE_BUY ? NF(contract._usdt, 6) + ' USDT' : NF(contract._tlb, Metamask.precisionTlb) + ' TLB') : '-';

	const changeAmount = (amount) => {
		setStatus({...status, amount});
	}
	return (
		<Section>
			<h2 className="text-center">
				TLBstaking
			</h2>
			<div className="content_wrapper bg_blue_9">
				<div className="btn_control_tab">
					<div className="btn-group btn_custom_group d-flex w-100 bg_a4">
						<button onClick={()=>setStatus({...status, type:TYPE_BUY})}  className={"h3 btn text-white w-50 " + (status.type===TYPE_BUY ? 'bg_cyan2' : '')}>买入</button>
						<button onClick={()=>setStatus({...status, type:TYPE_SELL})} className={"h3 btn text-white w-50 " + (status.type===TYPE_SELL ? 'bg_cyan2' : '')}>售出</button>
					</div>
				</div>
				<div className="d-flex align-items-center  justify-content-between mt-3 text-white mt-md-5">
					<strong>余额：{balance}</strong>
					<button onClick={()=>changeAmount(status.type===TYPE_BUY?contract._usdt:contract._tlb)} className="text-white-50 btn muted-0 rounded-3 pill_max px-3 text-center">
						MAX
					</button>
				</div>

				<div className="h3 select_form_wrapper p-2 bg-white rounded-3 d-flex align-items-center">
					<div className="form-group d-flex align-items-center">
						<img className="icon" src={status.type===TYPE_BUY?ImgLogo:ImgUSDT} alt="" />
						<span className="text-black-50">{status.type===TYPE_BUY?'USDT':'TLB'}</span>
					</div>
					<div className="form-group flex-grow-1 w-75 d-flex">
						<input onChange={(e)=>changeAmount(Number(e.target.value))} type="number" max="1000000" min="0" value={status.amount} className="input_focus_off w-100 text-end bg_transparent border-0 rounded-0 line_height_int" />
					</div>
				</div>

				<div className="text-center p-4">
					<i className="h3 far fa-arrow-alt-circle-down"></i>
				</div>

				<div className="h3 select_form_wrapper p-2 bg-white rounded-3 d-flex align-items-center">
					<div className="form-group d-flex align-items-center">
						<img className="icon" src={status.type===TYPE_BUY?ImgUSDT:ImgLogo} alt="" />
						<span className="text-black-50">{status.type===TYPE_BUY?'TLB':'USDT'}</span>
					</div>
					<div className="form-group flex-grow-1 w-75 d-flex">
						<input readOnly value={amount2} className="input_focus_off w-100 text-end bg_transparent border-0 rounded-0 line_height_int" />
					</div>
				</div>

				<div className="d-flex justify-content-center align-items-center">
					<h4 className="text-center mb-0  text-white me-3 me-md-5">
						{status.type===TYPE_BUY?'1 TLB = ' + contract.price + 'USDT':'1 USDT = ' + (1/contract.price).toFixed(Metamask.precisionTlb) + ' TLB'}
					</h4>
					<button className="h3 btn btn-muted m-0 p-2 ms-3 ms-md-5 text-white rounded-0">
						<i className="fas fa-sync-alt"></i>
					</button>
				</div>
				<br /><br /><br />
				<div className="btn_control_exchange d-flex justify-content-center">
					<button onClick={()=>setStatus({...status, trade:true})} className="h4 btn me-1 me-md-3 radius_left_side_pill bg-white text-black-50 flex-grow-1">
						确认交易
					</button>
					<button onClick={()=>setStatus({...status, cancel:true})} className="h4 btn ms-1 ms-md-3 radius_right_side_pill bg-white text-black-50 flex-grow-1">
						撤销挂单
					</button>
				</div>
			</div>
			{status.trade  ? <TradeDialog  handleClose={()=>setStatus({...status,trade:false})}  type={status.type} amount={status.amount} amount2={amount2} /> : null}
			{status.cancel ? <CancelDialog handleClose={()=>setStatus({...status,cancel:false})} type={status.type} /> : null}
		</Section>
	);
}

export default Section_8;