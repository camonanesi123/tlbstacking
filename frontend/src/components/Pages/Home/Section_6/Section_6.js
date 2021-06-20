import React from 'react';
import './Section_6.css'
function Section_6(props) {
    return (
        <section className="Section_6 section_paddingX py-3">
            <br /><br /><br />
            <br /><br /><br />
            <div className="content_wrapper">
                <h3 className="text-white font_size_68">
                    累计业绩排行榜
                </h3>
                <br /><br /><br />
                <table className="table custom_table font_size_37">
                    <thead>
                        <tr className="text-white mb-3 mb-md-5">
                            <th>排名</th>
                            <th>地址</th>
                            <th>旗下业绩</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-white" >
                                <span className="serial_number bg_yellow">
                                    1
                                </span>
                            </td>
                            <td className="text_yellow">0x**398</td>
                            <td className="text_yellow">135789</td>
                        </tr>
                        <tr>
                            <td className="text-white">
                                <span className="serial_number bg_9">
                                    2
                                </span>
                            </td>
                            <td className="text_9">0x**398</td>
                            <td className="text_9">135789</td>
                        </tr>
                        <tr>
                            <td className="text-white">
                                <span className="serial_number bg_yellow_50">
                                    3
                                </span>
                            </td>
                            <td className="text_yellow_50">0x**492</td>
                            <td className="text_yellow_50">135789</td>
                        </tr>
                        <tr>
                            <td className="text-black">
                                <span className="serial_number bg-white">
                                    4
                                </span>
                            </td>
                            <td className="text-white">0x**234</td>
                            <td className="text-white">135789</td>
                        </tr>
                        <tr>
                            <td className="text-black">
                                <span className="serial_number bg-white">
                                    5
                                </span>
                            </td>
                            <td className="text-white">0x**747</td>
                            <td className="text-white">135789</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
export default Section_6;