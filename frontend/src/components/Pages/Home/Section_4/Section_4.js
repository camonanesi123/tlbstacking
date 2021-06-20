import React from 'react';
import './Section_4.css';
function Section_4(props) {
    return (
        <section className="Section_4 my-3 my-md-5 section_paddingX">
            <h3 className="text-center font_size_68 text-white mb-3 font_family_FZDHTJW">
                代码审计
            </h3>
            <div className="content_wrapper">
                <br /><br /><br /><br />
                <div className="row justify-content-center">
                    <div className="col-6 col-md-5 h-auto">
                        <button className="h-100 bg-white d-inline-block btn btn-muted">
                            <img className="w-100 img_contain" src={require('./fairyproof.png').default} alt="fairyproof" />
                        </button>
                    </div>
                    <div className="col-6 col-md-5 h-auto">
                        <button className="h-100 bg-white d-inline-block btn btn-muted">
                            <img className="w-100 img_contain" src={require('./slowing.png').default} alt="" />
                        </button>
                    </div>
                </div>
                <br /><br /><br /><br />
                <h3>
                    <button className="btn font_size_90 rounded-0 btn-muted text-white shadow-0 border font_family_FZDHTJW">
                        白皮书
                    </button>
                </h3>
                <img className="mt-n3 d-inline-block tl_img w-100" src={require('./tl_img.png').default} alt="tl_img" />

            </div>
            <div className="content_mt">
                <button className="btn btn-muted shadow-0 font_size_49 border text-white d-inline-block p-2 rounded-0">
                    技术报告
                </button>
                <br /><br />
                <button className="font_size_49 p-2 d-inline-block btn btn-muted text-black font_size_68 gradient_bg">
                    下载白皮书
                </button>
            </div>
        </section>
    );
}

export default Section_4;