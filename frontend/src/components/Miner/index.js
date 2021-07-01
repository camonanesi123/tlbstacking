import React,{useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
/* import { useHistory } from "react-router-dom"; */
import styled from 'styled-components';

import { contractSlice } from '../../reducer';
import {NF} from '../../util';


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
import {IgrLegendModule, IgrDoughnutChartModule, IgrItemLegend, IgrDoughnutChart, IgrRingSeries, IgrLegend, IgrCategoryChart} from 'igniteui-react-charts';

const mods = [
    IgrLegendModule,
    IgrDoughnutChartModule,
	IgrRadialGaugeModule
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

const Section_1_d = () => {
	let contract = useSelector(state => state.contract);
	const dispatch = useDispatch()
	const connectWallet = () => {
		Metamask.connect(dispatch);
	};
	const data = [
		{val:37, label:"超级矿工 37%"},
		{val:25, label:"优质矿工 25%"},
		{val:12, label:"普通矿工 12%"},
		{val:8,  label:"惰性矿工 8%"}
	];
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
					
					dataSource={data}
					valueMemberPath="val"
					labelMemberPath="label"

                    chartType="Spline"
                    isTransitionInEnabled="true"
                    /* yAxisTitle="TWh" */
                    /* legend={this.legend} */
                    isHorizontalZoomEnabled="false"
                    isVerticalZoomEnabled="false"
                    toolTipType="Category"
					>
                </IgrCategoryChart>
			</div>
		</Section>
	)
}
const Section_2_d = () => {
	let contract = useSelector(state => state.contract);
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
							<td className="pb-3 pb-md-5">{Math.round(contract.totalSupply/100)/100}万枚</td>
							<td className="pb-3 pb-md-5">{Math.round((contract.totalSupply-contract.totalBurnt)/100)/100}万枚</td>
							<td className="pb-3 pb-md-5">{contract.totalBurnt || 0}</td>
						</tr>
						<tr className="text-white">
							<td>区块高度</td>
							<td>出块时间</td>
							<td>活跃矿工</td>
						</tr>
						<tr className="text_cyan">
							<td>{contract.blockHeight}</td>
							<td>02：35</td>
							<td>{contract.minerCount || 0}</td>
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
									{contract.address ? contract._mineTier + ' T' : '-'}
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
							<img style={{ height: '3.6em' }} src={ImgTLB} alt="TLB" />
							<div className="ms-2">
								<h4 className="text-white">TLB</h4>
								<span className="text_cyan">
									{contract.address ? NF(contract._tlb,2) : '-'}
								</span>
							</div>
						</div>
						<div className="col-6 d-flex align-items-start">
							<span className="bg_cyan rounded-circle">
								<img className="bg_blue_9 rounded-circle" style={{ height: '3.6em' }} src={ImgUSDT} alt="bitcoin_sm" />
							</span>
							<div className="ms-2">
								<h4 className="text-white">USDT</h4>
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
const Section_4_d = () => {
	const contract = useSelector(state => state.contract);

	const blocks = '-';
	const minedtps = '-';
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
									# {contract.blockHeight}
								</td>
								<td className="pb-3">
									<div className="d-flex align-items-center justify-content-end">
										{contract.address ?  (contract._mineStatus ? '正在挖矿' : '停止') : '-'}
									</div>
								</td>
							</tr>
							<tr>
								<td className="pb-3">
									30 TLB
								</td>
								<td className="pb-3">
									<div className="d-flex align-items-center justify-content-end">
									   <img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
									</div>
								</td>
							</tr>
							<tr>
								<td className="pb-3">
									e15r64...15d58
								</td>
								<td className="pb-3">
									<div className="d-flex align-items-center justify-content-end">
									   <img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
									</div>
								</td>
							</tr>
							<tr>
								<td className="pb-3">
									06-18 18:26
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
							<button className=" btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">100T</h4>
								<div>15000U认购</div>
							</button>
						</div>
						<div className="col-6 buy">
							<button className=" btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">50T</h4>
								<div>7500U认购</div>
							</button>
						</div>
						<div className="col-6 buy">
							<button className=" btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">25T</h4>
								<div>3500U认购</div>
							</button>
						</div>
						<div className="col-6 buy">
							<button className=" btn w-100 cyan_btn text_cyan">
								<h4 className="cyan_btn_bottom">25T</h4>
								<div>3500U认购</div>
							</button>
						</div>
					</div>
					
					<div className="content_body_body mt-5">
						<h4 className="text-center ">
							模式选择
						</h4>
						
						<div className="mt-5 text-center mode-selector">
							<button className={"h4 btn "+(contract._mineType===0?'btn-primary':'btn-light text_blue')+" w-50"}>灵活挖矿</button>
							<button className={"h4 btn "+(contract._mineType===1?'btn-primary':'btn-light text_blue')+" w-50"}>固定挖矿</button>
						</div>
						<div className="mt-5 text-center">
							<button className="h4 btn btn-primary w-100 rounded-pill">立即挖矿</button>
						</div>
						<div className="d-flex mt-5">
							<div style={{marginRight:10}}>
								<button className="h4 btn btn-muted w-100  border_cyan text-nowrap text_cyan round-button">
									领取收益
								</button>
							</div>
							<div>
								<div>参与<span className="text_cyan">{blocks}</span>个区块</div>
								<div>获得<span className="text_cyan">{minedtps}</span> TLB</div>
								<small className="text-white-50">(9600个区块奖励未领取自动暂停挖矿)</small>
							</div>
						</div>
						<div className="mt-4">
							<div className="radius mt-3">
								<table className="w-100 text-center">
									<tbody>
										<tr className="gray_shadow radius_30">
											<td className="p-2 p-md-4">
												<div className="td_wrapper  text-center text-white">
													#32567
													
													30 TLB
												</div>
											</td>
											<td className="p-2 p-md-4">
												<div className="td_wrapper  text-center text-white">
													e15t26...65f98
													
													6-18 18:16
												</div>
											</td>
											<td className="p-2 p-md-4">
												<div className="td_wrapper d-flex justify-content-end align-items-center  text-center text-white">
													<span>
														0.00005189
														
														TLB
													</span>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}

const Section_5_d = () => {
	const data = [
		{val:37, label:"超级矿工 37%"},
		{val:25, label:"优质矿工 25%"},
		{val:12, label:"普通矿工 12%"},
		{val:8,  label:"惰性矿工 8%"}
	];
	return (
		<Section>
			<div className="content_wrapper bg_blue_9 radius">
				<h4 className="text-end text_cyan">矿工监视</h4>
					<div className="gauge">
						<div className="text">
							<img style={{ height: '2em' }} src={ImgTLB} alt="TLB" />
						</div>
						<IgrDoughnutChart 
							allowSliceExplosion="true" 
							width="100%" 
							height="300px">
							<IgrRingSeries
							
								brush="white"
								outline="white" 
								fontSize={16}
								labelColor="white"

								dataSource={data}
								valueMemberPath="val"
								labelMemberPath="label"
								labelsPosition="OutsideEnd"
								/* legend={this.legend} */
								labelExtent="30"
								startAngle="30"
								outlines="white"
								radiusFactor="0.6"
								name="series">
							</IgrRingSeries>
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
							<tr>
								<td className="pb-2 pb-md-3">
									<span style={{ background: '#FF0000' }} className="d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
								</td>
								<td className="pb-2 pb-md-3">
									18.72%
								</td>
								<td className="pb-2 pb-md-3">
									3.42%
								</td>
							</tr>
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
			dispatch(contractSlice.actions.updateInfo({referer}));
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