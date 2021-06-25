import React,{useEffect} from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import ImgCounter from '../../img/counter.webp'

const Section = styled.section`
    .count {
        background: url(${ImgCounter}) center/cover no-repeat;
        
    }
`

function Section_11(props) {
	let contract = useSelector(state => state.contract);
    let time = 0, hours = 0, minites = 0, seconds = 0;
    if (contract.insuranceCounterTime) {
        time =  Math.floor((contract.insuranceCounterTime + 129600) - (new Date().getTime()/1000));
        hours = Math.floor(time / 3600);
        minites = Math.floor((time % 3600) / 3600);
        seconds = time % 60;
    }
    
    useEffect(() => {
        console.log(contract.insuranceCounterTime)
	}, [])

    return (
        <Section className="section_paddingX">
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
                            {(hours > 9 ? '' : '0') + hours}
                        </strong>
                        <br />
                        <br />
                        <span className="font_size_29">
                            小时
                        </span>
                    </div>
                    <div className="countdown_item text-center me-3 me-md-5 text-white">
                        <strong className="count py-2 px-3 text_cyan font_size_104 d-inline-block ">
                            {(minites > 9 ? '' : '0') + minites}
                        </strong>
                        <br />
                        <br />
                        <span className="font_size_29">
                            分钟
                        </span>
                    </div>
                    <div className="countdown_item text-center text-white">
                        <strong className="count py-2 px-3 text_cyan font_size_104 d-inline-block ">
                            {(seconds > 9 ? '' : '0') + seconds}
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
        </Section>
    );
}
export default Section_11;