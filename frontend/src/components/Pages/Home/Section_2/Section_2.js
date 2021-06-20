import React from 'react';
import './Section_2.css'
function Section_2(props) {
    return (
        <section className="Section_2 mt-5">
            <h3 className="font_size_68 text-white section_paddingX mb-3 mb-md-5 font_family_FZDHTJW" style={{ letterSpacing: '15px' }}>
                项目介绍
            </h3>
            <div className="content_wrapper">
                <p className="font_size_29 text-white font_family_alibabapuhuiti">
                    TLBstaking是一个全球去中心化金融综合商
                    业体，致力于成为波场用户最广泛使用的
                    DeFi应用平台，建立一个多层面的金融系统。
                    TLBstaking将运用去中心化金融（DeFi +
                    DAO）工具，基于公平、 透明、人人共享的
                    区块链技术和理念引发金融、科技乃至社会经
                    济 制度上的革命，弥合世界之间的鸿沟，实现
                    社会资产优化均衡再分配推动，人类社会均衡
                    向好、可持续快速发展。
                </p>
            </div>
        </section>
    );
}
export default Section_2;