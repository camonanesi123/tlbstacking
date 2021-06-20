import React from 'react';
import ImgLogo from '../../img/prism.webp'
import ImgGalaxy from '../../img/galaxy.webp'

const cssSecsion = {
    padding: '0 40px',
    position: 'relative',
    background: `#080E23 url(${ImgGalaxy}) center/cover no-repeat`,
};
  
function Section_3(props) {
    return (
        <section style={cssSecsion} className="section_paddingX py-3">
            <h3 className="font_size_68 text-white">
                项目介绍
            </h3>
            <div className="content_wrapper">
                <img className="w-100" src={ImgLogo} alt="value_tree" />
            </div>
        </section>
    );
}

export default Section_3;