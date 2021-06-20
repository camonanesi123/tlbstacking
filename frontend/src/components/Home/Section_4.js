import React from 'react';
import styled from 'styled-components';
import ImgWhitepaper from '../../img/whitepaper.webp'
import ImgFairy1 from '../../img/fairy1.webp'
import ImgFairy2 from '../../img/fairy2.webp'

const Section = styled.section`
	padding-top: 50px;
	overflow: hidden;
	.content_mt {
		margin-top: -300px;
		@media (max-width: 767px) {
			margin-top: -100px;
		}
	}
`;

const pl1 = {
	paddingLeft: 15,
};

function Section_4(props) {
	return (
		<Section className="my-3 my-md-5">
			<h3 className="text-center font_size_68 text-white mb-3 font_family_FZDHTJW">
				代码审计
			</h3>
			<div className="content_wrapper">
				<br /><br /><br /><br />
				<div className="row justify-content-center  section_paddingX">
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
				<br /><br /><br /><br />
				<h3 style={pl1}>
					<button className="btn font_size_90 rounded-0 btn-muted text-white shadow-0 border font_family_FZDHTJW">
						白皮书
					</button>
				</h3>
				<img className="mt-n3 d-inline-block tl_img w-100" src={ImgWhitepaper} alt="tl_img" />

			</div>
			<div className="content_mt" style={pl1}>
				<button className="btn btn-muted shadow-0 font_size_49 border text-white d-inline-block p-2 rounded-0">
					技术报告
				</button>
				<br /><br />
				<button className="font_size_49 p-2 d-inline-block btn btn-muted text-black font_size_68 gradient_bg">
					下载白皮书
				</button>
			</div>
		</Section>
	);
}

export default Section_4;