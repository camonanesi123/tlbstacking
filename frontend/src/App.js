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
	const [loading, setLoading] = useState(true)
	const [lastTime, setLastTime] = useState(0)
	const dispatch = useDispatch();

	const accountChange = (newAccount)=>{
		setLoading(true)
		dispatch(contractSlice.actions.login(newAccount));
	}
	const chainChanged = (valid)=>{
		setLoading(true);
		if (valid) {
			Metamask.connect().then(address=>{
				dispatch(contractSlice.actions.login(address));
				Metamask.setHandler((address)=>accountChange(address),(chainid)=>chainChanged(chainid));
			})
		} else {
			dispatch(contractSlice.actions.logout());
		}
	}
	useEffect(() => {
		if (!contract.address) {
			Metamask.connect().then(address=>{
				dispatch(contractSlice.actions.login(address));
				Metamask.getInfo(contract,address).then(res=>dispatch(contractSlice.actions.update(res)));
				Metamask.setHandler((address)=>accountChange(address),(chainid)=>chainChanged(chainid));
			})
		}
		let delay = contract.lastTime ? blockTime - (+new Date() - contract.lastTime) : blockTime;
		if (delay>3000) {
			delay = blockTime;
		} else if (delay<0) {
			delay = 1;
		}
		console.log('delay',delay+'ms');
		let timer = setTimeout(()=>Metamask.getInfo(contract).then(res=>{
			if (loading) setLoading(false);
			dispatch(contractSlice.actions.update(res))
		}), delay)
		return () => clearTimeout(timer);
	});
	return (
		<Router>
			<Style>
				{loading ? <Loader></Loader> : <>
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
