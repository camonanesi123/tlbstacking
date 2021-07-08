import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
/* import Web3 from 'web3'; */
import { contractSlice } from '../../reducer';
import Metamask from '../../connector';
import {NF} from '../../util';


/* import MetaMaskOnboarding from '@metamask/onboarding' */


import ImgLogo from '../../img/logo.webp'

import {IgrCategoryChart, IgrCategoryChartModule} from 'igniteui-react-charts';
IgrCategoryChartModule.register();


const Section = styled.section`
	padding-top: 30px;
	position: relative;
	@media (max-width: 991px) {
		padding-top: 20px
	}
	&::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: #080e23 url(${ImgLogo}) center center/contain no-repeat;
		top: 0;
		left: 0;
		opacity: 0.4;
		mix-blend-mode: saturation;
		pointer-events: none;
	}
	.wallet-panel {
		margin-bottom: 100px;
		text-align: right;
	}
	.desc {
		margin-top: 50px;
		text-align: center;
		color: white;
	}
	h3 {
		text-align: center;
	}
	div.address {
		&.btn  {
			text-transform: none;
		}
	}
`

function Section_1(props) {
	let contract = useSelector(state => state.contract);
	const dispatch = useDispatch();
	const connectWallet = () => Metamask.connect(dispatch);

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
			<div className="text-center">
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
				<h1 className="text-center">
					<span className="text_red">TLB</span>
					<span className="text_cyan">staking</span>
				</h1>
				<h1 className="text-white" style={{letterSpacing: '10px'}}>
					全网投币量
				</h1>
				<br /><br /> <br />
				<h2 className="text_red">
					{contract.totalDeposit ? '$ ' + NF(contract.totalDeposit) : '-'}
				</h2>
			</div>
			<div style={{marginLeft:-30,marginRight:-30}}>
			<IgrCategoryChart
				height="200px"
				width="100%"

				chartType="Spline"
				dataSource={data}
				xAxisFormatLabel={item=>''}
				yAxisFormatLabel={item=>''}
				/* yAxisFormatLabel={(item)=>''} */
				/* yAxisInterval={10}
				yAxisMinimumValue={0}
				yAxisMaximumValue={50} */
				/* xAxisLabelLocation="none" */
				/* yAxisLabelLocation="OutsideRight" */
				includedProperties={['x','y']}
				thickness={1}

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
			<span className="text-end d-block text_cyan">
				+{contract.price} TLBstaking (+4.57%) <span>过去24小时</span>
			</span>
			<div className="desc">
				<h3 className="mb-4 mb-md-5">
					进入一个连接服务的新领域
				</h3>
				<div>
					<p>TLBstaking应用程序和服务使用IBC连接</p>
					<p>为企业级应用构建全球公链</p>
					<p>这个创新让你可以在主权国家之间自由交换资产和数据</p>
				</div>
			</div>
		</Section>
	);
}

export default Section_1;