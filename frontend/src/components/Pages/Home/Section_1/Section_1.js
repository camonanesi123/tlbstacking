import React from 'react';
import './Section_1.css';
import LineChart from '../../../reuse_components/LineChart/LineChart'

function Section_1(props) {
    return (
        <section className="Section_1 section_paddingX">
            <div className="text-center">
                <h1 className="text-center font_family_bahnschrift font_size_168">
                    <span className="text_red">TLB</span>
                    <span className="text_cyan">
                        staking
                    </span>
                </h1>
                <h2 className="text-white font_size_139 font_family_FZDHTJW" style={{letterSpacing: '15px'}}>
                    全网投币量
                </h2>
                <br /><br /> <br />
                <strong className="text_red font_size_68">
                    $229,773,908.50
                </strong>
            </div>
            <div className="h_400">
            <LineChart></LineChart>
            </div>
            <span className="text-end d-block font_size_29 text_cyan font_family_FZDHTJW">
                +122.4233 TLBstaking (+4.57%) <span className="text-white">过去24小时</span>
            </span>
            <br /><br /> <br />
            <div className="text-center">
                <h3 className="text-white font_size_58 mb-2 mb-md-5 font_family_FZDHTJW">
                    进入一个连接服务的新领域
                </h3>
                <p className="text-white font_size_37 font_family_alibabapuhuiti">
                    TLBstaking应用程序和服务使用IBC连接
                    为企业级应用构建全球公链
                    这个创新让你可以在主权国家之间自由交换资产和数据
                </p>
            </div>

            <br /><br /><br /><br />
            
        </section>
    );
}

export default Section_1;