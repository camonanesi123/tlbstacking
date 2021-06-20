import React from 'react';
import './Section_8.css';
function Section_8(props) {
    return (
        <section className="Section_8 section_paddingX py-3">
            <br /><br /><br /><br />
            <h3 className="text-white text-center font_size_68" style={{ letterSpacing: '20px' }}>
                TLBstaking
            </h3>
            <br /><br /><br />
            <div className="content_wrapper radius_30 bg_blue_9 p-2 p-md-4">
                <br /><br /><br />
                <div className="btn_control_tab">
                    <div className="btn-group btn_custom_group d-flex w-100 bg_a4">
                        <button className="btn text-white shadow-0 bg_cyan2 w-50 font_size_79">买入</button>
                        <button className="btn text-white shadow-0  w-50 font_size_79">售出</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-3 text-white mt-md-5">
                    <strong className="font_size_49">余额：<span>1153</span></strong>
                    <button className="btn muted-0 shadow-0 rounded-3 font_size_37 pill_max px-3 text-center">
                        MAX
                    </button>
                </div>



                <br /><br /><br />
                <div className="select_form_wrapper  px-3 bg-white radius_30 d-flex align-items-center">
                    <div className="form-group  d-flex align-items-center">
                        <label htmlFor="" > <img className="h-100 p-2 d-inline-block" src={require('./t.png').default} alt="" /> </label>
                        <select className="custom-select text_6 input_focus_off font_size_68 bg_transparent shadow-0 border-0 rounded-0" name="" id="">
                            <option defaultValue>USDT</option>
                            <option value="USDT">USDT2</option>
                            <option value="USDT">USDT3</option>
                            <option value="USDT">USDT4</option>
                        </select>
                    </div>
                    <div className="form-group flex-grow-1 w-75 d-flex">
                        <input type="number" className="text_6 input_focus_off w-100 text-end bg_transparent shadow-0 border-0 rounded-0 line_height_int font_size_68" defaultValue="0" />
                    </div>
                </div>
                <br /><br /><br />

                <div className="text-center ">
                    <button className="btn btn-muted shadow-0 text-white m-0 p-0 rounded-circle">
                        <i className="far fa-arrow-alt-circle-down font_size_79"></i>
                    </button>
                </div>
                <br /><br /><br />
                <div className="select_form_wrapper px-3 bg-white radius_30 d-flex align-items-center">
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" style={{ height: "80px" }} > <img className="h-100 p-2 d-inline-block" src={require('./gudgudi.png').default} alt="" /> </label>
                        <select className="custom-select text_6 input_focus_off font_size_68 bg_transparent shadow-0 border-0 rounded-0" name="" id="">
                            <option defaultValue>TLB</option>
                            <option value="TLB">TLB2</option>
                            <option value="TLB">TLB3</option>
                            <option value="TLB">TLB4</option>
                        </select>
                    </div>
                    <div className="form-group flex-grow-1 w-75 d-flex">
                        <input type="number" className="text_6 input_focus_off w-100 text-end bg_transparent shadow-0 border-0 rounded-0 line_height_int font_size_68" defaultValue="0" />
                    </div>
                </div>
                <br /><br /><br />
                <div className="d-flex justify-content-center align-items-center">
                    <h3 className="font_size_58 text-center mb-0  text-white me-3 me-md-5">
                        1HT=143.74
                    </h3>
                    <button className="btn btn-muted m-0 p-0 ms-3 ms-md-5 text-white font_size_58 shadow-0 rounded-0">
                        <i className="fas fa-sync-alt    "></i>
                    </button>
                </div>
                <br /><br /><br />
                <div className="btn_control_exchange d-flex justify-content-center">
                    <button className="btn me-1 me-md-3 radius_left_side_pill bg-white text-black font_size_58 flex-grow-1">
                        确认交易
                    </button>
                    <button className="btn ms-1 ms-md-3 radius_right_side_pill bg-white text-black font_size_58 flex-grow-1">
                        确认交易
                    </button>
                </div>
                <br /><br /><br />
            </div>
        </section>
    );
}

export default Section_8;