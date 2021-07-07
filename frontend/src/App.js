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
const blockTime = (Number(process.env.REACT_APP_BLOCKTIME) || 3)*1000;

function App() {
	const contract = useSelector(state => state.contract);
	const [status, setStatus] = useState({
		loading:true,
		pending:false,
		spent:0
	})
	const dispatch = useDispatch();

	const accountChange = (newAccount)=>{
		setStatus({...status,loading:true});
		dispatch(contractSlice.actions.login(newAccount));
	}
	const connect = () => {
		setStatus({...status,pending:true});
		Metamask.connect().then(address=>{
			dispatch(contractSlice.actions.login(address));
			Metamask.setHandler((address)=>accountChange(address),(chainid)=>chainChanged(chainid));
			setStatus({...status,pending:false});
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
			
		} else {
			dispatch(contractSlice.actions.logout());
		}
	}
	useEffect(() => {
		let timer;
		if (!status.pending) {
			if (!contract.address) {
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
				{status.loading ? <Loader></Loader> : <>
					<Header></Header>
					<menu className="m-0 p-0">
						<Switch>
							
							<Route exact path="/mlm/:referal" component={MLM}></Route>
							<Route exact path="/miner/:referal" component={Miner}></Route>
							<Route path="*" component={Home}></Route>
						</Switch>
					</menu>
					<Footer></Footer>
					</>}
			</Style>
		</Router>
	);
}

export default App;
