import React from 'react';
import './Section_9.css';
function Section_9(props) {
    return (
        <section className="Section_9">
            <br /><br /><br />
            <div className="content_wrapper p-0 p-md-5">
                <h3 className="text-white text-center font_size_68">
                    交易记录
                </h3>
                <h4 className="text-white text-center font_size_37">
                    实时数据
                </h4>
                <br /><br /><br />
                <table className="w-100  text-center text-white font_size_29 custom_table custom_table_style">
                    <thead>
                        <tr >
                            <td className="bg_blue_9 py-2 py-md-3 radius_left_side_pill">
                                ID
                            </td>
                            <td className="bg_blue_9 py-2 py-md-3">
                                状态
                            </td>
                            <td className="bg_blue_9 py-2 py-md-3">
                                时间
                            </td>
                            <td className="bg_blue_9 py-2 py-md-3 radius_right_side_pill">
                                数量
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10001</td>
                            <td>买入</td>
                            <td>2021-6-12 22：00：00</td>
                            <td>89554134</td>
                        </tr>
                        <tr>
                            <td>10001</td>
                            <td>卖出</td>
                            <td>2021-6-12 22：00：00</td>
                            <td>89554134</td>
                        </tr>
                        <tr>
                            <td>10001</td>
                            <td>买入</td>
                            <td>2021-6-12 22：00：00</td>
                            <td>89554134</td>
                        </tr>
                        <tr>
                            <td>10001</td>
                            <td>卖出</td>
                            <td>2021-6-12 22：00：00</td>
                            <td>89554134</td>
                        </tr>
                        <tr>
                            <td>10001</td>
                            <td>买入</td>
                            <td>2021-6-12 22：00：00</td>
                            <td>89554134</td>
                        </tr>
                        <tr>
                            <td>10001</td>
                            <td>买入</td>
                            <td>2021-6-12 22：00：00</td>
                            <td>89554134</td>
                        </tr>
                        <tr className="text_blue">
                            <td>10001</td>
                            <td>买入</td>
                            <td>2021-6-12 22：00：00</td>
                            <td>89554134</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Section_9;