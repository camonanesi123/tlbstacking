import React from 'react';
import './Loader.css'
function Loader(props) {
    return (
        <div className="Loader d-flex justify-content-center align-items-center">
            <img className="logo me-2" src={require('./logo.png').default} alt="" />
            <div className="loader_content ms-2 ms-md-5">
                <h2 className="text_cyan font_size_90">
                    TLBstaking
                </h2>
                <h3 className="text-white font_size_49 content_loading_animate">
                    塔勒布加载中<span>.</span><span>.</span><span>.</span><span>.</span>
                </h3>
            </div>
        </div>
    );
}
export default Loader;