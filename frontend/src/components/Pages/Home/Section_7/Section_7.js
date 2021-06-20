import React from 'react';
import './Section_7.css'
function Section_7(props) {
    return (
        <section className="Section_7 section_paddingX py-3">
            <br /><br /><br />
            <br /><br /><br />
            <div className="content_wrapper p-0 p-md-5">
                <h3 className="text-white font_size_68">
                    累计业绩排行榜
                </h3>
                <br /><br /><br />
                <table className="w-100 text-center text-white font_size_37 custom_table custom_table_style">
                    <tbody>
                        <tr>
                            <td>用户ID</td>
                            <td>1008800101</td>
                        </tr>
                        <tr>
                            <td>钱包地址</td>
                            <td>1008800101</td>
                        </tr>
                        <tr>
                            <td>USDT总收益</td>
                            <td>4252463 USDT</td>
                        </tr>
                        <tr>
                            <td>综合收益</td>
                            <td>356  BT</td>
                        </tr>
                        <tr>
                            <td>总持币地址</td>
                            <td>192.168.0.1</td>
                        </tr>
                        <tr>
                            <td>总业绩</td>
                            <td>984531344</td>
                        </tr>
                        <tr>
                            <td>累计存款</td>
                            <td>5256863</td>
                        </tr>
                        <tr>
                            <td>可提金额</td>
                            <td>3875466</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Section_7;