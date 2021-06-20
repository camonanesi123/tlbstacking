import React from 'react';
import styled from 'styled-components';

import ImgIntro from '../../img/intro.webp'

const Section = styled.section`
	.content_wrapper {
		position: relative;
		padding: 50px;
		z-index: 1;
		position: relative;
		padding-right: 30% !important;
		text-align: justify;

		@media (max-width: 991px) {
			padding: 40px;
			@media (max-width: 575px) {
				padding: 30px;
			}
		}
		&::before {
			content: "";
			top: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			background: #191f34 url(${ImgIntro}) right center/cover no-repeat;
			background-blend-mode: exclusion;
			opacity: 0.6;
			pointer-events: none;
			z-index: -1;
		}
	}
`

function Section_2(props) {
	return (
		<Section className="mt-5">
			<h3 className="font_size_68 text-white section_paddingX mb-3 mb-md-5 font_family_FZDHTJW" style={{ letterSpacing: '15px' }}>
				项目介绍
			</h3>
			<div className="content_wrapper">
				<p className="font_size_29 text-white font_family_alibabapuhuiti">
					TLBstaking是一个全球去中心化金融综合商
					业体，致力于成为波场用户最广泛使用的
					DeFi应用平台，建立一个多层面的金融系统。
					TLBstaking将运用去中心化金融（DeFi +
					DAO）工具，基于公平、 透明、人人共享的
					区块链技术和理念引发金融、科技乃至社会经
					济 制度上的革命，弥合世界之间的鸿沟，实现
					社会资产优化均衡再分配推动，人类社会均衡
					向好、可持续快速发展。
				</p>
			</div>
		</Section>
	);
}
export default Section_2;