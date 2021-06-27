import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
import { contractSlice } from '../../reducer';
import { useHistory } from "react-router-dom";

import Metamask from '../../connector';

const Section = styled.section`
	width: 100vw;
	height: 90vh;
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


const HomePage = () => {
	const [value,setValue] = useState('');
	const [error,setError] = useState('');
	const dispatch = useDispatch()
	/* const contract = useSelector(state => state.contract); */
	let history = useHistory();
	const valueChanger = (e) => {
		if (!value) return setError('请输入推荐人地址')
		if (!Metamask.validAddress(value)) return setError('无效地址');
		/* setError(''); */
		dispatch(contractSlice.actions.updateInfo({referer:value}));
		history.push("/mlm/"+value);
	}
	return (
		<Section>
			<div className="dialog">
				<div className="form-group">
					<span className="text-white-50">推荐人地址</span>
				</div>
				<div className="form-group my-4 mb-4">
					<input onChange={(e)=>setValue(e.target.value)} className="h4 w-100 p-3" value={value} />
					<div className="text-danger">{error}</div>
				</div>
				<div className="text-center">
					<button onClick={()=>valueChanger()} className="h4 btn px-5 mx-2 mx-md-3 border text-white">
						提交
					</button>
				</div>
			</div>
		</Section>
	)
}
  
export default HomePage;