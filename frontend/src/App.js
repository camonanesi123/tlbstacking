import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
import { contractSlice } from './reducer';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Loader from './components/Layout/Loader';
import Miner from './components/Miner';
import MLM from './components/MLM';
import Home from './components/Home';
import Metamask from './connector';
import { BrowserRouter as Router, Switch, Route, withRouter, Link } from 'react-router-dom';

import ImgBg from './img/bg_app.png'

const Style = styled.div`
	max-width: 1080px;
	margin: auto;
	background: url(${ImgBg}) center/cover no-repeat;
`;
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

const blockTime = (Number(process.env.REACT_APP_BLOCKTIME) || 3)*1000;


function App() {
	const contract = useSelector(state => state.contract);
	const [status, setStatus] = useState({
		done: false,
		loading:true,
		pending:false,
		spent:0,
		invalidChain:false,
	})
	const dispatch = useDispatch();

	const accountChange = (newAccount)=>{
		setStatus({...status,loading:true});
		dispatch(contractSlice.actions.login(newAccount));
	}
	const connect = () => {
		setStatus({...status,pending:true});
		Metamask.connect().then((res)=>{
			Metamask.setHandler((address)=>accountChange(address),(chainid)=>chainChanged(chainid));
			
			const {address,chainId} = res;
			if (address) {
				dispatch(contractSlice.actions.login(address));
				setStatus({...status,pending:false,done:true});
			} else if(chainId) {
				setStatus({...status,pending:false,done:true});
			} else {
				setStatus({...status,pending:false,done:true});
			}
		})
	}
	const getContract = () => {
		setStatus({...status,pending:true});
		let time = +new Date();
		Metamask.getInfo(contract).then(res=>{
			dispatch(contractSlice.actions.update(res))
			const date = new Date();
			const hh = date.getHours();
			const mm = date.getMinutes();
			const ss = date.getSeconds();
			const spent = +new Date()-time;
			console.log((hh>9?'':'0')+hh+':'+(mm>9?'':'0')+mm+':'+(ss>9?'':'0')+ss + (spent?' spent: '+spent+'ms' : ''),res);
			setStatus({...status,loading:false,pending:false,spent});
		})
	}
	const chainChanged = (valid)=>{
		setStatus({...status,loading:true});
		if (valid) {
			setStatus({...status,loading:false});
		} else {
			setStatus({...status,loading:false});
			dispatch(contractSlice.actions.logout());
		}
	}
	useEffect(() => {
		let timer;
		if (!status.pending) {
			if (!contract.address && !status.done) {
				connect();
			}
			if (status.loading) {
				getContract();
			} else {
				let delay = status.spent ? blockTime - status.spent : blockTime;
				if (delay>3000) {
					delay = blockTime;
				} else if (delay<0) {
					delay = 10;
				}
				timer = setTimeout(()=>getContract(delay), delay)
			}
		}
		return () => timer && clearTimeout(timer);
	});
	return (
		<Router>
			<Style>
				{status.invalidChain?<Dialog>
					<div className="dialog">
						<h3 className="text-center">无效网络ID</h3>
					</div>
				</Dialog>:(
					status.loading ? <Loader></Loader> : <>
					<Header></Header>
					<menu className="m-0 p-0">
						<Switch>
							
							<Route exact path="/mlm/:referal" component={MLM}></Route>
							<Route exact path="/miner/:referal" component={Miner}></Route>
							<Route path="*" component={Home}></Route>
						</Switch>
					</menu>
					<Footer></Footer>
					</>	
				)}
			</Style>
		</Router>
	);
}

export default App;
