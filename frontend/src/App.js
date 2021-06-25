import React,{useEffect, useState} from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Section_1 from './components/Home/Section_1';
import Section_2 from './components/Home/Section_2';
import Section_3 from './components/Home/Section_3';
import Section_4 from './components/Home/Section_4';
import Section_5 from './components/Home/Section_5';
import Section_6 from './components/Home/Section_6';
import Section_7 from './components/Home/Section_7';
import Section_8 from './components/Home/Section_8';
import Section_9 from './components/Home/Section_9';
import Section_10 from './components/Home/Section_10';
import Section_11 from './components/Home/Section_11';
import Section_12 from './components/Home/Section_12';
import Section_13 from './components/Home/Section_13';
import Section_14 from './components/Home/Section_14';
import Footer from './components/Layout/Footer';
import Loader from './components/Layout/Loader';
import Miner from './components/Miner';
import { BrowserRouter as Router, Switch, Route, withRouter, Link } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    window.addEventListener('load', function () {
      this.setTimeout(() => {
        setLoading(false)
      }, 500)
    })
  })
  return (
    <Router>
      <div className="App">
        {loading ? <Loader></Loader> : <>
          <Header></Header>
          <menu className="m-0 p-0">
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/miner" component={MinerPage}></Route>
            </Switch>
          </menu>
          <Footer></Footer>
          </>}
      </div>
    </Router>
  );
}
const HomePage = () => {
  return (
    <>
      <Section_1></Section_1>
      <Section_2></Section_2>
      <Section_3></Section_3>
      <Section_4></Section_4>
      <Section_5></Section_5>
      <Section_6></Section_6>
      <Section_7></Section_7>
      <Section_8></Section_8>
      <Section_9></Section_9>
      <Section_10></Section_10>
      <Section_11></Section_11>
      <Section_12></Section_12>
      <Section_13></Section_13>
      <Section_14></Section_14>
    </>
  )
}
const MinerPage = () => {
  return (
    <>
    <Miner></Miner>
    </>
  )
}

export default App;
