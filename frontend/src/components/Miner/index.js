import React,{useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch} from 'react-redux';
/* import { useHistory } from "react-router-dom"; */
import styled from 'styled-components';

import { contractSlice } from '../../reducer';
import {NF,TF} from '../../util';


import SynChart from '../reuse_components/SynChart/SynChart';

import Metamask from '../../connector';
import ImgCell from '../../img/btn-cell.webp'
import ImgUSDT from '../../img/usdt.svg'
import ImgTLB from '../../img/logo.webp'
import ImgCheck from '../../img/checkmark.png'
import ImgWechat from '../../img/social-wechat.webp'
import ImgGoogle from '../../img/social-google.webp'
import ImgYoutube from '../../img/social-youtube.webp'

import {IgrRadialGauge, IgrRadialGaugeModule} from 'igniteui-react-gauges';
import {IgrLegendModule, IgrItemLegendModule, IgrRingSeriesModule, IgrDoughnutChartModule, IgrItemLegend, IgrDoughnutChart, IgrRingSeries, IgrLegend, IgrCategoryChart, IgrCategoryChartModule} from 'igniteui-react-charts';

import Loading from '../Layout/Loading';

const mods = [
    IgrLegendModule,
	IgrItemLegendModule,
    IgrDoughnutChartModule,
	IgrRingSeriesModule,
	IgrRadialGaugeModule,
	IgrCategoryChartModule
];

mods.forEach((m) => m.register());

const Section = styled.section`
	.radius {
		border-radius: 10px;
	}
	.radius-button {
		border-radius: 5px;
	}
	div.address {
		&.btn  {
			text-transform: none;
		}
	}
	.top_bottom_cyan_bg {
		background: url(${ImgCell}) center/100% 100% no-repeat;
	}
	.content_wrapper {
		padding: 15px;
	}
	.wallet-panel {
		margin-bottom: 50px;
		text-align: right;
	}
	.gauge{
        position: relative;
		width: 100%;
		height: 100%;

		div.text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			text-align: center;
			
		}
    }
	ul.ad {
		img {
			height: 1em;
		}
	}
	div.buy {
		padding: 50px 30px 30px 30px;
		button {
			font-size: 1em;
			padding-left: 0;
			padding-top: 0.625rem;
			padding-right: 0;
    		padding-bottom: 0.5rem;
		}
	}
	.mode-selector {
		border-radius: .25rem;
		background-color: white;
		button {
			margin-bottom: 0 !important;
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
// https://codesandbox.io/examples/package/igniteui-react-charts
const Section_1_d = () => {
	let contract = useSelector(state => state.contract);
	const dispatch = useDispatch()
	const connectWallet = () => {
		Metamask.connect(dispatch);
	};
	
	
	const data = [
		{x:1597763454, y:0},
		{x:1597767054, y:10},
		{x:1597770654, y:20},
		{x:1597774254, y:40}
	];
	data.push({
		x: contract.block.time,
		y: contract.minerTotalPower
	});
	return (
		<Section>
			<div className="wallet-panel">
				{contract.address? (
					<div className="h4 address btn bg-success text-white">
						{contract.address.slice(0,8)+'***'+contract.address.slice(-4) }
					</div>
				) : (
					<button onClick={connectWallet} className="h4 btn bg-warning text-white">
						连接钱包
					</button>
				)}
			</div>
			<h4 className=" text-end text-white mb-2 mb-md-4">
				全网实时算力
			</h4>
			<div className="content_wrapper">
				<IgrCategoryChart
					height="200px"
					width="100%"

					chartType="Spline"
					dataSource={data}
					xAxisFormatLabel={(item)=>{
						const date = new Date(item.x * 1000);
						const h = date.getHours();
						const m = date.getMinutes();
						return (h>9?'':'0') + h + ':' + (m>9?'':'0') + m;
					}}
					/* yAxisFormatLabel={(item)=>''} */
					/* yAxisInterval={10}
					yAxisMinimumValue={0}
					yAxisMaximumValue={50} */
					/* xAxisLabelLocation="none" */
					/* yAxisLabelLocation="OutsideRight" */
					includedProperties={['x','y']}
					thickness={2}

					/* calloutsVisible={this.state.calloutsVisible} */
					/* calloutsXMemberPath="index"
					calloutsYMemberPath="value" */
					/* calloutsLabelMemberPath="info" */

					/* crosshairsSnapToData={false} */
					/* crosshairsDisplayMode={this.state.crosshairsMode}
					crosshairsAnnotationEnabled={this.state.crosshairsVisible}

					finalValueAnnotationsVisible={this.state.finalValuesVisible} */
					
					>
                </IgrCategoryChart>
			</div>
		</Section>
	)
}
const Section_2_d = () => {
	let contract = useSelector(state => state.contract);
	const totalSupply = (Math.round(contract.totalSupply/100)/100) + ' 万枚';
	const circulating = (Math.round((contract.totalSupply-contract.totalBurnt)/100)/100) + ' 万枚';
	const totalBurnt = contract.totalBurnt>10000 ? (Math.round(contract.totalBurnt/100)/100) + '万枚' : contract.totalBurnt + 'TLB';
	
	return (
		<Section>
			<div className="content_wrapper bg_blue_9 px-2 py-3 py-md-5 radius">
				<table className="w-100 text-center">
					<tbody>
						<tr className="text-white">
							<td>总发行量</td>
							<td>当前流通量</td>
							<td>当前销毁</td>
						</tr>
						<tr className="text_cyan">
							<td className="pb-3 pb-md-5">{totalSupply}</td>
							<td className="pb-3 pb-md-5">{circulating}</td>
							<td className="pb-3 pb-md-5">{totalBurnt}</td>
						</tr>
						<tr className="text-white">
							<td>区块高度</td>
							<td>出块时间</td>
							<td>活跃矿工</td>
						</tr>
						<tr className="text_cyan">
							<td>{contract.block.number}</td>
							<td>00：03</td>
							<td>{contract.minerCount}个 / {contract.minerTotalPower} T</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Section>
	)
}

const Section_3_d = () => {
	let contract = useSelector(state => state.contract);
	return (
		<Section>
			<div className="content_wrapper bg_blue_9 p-3 radius">
				<div className="chart_wrapper">
					<div className="row no-gutters">
						<div className="col-7">
							<div className="gauge">
								<div className="text" style={{backgroundColor:'#267a8e'}}>
									我的算力<br/>
									{contract.address ? contract._minerTier + ' T' : '-'}
								</div>
								<IgrRadialGauge
									transitionDuration={0}
									height="100%"
									width="100%"
									value={40}
									interval={5}
									minimumValue={0}
									maximumValue={80}

									labelInterval={10}
									labelExtent={0.71}
									minorTickCount={5}
									minorTickEndExtent={.85}
									minorTickStartExtent={.8}
									minorTickStrokeThickness={1}
									minorTickBrush = "#0dbafa"
									TickBrush = "#0dbafa"
									tickBrush="#0dbafa"
									tickEndExtent={.85}
									tickStartExtent={.8}
									tickStrokeThickness="2"
									needleShape="None"
									backingBrush="#267a8e"
									backingOutline="#2b5a6c"
									backingStrokeThickness={10}
									scaleStartAngle={140}
									scaleEndAngle={40}
									scaleBrush="#0b8fed"
									rangeBrushes="267a8e"
									rangeOutlines="#267a8e" />
							</div>
							
						</div>
						<div className="col-5">
							<div className="text-center ">
								<div className="txt_wrapper top_bottom_cyan_bg py-3">
									<h4 className="text_cyan">{contract.address ? contract._minerCount : '-'}</h4>
									<span>我的矿工</span>
								</div>
								<div className="txt_wrapper top_bottom_cyan_bg py-3 mt-5">
									<h4 className="text_cyan">{contract.address ? contract._minerRefTotal : '-'}</h4>
									<span>矿工贡献算力</span>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="txt_wrapper mt-5">
					<h4 className="mb-3">
						招募更多矿工
					</h4>
					<div className="d-flex ">
						<input readOnly value={"https://"+window.location.host+"/mlm/"+contract.address} className="form-control w-100" />
						<button className="btn btn-muted bg_cyan text-white ms-2 text-nowrap radius-button">
							点击复制
						</button>
					</div>
				</div>
				<div className="social_wrapper mb-3 mb-md-5 mt-4">
					<div className="row justify-content-center">
						<div className="col-11">
							<ul className="ad list-unstyled flex-grow-1 m-0 p-0 d-flex align-items-center justify-content-between">
								<li>
									<a href="#"><i className="fab fa-facebook text-white"></i></a>
								</li>
								<li>
									<a href="#"><i className="fab fa-twitter text-white"></i></a>
								</li>
								<li>
									<a href="#"><i className="fab fa-linkedin-in text-white"></i></a>
								</li>
								<li>
									<a href="#"><i className="fab fa-tumblr text-white"></i></a>
								</li>
								<li>
									<a href="#"><img src={ImgWechat} alt="wechat" /></a>
								</li>
								<li>
									<a href="#"><img src={ImgGoogle} alt="google" /></a>
								</li>
								<li>
									<a href="#"><img src={ImgYoutube} alt="youtube" /></a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="footer_wrapper mt-5">
					<h4>我的资产</h4>
					<div className="row">
						<div className="col-6 d-flex align-items-start">
							<img style={{ height: '3em' }} src={ImgTLB} alt="TLB" />
							<div className="ms-2">
								<div className="text-white">TLB</div>
								<span className="text_cyan">
									{contract.address ? NF(contract._tlb,2) : '-'}
								</span>
							</div>
						</div>
						<div className="col-6 d-flex align-items-start">
							<span className="bg_cyan rounded-circle">
								<img className="bg_blue_9 rounded-circle" style={{ height: '3em' }} src={ImgUSDT} alt="bitcoin_sm" />
							</span>
							<div className="ms-2">
								<div className="text-white">USDT</div>
								<span className="text_cyan">
									{contract.address ? NF(contract._usdt,2) : '-'}
								</span>
							</div>
						</div>
					</div>
					
					<div className="text-center mt-5">
						<button className="btn btn-muted text-white border_cyan radius-button">
							查看更多
						</button>
					</div>
				</div>
			</div>
		</Section>
	)
}
const DLG_MODE = 1;
const DLG_BUY = 2;
const DLG_START = 3;
const DLG_WITHDRAW = 4;

function BuyDialog(props) {
	const dispatch = useDispatch();
	const {param} = props;
	const [status, setStatus] = useState({
		allowance: null,
		usdt: null,
		err: null,
		loading: true,
		txid: null,
		completed: false
	});
	
	const contract = useSelector(state => state.contract);
	const amount = contract['minerTierPrice'+param];
	useEffect(() => {
		if (!contract.address) {
			Metamask.connect(dispatch);
		} else {
			if (status.allowance===null) {
				Metamask.allowance(contract.address).then(res=>setStatus({...status, loading:false, allowance:res}));
			} else if (status.usdt===null) {
				Metamask.amountForDeposit(Number(amount)).then(res=>setStatus({...status, loading:false, usdt:res}));
			}
		}
	});
	const handleApprove = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.approve(contract.address, amount).then(res=>{
			if (res.txid) {
				const txid = res.txid;
				setStatus({...status, loading:true, err: null, ...res});
				Metamask.waitTransaction(res.txid).then(res=>{
					if (res===true) {
						Metamask.allowance(contract.address).then(res=>setStatus({...status, txid, err: null, loading:false, allowance:res}));
					} else {
						setStatus({...status, loading:false, txid, err: res===false ? '失败购买矿机' : '无知错误'});
					}
				})
			} else {
				setStatus({...status, loading:false, err:res.err || '无知错误'});
			}
		});
	}
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.buyMiner(contract.address, contract.referer, param-1).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = '失败购买矿机';
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
			<div className="dialog">
				<h3 className="mb-4">购买矿机</h3>
				<h4 className="mb-4">价格 USDT {NF(amount)}  {(contract._usdt>=amount) ? null : <span className="text-danger">余额不够</span>}</h4>
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">交易哈希 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._usdt<amount) ? null : (
						status.allowance < amount ? (
							<button onClick={()=>handleApprove()} className="h4 btn btn-outline-info text-white">合约授权</button>
						) : (
							<button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">提交</button>
						)
					)}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">取消</button>
				</div>
			</div>
		</Dialog>
	);
}

function StartDialog(props) {
	const [status, setStatus] = useState({
		err: null,
		loading: false,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.startMine(contract.address).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = '失败挖矿启动';
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
				<h3 className="mb-4">启动矿机</h3>
				{contract._mineStatus ? <div className="text-center text-success">矿机已经启动</div> : null}
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">交易哈希 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._mineStatus) ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">启动</button>}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">取消</button>
				</div>
			</div>
		</Dialog>
	);
}

function ModeDialog(props) {
	const [status, setStatus] = useState({
		err: null,
		loading: false,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	const {mode, param, title} = props;
	const handleSubmit = () => {
		/* setStatus({...status, loading:true, err:null, txid: null});
		Metamask.setMineType(contract.address, param).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = '失败挖矿模式更改';
					} else if (res===null) {
						err = '无知错误';
					}
					setStatus({...status, loading:false, txid, err});
				})
			} else {
				setStatus({...status, loading:false, txid: null, ...res});
			}
		}); */
	}

	return (
		<Dialog>
			{status.loading?<Loading/>:null}
			<div className="dialog">
				<h3 className="mb-4">{title}</h3>
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
function WithdrawDialog(props) {
	const [status, setStatus] = useState({
		err: null,
		loading: false,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.withdrawFromPool(contract.address).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = '失败提币';
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
				<h3 className="mb-4">领取收益</h3>
				<h4 className="mb-4">提现金额 {NF(contract._minePending)} TLB</h4>
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">交易哈希 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._minePending===0) ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">提交</button>}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">取消</button>
				</div>
			</div>
		</Dialog>
	);
}

const Section_4_d = () => {
	const contract = useSelector(state => state.contract);
	let [status,setStatus] = useState({
		open: 0,
		param: 0,
		title: ''
	});
	const dispatch = useDispatch();

	const blocks = contract.blocks;
	/* if (blocks.length>10) {
		dispatch(contractSlice.update({blocks:blocks.splice(0,blocks.length-10)}))
	} */
	return (
		<Section>
			<div className="content_wrapper bg_blue_9 radius">
				<div className="content_head">
					<table className="w-100 text-center text-white">
						<thead>
							<tr>
								<th className="pb-3">
									区块高度/奖励/哈希/时间
								</th>
								<th className="pb-3">
									状态
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="pb-3">
									# {contract.block.number}
								</td>
								<td className="pb-3">
									<div className="d-flex align-items-center justify-content-end">
										{contract.address ?  (contract._mineStatus ? '正在挖矿' : '等待挖矿') : '-'}
									</div>
								</td>
							</tr>
							<tr>
								<td className="pb-3">
									{contract._mineRewards ? contract._mineRewards + ' TLB' : '-'} 
								</td>
								<td className="pb-3">
									<div className="d-flex align-items-center justify-content-end">
									   <img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
									</div>
								</td>
							</tr>
							<tr>
								<td className="pb-3">
									{contract.block.hash ? contract.block.hash.slice(0,8)+'***'+contract.block.hash.slice(-4) : '-'}
								</td>
								<td className="pb-3">
									<div className="d-flex align-items-center justify-content-end">
									   <img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
									</div>
								</td>
							</tr>
							<tr>
								<td className="pb-3">
									{contract._mineLastTime ? TF(contract._mineLastTime) : '-'}
								</td>
								<td className="pb-3">
									<div className="d-flex align-items-center justify-content-end">
									   <img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					
				</div>
				<div className="content_body mt-5">
					<h4 className="mb-5">
						初始矿机认购
					</h4>
					<div className="cyan_btn_group row">
						<div className="col-6 buy">
							<button onClick={()=>setStatus({...status, open:DLG_BUY, param:1})} className="btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">100T</h4>
								<div>{contract.minerTierPrice1 ? contract.minerTierPrice1+'U认购' : '-'}</div>
							</button>
						</div>
						<div className="col-6 buy">
							<button onClick={()=>setStatus({...status, open:DLG_BUY, param:2})} className="btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">50T</h4>
								<div>{contract.minerTierPrice2 ? contract.minerTierPrice2+'U认购' : '-'}</div>
							</button>
						</div>
						<div className="col-6 buy">
							<button onClick={()=>setStatus({...status, open:DLG_BUY, param:3})} className="btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">25T</h4>
								<div>{contract.minerTierPrice3 ? contract.minerTierPrice3+'U认购' : '-'}</div>
							</button>
						</div>
						<div className="col-6 buy">
							<button onClick={()=>setStatus({...status, open:DLG_BUY, param:4})} className="btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">5T</h4>
								<div>{contract.minerTierPrice4 ? contract.minerTierPrice4+'U认购' : '-'}</div>
							</button>
						</div>
					</div>
					
					<div className="content_body_body mt-5">
						<h4 className="text-center ">
							模式选择
						</h4>
						
						<div className="mt-5 text-center mode-selector">
							<button onClick={()=>setStatus({...status, open:DLG_MODE, param:0, title:'灵活挖矿'})} className={"h4 btn "+(contract._mineType===0?'btn-primary':'btn-light text_blue')+" w-50"}>灵活挖矿</button>
							<button onClick={()=>setStatus({...status, open:DLG_MODE, param:1, title:'固定挖矿'})} className={"h4 btn "+(contract._mineType===1?'btn-primary':'btn-light text_blue')+" w-50"}>固定挖矿</button>
						</div>
						<div className="mt-5 text-center">
							<button disabled={contract._mineStatus || contract._minerTier===0} onClick={()=>setStatus({...status, open:DLG_START})} className="h4 btn btn-primary w-100 rounded-pill">立即挖矿</button>
						</div>
						<div className="d-flex mt-5">
							<div style={{marginRight:10}}>
								<button disabled={contract._minePending===0} onClick={()=>setStatus({...status, open:DLG_WITHDRAW})} className="h4 btn btn-muted w-100  border_cyan text-nowrap text_cyan round-button">
									领取收益
								</button>
							</div>
							<div>
								<div>参与<span className="text_cyan">{contract._minePendingBlocks}</span>个区块</div>
								<div>获得<span className="text_cyan">{contract._minePending}</span> TLB</div>
								{contract._mineType===0 ? <small className="text-white-50">(9600个区块奖励未领取自动暂停挖矿)</small> : null}
							</div>
						</div>
						<div className="mt-4">
							<div className="radius mt-3">
								<table className="w-100 text-center">
									<tbody>
										{contract._mineStatus ? blocks.map((v,k)=>(
											contract._mineLastBlock>v.number ? null : <tr key={k} className="gray_shadow">
												<td className="p-2 p-md-4">
													<div className="td_wrapper  text-center text-white">
														# {v.number}
													</div>
												</td>
												<td className="p-2 p-md-4">
													<div className="td_wrapper  text-center text-white">
														{v.hash.slice(0,8) + '...' + v.hash.slice(-4)}
													</div>
												</td>
												<td className="p-2 p-md-4">
													<div className="td_wrapper text-center text-white">
														<span>
															{contract._mineBlockRewards} TLB
														</span>
													</div>
												</td>
											</tr>
										)) : null}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			{status.open===DLG_BUY ? 		<BuyDialog 		handleClose={()=>setStatus({...status, open:0})} param={status.param} /> : null}
			{status.open===DLG_START ? 		<StartDialog 	handleClose={()=>setStatus({...status, open:0})} /> : null}
			{status.open===DLG_MODE ? 		<ModeDialog 	handleClose={()=>setStatus({...status, open:0})} param={status.param} title={status.title} /> : null}
			{status.open===DLG_WITHDRAW ? 	<WithdrawDialog handleClose={()=>setStatus({...status, open:0})} /> : null}
		</Section>
	)
}

const Section_5_d = () => {
	const legend = useRef(null);
	const chart = useRef(null);
	const [status,setStatus] = useState(false);

	const contract = useSelector(state => state.contract);
	const data = [
		{val:contract.minerTier1, label:"超级矿工 "+contract.minerTier1+"%", summary:"超级矿工"},
		{val:contract.minerTier2, label:"优质矿工 "+contract.minerTier2+"%", summary:"优质矿工"},
		{val:contract.minerTier3, label:"普通矿工 "+contract.minerTier3+"%", summary:"普通矿工"},
		{val:contract.minerTier4, label:"惰性矿工 "+contract.minerTier4+"%", summary:"惰性矿工"}
	];
	
	useEffect(() => {
		if (legend && chart) {
            chart.current.actualSeries[0].legend = legend.current;
			if (chart.current.actualSeries && chart.current.actualSeries.length > 0) {
				let series = chart.current.actualSeries[0];//  as IgrRingSeries;
				series.selectedSlices.add(0);
			}
			/* chart.current.actualSeries[0].legend = legend.current; */
        }
	});
	return (
		<Section>
			<div className="content_wrapper bg_blue_9 radius">
				<h4 className="text-end text_cyan">矿工监视</h4>
				<div>
					<IgrItemLegend
						orientation="Horizontal"
						ref={legend}>
					</IgrItemLegend>
				</div>
				<div className="gauge">
					<div className="text">
						<img style={{ height: '2em' }} src={ImgTLB} alt="TLB" />
					</div>
					<IgrDoughnutChart 
						ref={chart}

						allowSliceExplosion="true" 
						width="100%" 
						height="300px">
						<IgrRingSeries
							dataSource={data}
							valueMemberPath="val"
							labelMemberPath="label"
							legendLabelMemberPath="summary"
							labelsPosition="OutsideEnd"
							labelExtent={30}
							radiusFactor={0.7}
							startAngle={30}
							name="series"

							/* brush="white"
							outline="white" 
							fontSize={16}
							labelColor="white" */

							/* dataSource={data}
							valueMemberPath="val"
							labelMemberPath="label"
							labelsPosition="OutsideEnd"
							legend={legend}
							legendLabelMemberPath="summary"

							labelExtent="30"
							startAngle="30"
							outlines="white"
							radiusFactor="0.6"
							name="series" */
						/>
					</IgrDoughnutChart>
					
				</div>
					
					
				<hr className="bg-white mx-n2 mx-md-n5" style={{ height: '5px', opacity: '1' }} />
				
				<div className="table_wrapper">
					<table className="w-100 text-white">
						<thead className=" text-center">
							<tr>
								<th className="pb-4 pb-md-5">
									矿工
								</th>
								<th className="pb-4 pb-md-5">
									出块率
								</th>
								<th className="pb-4 pb-md-5">
									出块占比
								</th>
							</tr>
						</thead>
						<tbody className=" text-center">
							{contract.minerList.map((v,k)=>(<tr key={k}>
								<td className="pb-2 pb-md-3">
									<span style={{ background: '#FF0000' }} className="d-inline-block me-3 rounded-circle align-middle" ></span> 
									{v[0].slice(0,8) + '...' + v[0].slice(-4)}
								</td>
								<td className="pb-2 pb-md-3">
									{((contract.block.number - v[2]) * 100 / 9600).toFixed(2)} %
								</td>
								<td className="pb-2 pb-md-3">
									{(v[1] * 100 / contract.minerTotalPower).toFixed(2)} %
								</td>
							</tr>))}
						</tbody>
					</table>
					<button className="btn btn-muted shadow-0 text-white">
						{'查看更多 >>'}
					</button>
				</div>
			</div>
		</Section>
	)
}
export default (props)=>{
	let contract = useSelector(state => state.contract);
	/* let history = useHistory(); */
	const dispatch = useDispatch()
	useEffect(() => {
		const url = window.location.pathname;
		const referer = url.slice(url.lastIndexOf('/')+1);
		if (contract.referer!==referer) {
			dispatch(contractSlice.actions.update({referer}));
		}
	});
	return (
		<>
			<Section_1_d></Section_1_d>
			<Section_2_d></Section_2_d>
			<Section_3_d></Section_3_d>
			<Section_4_d></Section_4_d>
			<Section_5_d></Section_5_d>
		</>
	);
}