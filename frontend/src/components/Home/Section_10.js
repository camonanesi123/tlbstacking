import React from 'react';
import styled from 'styled-components';

import ImgLogo from '../../img/logo-blue.webp'

const Section = styled.section`
	.content_wrapper_body {
		position: relative;
		&::after {
			content: "";
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 350px;
			height: 350px;
			background: #080E23 url(${ImgLogo}) center/auto 60% no-repeat;
			border-radius: 50%;
			@media (max-width: 991px) {
				width: 300px;
				height: 300px;
				@media (max-width: 767px) {
					width: 200px;
					height: 200px;
					@media (max-width: 575px){
						width: 100px;
						height: 100px;
					}
				}
			}
		}

		[class*="col"] {
			margin-bottom: 45px;
			@media (max-width: 767px) {
				margin-bottom: 20px;
				@media (max-width: 575px) {
					margin-bottom: 15px;
				}
			}
			.col_wrapper {
				height: 250px;
				display: flex;
				justify-content: center;
				align-items: center;
				@media (max-width: 575px) {
					height: 150px;
				}
			}
		}
	}
`


function Section_10(props) {
	return (
		<Section className="section_paddingX">
			<br /><br /><br />
			<div className="content_head mb-3 mb-md-5">
				<h3 className="text-white text-center font_size_68">
					TLBstaking生态
				</h3>
				<br /><br />
				<div className="row justify-content-center">
					<div className="col-11 col-md-10">
						<p className="text-white font_size_29">
							随着主网的上线，生态应用也将逐渐落地，按白皮书上生态
							规划从以下四个方面开始！
						</p>
					</div>
				</div>
			</div>
			<div className="content_wrapper content_wrapper_body">
				<div className="row justify-content-between">
					<div className="col-6 col-md-5">
						<div className="col_wrapper font_size_29 bg_blue_deep text-white p-3">
							<p>
								第一批公链生态DApp上
							</p>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper font_size_29 bg_blue_deep text-white p-3">
							<p>
								DeFi聚合器1.0应用上线
							</p>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper font_size_29 bg_blue_deep text-white p-3">
							<p>
								去中心化借贷-TP Lend
							</p>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper font_size_29 bg_blue_deep text-white p-3">
							<p>
								NFT平台-NFTTP
							</p>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

export default Section_10;