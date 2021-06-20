import React from 'react';
import styled from 'styled-components';
import SynChart from '../reuse_components/SynChart/SynChart';
import DrilldownChart from '../reuse_components/DrilldownChart/DrilldownChart';
import DoughnutChart from '../reuse_components/DoughnutChart/DoughnutChart';
import './Dashboard.css';

const Section = styled.section`
    .top_bottom_cyan_bg {
        background: url("./cyan_bg_border.png") center/100% 100% no-repeat;
    }

`

const Section_1_d = () => {
    return (
        <section className="section_paddingX">
            <div className="content_head">
                <h3 className="font_size_37 text-end text-white mb-2 mb-md-4">
                    全网实时算力
                </h3>
            </div>
            <div className="content_wrapper">
                <SynChart></SynChart>
            </div>
        </section>
    )
}
const Section_2_d = () => {
    return (
        <section className="section_paddingX">
            <br /><br /><br /> <br />
            <div className="content_wrapper bg_blue_9 px-2 py-3 py-md-5 radius_30">
                <table className="w-100 font_size_37 text-center">
                    <tbody>
                        <tr className="text-white">
                            <td>总发行量</td>
                            <td>当前流通量</td>
                            <td>当前销毁</td>
                        </tr>
                        <tr className="text_cyan">
                            <td className="pb-3 pb-md-5">1800万枚</td>
                            <td className="pb-3 pb-md-5">3254861</td>
                            <td className="pb-3 pb-md-5">100.000</td>
                        </tr>
                        <tr className="text-white">
                            <td>区块高度</td>
                            <td>出块时间</td>
                            <td>活跃矿工</td>
                        </tr>
                        <tr className="text_cyan">
                            <td>36144</td>
                            <td>02：35</td>
                            <td>3677</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

const Section_3_d = () => {
    return (
        <section className="section_paddingX">
            <br /><br /><br />
            <div className="content_wrapper bg_blue_9 px-2 px-md-5 py-3 py-md-5 radius_30">
                <div className="chart_wrapper">

                    <div className="row">
                        <div className="col-12 col-md-7">
                            <div className="col_wrapper">
                                {/* <img src={require('./drilldown.png').default} alt="" /> */}
                                <DrilldownChart></DrilldownChart>
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="col_wrapper text-center ">
                                <div className="txt_wrapper top_bottom_cyan_bg py-3">
                                    <span className="text_cyan font_size_49">72人</span>
                                    <br />
                                    <span className="text-white font_size_29 ">
                                        我的矿工
                                    </span>
                                </div>
                                <br />
                                <br />
                                <div className="txt_wrapper top_bottom_cyan_bg py-3">
                                    <span className="text_cyan font_size_49">
                                        284.69K
                                    </span>
                                    <br />
                                    <span className="text-white font_size_29">
                                        矿工贡献算力
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="txt_wrapper">
                    <h3 className="text-white font_size_37 mb-3">
                        招募更多矿工
                    </h3>
                    <form action="" method="post">
                        <div className="d-flex ">
                            <input type="text" placeholder="www.tlb.com/4sd....12a/" className="font_size_37 form-control w-100" />
                            <button className="btn btn-muted bg_cyan rounded-0 text-white ms-3 font_size_37 px-3 px-md-5 text-nowrap d-block">
                                点击复制
                            </button>
                        </div>
                    </form>
                </div>
                <div className="social_wrapper mb-3 mb-md-5">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <br />
                            <ul className="list-unstyled w-100 m-0 p-0 d-flex align-items-center justify-content-between">
                                <li>
                                    <a className="font_size_49 text-white" href="#">
                                        <i className="fab fa-facebook    "></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="font_size_49 text-white" href="#">
                                        <i className="fab fa-twitter    "></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="font_size_49 text-white" href="#">
                                        <i className="fab fa-linkedin-in    "></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="font_size_49 text-white" href="#">
                                        <i className="fab fa-tumblr    "></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="font_size_49 text-white" href="#">
                                        <img src={require('./chat_c.png').default} alt="chat_c" />
                                    </a>
                                </li>
                                <li>
                                    <a className="font_size_49 text-white" href="#">
                                        <img src={require('./social_ss.png').default} alt="social_ss.png" />
                                    </a>
                                </li>
                                <li>
                                    <a className="font_size_49 text-white" href="#">
                                        {/* <img src={require('./youtube.png').default} alt="youtube" /> */}
                                    </a>
                                </li>
                            </ul>

                            <br /><br />
                        </div>
                    </div>
                </div>

                <div className="footer_wrapper">
                    <h3 className="text-white font_size_37">
                        我的资产
                    </h3>
                    <br /><br />
                    <div className="d-flex justify-content-between">
                        <div className="col_wrapper d-flex align-items-start">
                            <img style={{ height: "90px" }} src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                            <div className="content font_size_37 ms-2 ms-md-3">
                                <h4 className="text-white">
                                    TLB
                                </h4>
                                <span className="text_cyan">
                                    6.254915
                                </span>
                            </div>
                        </div>
                        <div className="col_wrapper d-flex align-items-start">
                            <span className="bg_cyan rounded-circle">
                                <img className="bg_blue_9 rounded-circle" style={{ height: "90px" }} src={require('./bitcoin_sm.png').default} alt="bitcoin_sm" />
                                
                                </span>
                            <div className="content font_size_37 ms-2 ms-md-3">
                                <h4 className="text-white">
                                    TLB
                                </h4>
                                <span className="text_cyan">
                                    6.254915
                                </span>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-muted text-white border_cyan rounded-3 font_size_29">
                            查看更多
                        </button>
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </section>
    )
}
const Section_4_d = () => {
    return (
        <section className="section_paddingX">
            <div className="content_wrapper bg_blue_9 px-2 px-md-5 py-3 py-md-5 radius_30">
                <div className="content_head">
                    <div className="d-flex justify-content-between text-white font_size_37">
                        <h3>区块高度/奖励/哈希/时间</h3>
                        <h3>状态</h3>
                    </div>
                    <br /><br />
                    <table className="w-100 text-center text-white font_size_37">
                        <tbody>
                            <tr>
                                <td className="pb-3">
                                    #32568
                                </td>
                                <td className="pb-3">
                                    <div className="d-flex align-items-center justify-content-end">
                                        正在挖矿
                                       <img src={require('./checkmark.png').default} alt="check" className="h_50" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-3">
                                    30 TLB
                                </td>
                                <td className="pb-3">
                                    <div className="d-flex align-items-center justify-content-end">
                                       <img src={require('./checkmark.png').default} alt="check" className="h_50" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-3">
                                    e15r64...15d58
                                </td>
                                <td className="pb-3">
                                    <div className="d-flex align-items-center justify-content-end">
                                       <img src={require('./checkmark.png').default} alt="check" className="h_50" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-3">
                                    06-18 18:26
                                </td>
                                <td className="pb-3">
                                    <div className="d-flex align-items-center justify-content-end">
                                       <img src={require('./checkmark.png').default} alt="check" className="h_50" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br /><br /><br />
                </div>
                <div className="content_body">
                    <h4 className="text-white font_size_37">
                        初始矿机认购
                    </h4>
                    <br /><br />
                    <div className="cyan_btn_group row">
                        <div className="col-6 mb-3 mb-md-5">
                            <div className="col_wrapper px-3 px-md-5 mb-3 mb-md-4 text-center ">
                                <button data-mdb-ripple-color="#303447" data-mdb-ripple-duration="0.1s"
                                    className="btn btn-muted w-100 shadow-0 cyan_btn text_cyan">
                                    <strong className="font_size_58 cyan_btn_bottom">100T</strong>
                                    <br />
                                    <span className="font_size_37">
                                        15000U认购
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="col-6 mb-3 mb-md-5">
                            <div className="col_wrapper px-3 px-md-5 mb-3 mb-md-4 text-center ">
                                <button data-mdb-ripple-color="#303447" data-mdb-ripple-duration="0.1s"
                                    className="btn btn-muted w-100 shadow-0 cyan_btn text_cyan">
                                    <strong className="font_size_58 cyan_btn_bottom">50T</strong>
                                    <br />
                                    <span className="font_size_37">
                                        7500U认购
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="col-6 mb-3 mb-md-5">
                            <div className="col_wrapper px-3 px-md-5 mb-3 mb-md-4 text-center">
                                <button data-mdb-ripple-color="#303447" data-mdb-ripple-duration="0.1s"
                                    className="btn btn-muted w-100 shadow-0 cyan_btn text_cyan">
                                    <strong className="font_size_58 cyan_btn_bottom">25T</strong>
                                    <br />
                                    <span className="font_size_37">
                                        3500U认购
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="col-6 mb-3 mb-md-5">
                            <div className="col_wrapper px-3 px-md-5 mb-3 mb-md-4 text-center">
                                <button data-mdb-ripple-color="#303447" data-mdb-ripple-duration="0.1s"
                                    className="btn btn-muted w-100 shadow-0 cyan_btn text_cyan">
                                    <strong className="font_size_58 cyan_btn_bottom">5T</strong>
                                    <br />
                                    <span className="font_size_37">
                                        100U认购
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="content_body_body">
                        <h3 className="text-white text-center font_size_49">
                            模式选择
                        </h3>
                        <br /><br />
                        <div className="row justify-content-center">
                            <div className="col-11 col-md-10">
                                <div className="btn-group d-flex w-100">
                                    <button className="btn font_size_37 btn-primary w-50">灵活挖矿</button>
                                    <button className="btn font_size_37 btn-light w-50 text_blue">固定挖矿</button>
                                </div>
                                <br /><br />
                                <br />

                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-10 col-md-9">
                                <button className="btn btn-primary w-100 font_size_58 rounded-pill">
                                    立即挖矿
                                </button>
                                <br /><br />
                                <br />
                                <br />
                            </div>

                        </div>
                        <div className="row align-items-center">
                            <div className="col-5">
                                <div className="col_wrapper px-3 px-md-4">
                                    <button className="btn btn-muted w-100 font_size_49 border_cyan text_cyan rounded-3">
                                        领取收益
                                    </button>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="col_wrapper ">
                                    <p className="text-white font_size_37">
                                        参与<span className="text_cyan">68</span>个区块
                                        获得<span className="text_cyan">0.00248546</span>TLB
                                    </p>
                                    <br />
                                    <p className="text-white-50 font_size_29">
                                        (9600个区块奖励未领取自动暂停挖矿)
                                    </p>
                                    <br /><br />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="col_wrapper">
                                    <table className="w-100 text-center table_spaceY">
                                        <tbody>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="gray_shadow radius_30">
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        #32567
                                                        <br />
                                                        30 TLB
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper font_size_29 text-center text-white">
                                                        e15t26...65f98
                                                        <br />
                                                        6-18 18:16
                                                    </div>
                                                </td>
                                                <td className="p-2 p-md-4">
                                                    <div className="td_wrapper d-flex justify-content-end align-items-center font_size_29 text-center text-white">
                                                        <span>
                                                            0.00005189
                                                            <br />
                                                            TLB
                                                        </span>
                                                        <img style={{ height: "60px" }} className="ms-3" src={require('./gudgudy_sm.png').default} alt="gudgudi" />
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </section>
    )
}

const Section_5_d = () => {
    return (
        <section className="section_paddingX">
            <div className="content_wrapper bg_blue_9 px-2 px-md-5 py-3 py-md-5 radius_30">
                <div className="chart_wrapper">
                    <h3 className="text-end text_cyan font_size_68">
                        矿工监视
                    </h3>
                    <br /><br />
                    <div className="chart d-flex justify-content-center font_size_29">
                        <DoughnutChart></DoughnutChart>
                    </div>
                    <br /><br />
                </div>
                <hr className="bg-white mx-n2 mx-md-n5" style={{ height: '5px', opacity: '1' }} />
                <br /><br />
                <div className="table_wrapper">
                    <table className="w-100 text-white">
                        <thead className="font_size_37 text-center">
                            <tr>
                                <th className="pb-4 pb-md-5">
                                    矿工
                                </th>
                                <th className="pb-4 pb-md-5">
                                    出块率
                                </th>
                                <th className="pb-4 pb-md-5">
                                    出块占比
                                </th>
                            </tr>
                        </thead>
                        <tbody className="font_size_29 text-center">
                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#FF0000' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#19B819' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#19B819' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#F55B08' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#19B819' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#A0A0A0' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#19B819' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#FF0000' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#F55B08' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#F55B08' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#19B819' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-2 pb-md-3">
                                    <span style={{ background: '#FF0000' }} className="w_h_20 d-inline-block me-3 rounded-circle align-middle" ></span> tlb156862
                                </td>
                                <td className="pb-2 pb-md-3">
                                    18.72%
                                </td>
                                <td className="pb-2 pb-md-3">
                                    3.42%
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td className="py-3 py-md-5">

                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-muted shadow-0 text-white font_size_37">
                                            {'查看更多 >>'}
                                        </button>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    )
}
export default (props)=>{
    return (
        <>
            <Section_1_d></Section_1_d>
            <Section_2_d></Section_2_d>
            <Section_3_d></Section_3_d>
            <Section_4_d></Section_4_d>
            <Section_5_d></Section_5_d>
        </>
    );
}