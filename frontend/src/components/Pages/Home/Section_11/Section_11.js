import React from 'react';
import './Section_11.css';
function Section_11(props) {
    return (
        <section className="Section_11 section_paddingX">
            <br /><br /><br />
            <div className="content_head">
                <h2 className="text-white text-center font_size_90 mb-3 mb-md-5">
                    保险池机制倒计时
                </h2>
            </div>
            <div className="content_wrapper content_wrapper_body">
                <div className="countdown_wrapper d-flex justify-content-center">
                    <div className="countdown_item text-center me-3 me-md-5 text-white">
                        <strong className="count py-2 px-3 text_cyan font_size_104 d-inline-block ">
                            10
                        </strong>
                        <br />
                        <br />
                        <span className="font_size_29">
                            天
                        </span>
                    </div>
                    <div className="countdown_item text-center me-3 me-md-5 text-white">
                        <strong className="count py-2 px-3 text_cyan font_size_104 d-inline-block ">
                            24
                        </strong>
                        <br />
                        <br />
                        <span className="font_size_29">
                            小时
                        </span>
                    </div>
                    <div className="countdown_item text-center me-3 me-md-5 text-white">
                        <strong className="count py-2 px-3 text_cyan font_size_104 d-inline-block ">
                            59
                        </strong>
                        <br />
                        <br />
                        <span className="font_size_29">
                            分钟
                        </span>
                    </div>
                    <div className="countdown_item text-center text-white">
                        <strong className="count py-2 px-3 text_cyan font_size_104 d-inline-block ">
                            59
                        </strong>
                        <br />
                        <br />
                        <span className="font_size_29">
                            秒钟
                        </span>
                    </div>
                </div>
                <br /><br /><br />
                
            </div>
        </section>
    );
}
export default Section_11;