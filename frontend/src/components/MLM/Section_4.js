import React from 'react';
import styled from 'styled-components';
import ImgWhitepaper from '../../img/whitepaper.webp'
import ImgFairy1 from '../../img/fairy1.webp'
import ImgFairy2 from '../../img/fairy2.webp'

const Section = styled.section`
	margin-top: 50px;
	padding-right: 0;
	padding-top: 50px;
	overflow: hidden;
	h3 {
		margin-top: 100px;
		margin-bottom: 100px;
	}
	img {margin-right: -15px}
	button.h2 {
		margin-top: 100px;
	}
	.content_mt {
		margin-top: -300px;
		@media (max-width: 767px) {
			margin-top: -100px;
		}
	}
`;


function Section_4(props) {
	return (
		<Section>
			<h3 className="text-center">代码审计</h3>
			<div className="content_wrapper">
				<div className="row justify-content-center section_paddingX">
					<div className="col-6 col-md-5 h-auto">
						<button className="h-100 bg-white d-inline-block btn btn-muted">
							<img className="w-100 img_contain" src={ImgFairy1} alt="fairyproof" />
						</button>
					</div>
					<div className="col-6 col-md-5 h-auto">
						<button className="h-100 bg-white d-inline-block btn btn-muted">
							<img className="w-100 img_contain" src={ImgFairy2} alt="" />
						</button>
					</div>
				</div>
				<button className="h2 btn rounded-0 btn-muted text-white shadow-0 border ">
					白皮书
				</button>
				<img className="w-100" src={ImgWhitepaper} alt="tl_img" />

			</div>
			<div className="content_mt">
				<button className="h3 btn btn-muted shadow-0 border text-white d-inline-block rounded-0">
					技术报告
				</button>
				<br /><br />
				<button className="h3 d-inline-block btn btn-muted text-black gradient_bg">
					下载白皮书
				</button>
			</div>
		</Section>
	);
}

export default Section_4;