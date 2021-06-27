import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import ImgCounter from '../../img/counter.webp'

import ImgInsurance from '../../img/insurance.webp'

const Section = styled.section`
    margin-top: 100px;
    .count {
        background: url(${ImgCounter}) center/cover no-repeat;
        
    }
    .globe_bg {
        margin-top: 50px;
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
    .pool-amount {
        text-align: center;
        color: #cc0000;
        text-shadow: 0px 10px 5px black;
        font-weight: bolder;
    }
`
const calculateTimeLeft = (time) => {
	if (time) {
		let timeleft =  Math.floor((time + 129600) - (new Date().getTime()/1000));
		return {
            insuranceHours: Math.floor(timeleft / 3600),
            insuranceMinites: Math.floor((timeleft % 3600) / 3600),
            insuranceSeconds: timeleft % 60
        };
	}
	return {
        insuranceHours: 0,
        insuranceMinites: 0,
        insuranceSeconds: 0
    };
}

function Section_11(props) {
	let contract = useSelector(state => state.contract);
	const [time, setTime] = useState(calculateTimeLeft(contract.insuranceCounterTime));
	useEffect(() => {
		const timer=setTimeout(() => {
			setTime(calculateTimeLeft(contract.insuranceCounterTime));
		}, 1000);
		return () => clearTimeout(timer);
	});

    return (
        <Section className="section_paddingX">
            <h3 className="text-center">
                保险池机制倒计时
            </h3>
            <div className="content_wrapper content_wrapper_body">
                <div className="countdown_wrapper d-flex justify-content-center">
                    <div className="countdown_item text-center me-3 me-md-5 text-white">
                        <strong className="h1 count py-2 px-3 text_cyan d-inline-block ">
                            {(time.insuranceHours > 9 ? '' : '0') + time.insuranceHours}
                        </strong>
                        <h4>
                            小时
                        </h4>
                    </div>
                    <div className="countdown_item text-center me-3 me-md-5 text-white">
                        <strong className="h1 count py-2 px-3 text_cyan d-inline-block ">
                            {(time.insuranceMinites > 9 ? '' : '0') + time.insuranceMinites}
                        </strong>
                        <h4>
                            分钟
                        </h4>
                    </div>
                    <div className="countdown_item text-center text-white">
                        <strong className="h1 count py-2 px-3 text_cyan d-inline-block ">
                            {(time.insuranceSeconds > 9 ? '' : '0') + time.insuranceSeconds}
                        </strong>
                        <h4>
                            秒钟
                        </h4>
                    </div>
                </div>
            </div>
            <h4 className="text-center text-white font_size_49">
                提供全球领先的去中心化借贷服务方案
            </h4>
            <div className="globe_bg">
                <h2 className="text-center mb-5">
                    保险池金额
                </h2>
                <h2 className="pool-amount">
                    {contract.insuranceAmount ? '$' + contract.insuranceAmount : '-'}
                </h2>
            </div>

        </Section>
    );
}
export default Section_11;