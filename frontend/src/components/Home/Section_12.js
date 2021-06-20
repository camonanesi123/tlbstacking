import React from 'react';
import styled from 'styled-components';

import ImgInsurance from '../../img/insurance.webp'

const Section = styled.section`
    .globe_bg {
        height: 1000px;
        background: url(${ImgInsurance}) center/cover no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        @media (max-width: 991px) {
            height: 800px;
            @media (max-width: 767px) {
                height: 600px;
                @media (max-width: 575px) {
                    height: 400px;
                }
            }
        }
    }
`

function Section_12(props) {
    return (
        <Section className="">
            <h4 className="text-center text-white font_size_49">
                提供全球领先的去中心化借贷服务方案
            </h4>
            <br /><br /><br />
            <div className="globe_bg">
                <h3 className="text-center text-white font_size_90">
                    保险池金额
                </h3>
                <br /><br />
                <h3 className="text_red mt-3 mt-md-5 font-weight-normal text-center font_size_139">
                    889848234
                </h3>
            </div>
        </Section>
    );
}
export default Section_12;