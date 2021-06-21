import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { counterSlice/* increment, decrement, redoCounterAction */ } from '../../reducer';

import ImgPanel from '../../img/panel.webp'
import ImgUSDT from '../../img/usdt.svg'
import ImgTier from '../../img/tier.webp'

const Section = styled.section`
    margin-top: 100px;
    &>.content_wrapper{
        background: rgba(59, 63, 74, 0.447);
        border-radius: 25px;
        box-shadow: 0 0 38px #33cccc;
    }
  .tier {
    width: 300px;
    height: 300px;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    text-shadow: 0px 2px 10px #845f15;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 0.8em !important;
    &:hover {
      opacity: 0.8;
    }
    @media (max-width: 991px){
      width: 160px;
      height: 160px;
      @media (max-width: 575px){
        width: 160px;
        height: 160px;
      }
    }
    &.big {
      width: 400px;
      height: 400px;
      z-index: 3;
      opacity: 1;
      font-size: 1em;
      cursor:auto;
      @media (max-width: 991px){
        width: 200px;
        height: 200px;
        @media (max-width: 575px){
            width: 200px;
            height: 200px;
        }
      }
    }
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
    }
    img {
      width:100%;
    }
  }
`;

const bg = {
    background: `#080E23 url(${ImgPanel}) center/cover no-repeat`
}

const wrapper = {
    background: 'rgba(59, 63, 74, 0.447)',
    borderRadius: 25,
    boxShadow: '0 0 10px #33cccc'
};
const usdt = {
    padding: 10,
    width: '3rem'
};
const title = {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
};
const p5 = {
    marginTop: 50,
    marginBottom: 50,
    display:'flex',
    justifyContent: 'center'
};
function Section_5(props) {
    let counterValue = useSelector(state => state.counter.value);
    const dispatch = useDispatch()
    function valueChanger(e) {
        e.target.value = counterValue;
    }
    function valueInput(e) {
        e.target.value = e.target.value;
    }
    return (
        <Section style={bg} className="section_paddingX py-3">
            <div style={wrapper} className="p-3 p-md-5 ">
                <h3 style={title} className="font_size_90">存款等级</h3>
                <div className="select_form_wrapper px-3 bg-white rounded-3 d-flex align-items-center">
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" > <img style={usdt} src={ImgUSDT} alt="" /> </label>
                        <span>USDT</span>
                    </div>
                    <div className="form-group flex-grow-1 w-75 d-flex">
                        <input onChange={valueChanger} type="number" className="input_focus_off w-100 text-end bg_transparent shadow-0 border-0 rounded-0 line_height_int font_size_68" value={counterValue} />
                    </div>
                </div>
                <div className="select_form_control d-flex justify-content-center my-5">
                    <button onClick={e => dispatch(counterSlice.actions.increment())} className="btn d-flex justify-content-center font_size_90 bg_blue text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
                        <i className="fas fa-plus    "></i>
                    </button>
                    <button onClick={e => dispatch(counterSlice.actions.redoCounterAction())} className="btn d-flex justify-content-center font_size_90 bg_blue text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
                        <i className="fas fa-redo    "></i>
                    </button>
                    <button onClick={e => dispatch(counterSlice.actions.decrement())} className="btn d-flex justify-content-center font_size_90 bg_blue text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
                        <i className="fas fa-minus    "></i>
                    </button>
                </div>
                <div style={p5}>
                    <button className="tier me-xl-n5 me-n1">
                        <div className="content font_size_49 text-white">
                            <i className="fas fa-plus d-block"></i>
                            <label>1000U</label>
                        </div>
                        <img src={ImgTier} alt="circle_value" />
                    </button>
                    <button className="tier big mx-xl-n5 mx-n4">
                        <div className="content font_size_58 text-white">
                            <i className="fas fa-plus d-block    "></i>
                            <label>5000U</label>
                            
                        </div>
                        <img src={ImgTier} alt="circle_value" />
                    </button>
                    <button className="tier ms-xl-n5 ms-n1">
                        <div className="content font_size_49 text-white">
                            <i className="fas fa-plus d-block    "></i>
                            <label>2000U</label>
                            
                        </div>
                        <img src={ImgTier} alt="circle_value" />
                    </button>
                </div>
                <div style={p5}>
                    <button className="btn font_family_FZDHTJW text-nowrap d-flex justify-content-center font_size_68 px-5 mx-2 mx-md-3 border text-white py-1 rounded-pill">
                        存款
                    </button>
                    <button className="btn font_family_FZDHTJW text-nowrap d-flex justify-content-center font_size_68 px-5 mx-2 mx-md-3 border text-white py-1 rounded-pill">
                        提币
                    </button>
                </div>
            </div>
        </Section>
    );
}

export default Section_5;