import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Loader from './components/Layout/Loader';
import Miner from './components/Miner';
import MLM from './components/MLM';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, withRouter, Link } from 'react-router-dom';

import ImgBg from './img/bg_app.png'

const Style = styled.div`
	max-width: 1080px;
	margin: auto;
	background: url(${ImgBg}) center/cover no-repeat;
`;

function App() {
	const contract = useSelector(state => state.contract);
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		window.addEventListener('load', function () {
			this.setTimeout(() => {
				setLoading(false)
			}, 500)
		})
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
