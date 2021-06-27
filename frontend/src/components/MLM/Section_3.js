import React from 'react';
import styled from 'styled-components';
import ImgLogo from '../../img/prism.webp'
import ImgGalaxy from '../../img/galaxy.webp'

const Section = styled.section`
    position: relative;
    margin-top: 100px;
    background: #080E23 url(${ImgGalaxy}) center/cover no-repeat;
`;
  
function Section_3(props) {
    return (
        <Section>
            <h3>层级塔</h3>
            <div className="content_wrapper">
                <img className="w-100" src={ImgLogo} alt="value_tree" />
            </div>
        </Section>
    );
}

export default Section_3;