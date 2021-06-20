import React from 'react';
import './Section_5.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, redoCounterAction } from '../../../../reducer';

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
        <section className="Section_5 section_paddingX py-3">
            <div className="content_wrapper p-3 p-md-5 ">
                <h3 className="text-white text-center font_size_90 font_family_FZDHTJW">存款等级</h3>
                <br /><br /><br /><br />
                <div className="select_form_wrapper px-3 bg-white rounded-3 d-flex align-items-center">
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" > <img className="h-100 p-2 d-inline-block" src={require('./t.png').default} alt="" /> </label>
                        <select className="custom-select text_6 input_focus_off font_size_68 bg_transparent shadow-0 border-0 rounded-0" name="" id="">
                            <option defaultValue>USDT</option>
                            <option value="USDT">USDT2</option>
                            <option value="USDT">USDT3</option>
                            <option value="USDT">USDT4</option>
                        </select>
                    </div>
                    <div className="form-group flex-grow-1 w-75 d-flex">
                        <input onChange={valueChanger} type="number" className="input_focus_off w-100 text-end bg_transparent shadow-0 border-0 rounded-0 line_height_int font_size_68" value={counterValue} />
                    </div>
                </div>
                <div className="select_form_control d-flex justify-content-center my-5">
                    <button onClick={e => dispatch(increment())} className="btn d-flex justify-content-center font_size_90 bg_blue text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
                        <i className="fas fa-plus    "></i>
                    </button>
                    <button onClick={e => dispatch(redoCounterAction())} className="btn d-flex justify-content-center font_size_90 bg_blue text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
                        <i className="fas fa-redo    "></i>
                    </button>
                    <button onClick={e => dispatch(decrement())} className="btn d-flex justify-content-center font_size_90 bg_blue text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
                        <i className="fas fa-minus    "></i>
                    </button>
                </div>
                <div className="d-flex justify-content-center select_form_img">
                    <div className="img_wrap me-n5">
                        <div className="content font_size_58 text-white">
                            <i className="fas fa-plus d-block    "></i>

                            1000U
                        </div>
                        <img className="h-100 rounded-circle " src={require('./circle_v2.png').default} alt="circle_value" />
                    </div>
                    <div className="img_wrap img_wrap_big mx-n4 mx-n5">
                        <div className="content font_size_58 text-white">
                            <i className="fas fa-plus d-block    "></i>

                            5000U
                        </div>
                        <img className="h-100 rounded-circle " src={require('./circle_value.png').default} alt="circle_value" />
                    </div>
                    <div className="img_wrap ms-n4 ms-n5">
                        <div className="content font_size_58 text-white">
                            <i className="fas fa-plus d-block    "></i>

                            2000U
                        </div>
                        <img className="h-100 rounded-circle" src={require('./circle_v2.png').default} alt="circle_value" />
                    </div>
                </div>
                <br /><br /><br /> <br /><br />
                <div className="d-flex justify-content-center">
                    <button className="btn font_family_FZDHTJW text-nowrap d-flex justify-content-center font_size_68 px-5 mx-2 mx-md-3 border text-white py-1 rounded-pill">
                        存款
                    </button>
                    <button className="btn font_family_FZDHTJW text-nowrap d-flex justify-content-center font_size_68 px-5 mx-2 mx-md-3 border text-white py-1 rounded-pill">
                        提币
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Section_5;