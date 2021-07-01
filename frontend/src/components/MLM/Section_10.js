import React from 'react';
import styled from 'styled-components';

import ImgLogo from '../../img/logo-blue.webp'

const Section = styled.section`
	margin-top: 100px;
	.summary {
		padding: 30px;
	}
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
						width: 120px;
						height: 120px;
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
				height: 200px;
				display: flex;
				justify-content: center;
				align-items: center;
				@media (max-width: 575px) {
					height: 120px;
				}
			}
		}
	}
`


function Section_10(props) {
	return (
		<Section>
			<h3 className="text-center">
				TLBstaking生态
			</h3>
			<div className="summary">
				随着主网的上线，生态应用也将逐渐落地，按白皮书上生态
				规划从以下四个方面开始！
			</div>
			<div className="content_wrapper content_wrapper_body">
				<div className="row justify-content-between">
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3">
							<p>
								第一批公链生态DApp上
							</p>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3">
							<p>
								DeFi聚合器1.0应用上线
							</p>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3">
							<p>
								去中心化借贷-TP Lend
							</p>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3">
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