import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
/* import Web3 from 'web3'; */
import { contractSlice } from '../../reducer';
import Metamask from '../../metamask';

import LineChart from '../reuse_components/LineChart/LineChart'

/* import MetaMaskOnboarding from '@metamask/onboarding' */


import ImgLogo from '../../img/logo.webp'


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
	const dispatch = useDispatch()

	const connectWallet = async () => {
		const {status, data} = await Metamask.connect(dispatch);
		if (status==='ok') await Metamask.getUserInfo(dispatch,data);
	};
	useEffect(() => {
		if (Metamask.isConnected) connectWallet()
	}, [])

	return (
		<Section className="section_paddingX">
			<div className="text-center">
				<div className="wallet-panel">
					{contract.address? (
						<div className="address btn bg-success text-white font_size_29">
							{contract.address.slice(0,4)+'...'+contract.address.slice(-4) }
						</div>
					) : (
						<button onClick={connectWallet} className="btn bg-warning text-white font_size_29">
							连接钱包
						</button>
					)}
				</div>
				<h1 className="text-center font_family_bahnschrift font_size_168">
					<span className="text_red">TLB</span>
					<span className="text_cyan">
						staking
					</span>
				</h1>
				<h2 className="text-white font_size_139" style={{letterSpacing: '15px'}}>
					全网投币量
				</h2>
				<br /><br /> <br />
				<strong className="text_red font_size_68">
					{contract.totalDeposit || '00000000'}
				</strong>
			</div>
			<div className="h_400">
			<LineChart></LineChart>
			</div>
			<span className="text-end d-block font_size_29 text_cyan">
				+{contract.price} TLBstaking (+4.57%) <span className="text-white">过去24小时</span>
			</span>
			<div className="desc">
				<h3 className=" font_size_58 mb-4 mb-md-5">
					进入一个连接服务的新领域
				</h3>
				<div className="font_size_37">
					<p>TLBstaking应用程序和服务使用IBC连接</p>
					<p>为企业级应用构建全球公链</p>
					<p>这个创新让你可以在主权国家之间自由交换资产和数据</p>
				</div>
			</div>

			<br /><br /><br /><br />
			
		</Section>
	);
}

export default Section_1;