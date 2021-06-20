import React from 'react';
import './Section_3.css'
function Section_3(props) {
    return (
        <section className="Section_3 section_paddingX py-3">
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <h3 className="font_size_68 text-white font_family_FZDHTJW">
                项目介绍
            </h3>
            <div className="content_wrapper">
                <img className="w-100" src={require('./value_tree.png').default} alt="value_tree" />
            </div>
        </section>
    );
}

export default Section_3;