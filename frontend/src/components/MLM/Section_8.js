import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';

import ImgUSDT from '../../img/usdt.svg'
import ImgLogo from '../../img/logo.webp'

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

function Section_8(props) {
	let contract = useSelector(state => state.contract);
	/* let counterValue = useSelector(state => state.counter.value); */
	/* const dispatch = useDispatch() */
	function valueChanger(e) {
		/* e.target.value = counterValue; */
	}
	function valueInput(e) {
		/* e.target.value = e.target.value; */
	}
	return (
		<Section>
			<h2 className="text-center">
				TLBstaking
			</h2>
			<div className="content_wrapper bg_blue_9">
				<div className="btn_control_tab">
					<div className="btn-group btn_custom_group d-flex w-100 bg_a4">
						<button className="h3 btn text-white shadow-0 bg_cyan2 w-50 ">买入</button>
						<button className="h3 btn text-white shadow-0  w-50 ">售出</button>
					</div>
				</div>
				<div className="d-flex align-items-center  justify-content-between mt-3 text-white mt-md-5">
					<strong>余额：<span>1153</span></strong>
					<button className="btn muted-0 shadow-0 rounded-3 pill_max px-3 text-center">
						MAX
					</button>
				</div>

				<div className="h3 select_form_wrapper p-2 bg-white rounded-3 d-flex align-items-center">
					<div className="form-group d-flex align-items-center">
						<img className="icon" src={ImgUSDT} alt="" />
						<span className="text-black-50">USDT</span>
					</div>
					<div className="form-group flex-grow-1 w-75 d-flex">
						<input onChange={valueChanger} type="number" className="input_focus_off w-100 text-end bg_transparent shadow-0 border-0 rounded-0 line_height_int" value="0" />
					</div>
				</div>

				<div className="text-center p-2">
					<button className="btn btn-muted shadow-0 text-white m-0 p-0 rounded-circle">
						<i className="far fa-arrow-alt-circle-down font_size_79"></i>
					</button>
				</div>

				<div className="h3 select_form_wrapper p-2 bg-white rounded-3 d-flex align-items-center">
					<div className="form-group d-flex align-items-center">
						<img className="icon" src={ImgLogo} alt="" />
						<span className="text-black-50">TLB</span>
					</div>
					<div className="form-group flex-grow-1 w-75 d-flex">
						<input onChange={valueChanger} type="number" className="input_focus_off w-100 text-end bg_transparent shadow-0 border-0 rounded-0 line_height_int" value="0" />
					</div>
				</div>

				<div className="d-flex justify-content-center align-items-center">
					<h4 className="text-center mb-0  text-white me-3 me-md-5">
						1TLB = {contract.price} USDT
					</h4>
					<button className="h3 btn btn-muted m-0 p-2 ms-3 ms-md-5 text-white shadow-0 rounded-0">
						<i className="fas fa-sync-alt    "></i>
					</button>
				</div>
				<br /><br /><br />
				<div className="btn_control_exchange d-flex justify-content-center">
					<button className="h4 btn me-1 me-md-3 radius_left_side_pill bg-white text-black-50 flex-grow-1">
						确认交易
					</button>
					<button className="h4 btn ms-1 ms-md-3 radius_right_side_pill bg-white text-black-50 flex-grow-1">
						撤销挂单
					</button>
				</div>
			</div>
		</Section>
	);
}

export default Section_8;