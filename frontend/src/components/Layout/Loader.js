import React from 'react';
import styled from 'styled-components';

import Logo from '../../img/logo.webp'

const Loader = styled.div`
	position: relative;
	height: 100vh;
	background-color: #080e23;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.logo-overlay {
		position: absolute;
		height: 100vh;
		width: 100%;
		background: url('../../img/logo.webp') center bottom / contain no-repeat;
		opacity: 0.02;
	}

	.logo {
		height: 180px;
		@media (max-width: 767px) {
			height: 130px;
			@media (max-width: 575px) {
				height: 90px;
			}
		}
	}
	.content_loading_animate{
		span{
			opacity: 0;
			animation: .5s linear animateLoading infinite;
			&:nth-child(1){
				animation-delay: .1s;
			}
			&:nth-child(1){
				animation-delay: .2s;
			}
			&:nth-child(1){
				animation-delay: .3s;
			}
			&:nth-child(1){
				animation-delay: .4s;
			}
			@keyframes animateLoading {
				0%{
					opacity: 0;
				}
				100%{
					opacity: 1;
				}
			}
		}
	}
`

export default function(props) {
	return (
		<Loader>
			<div className="logo-overlay"></div>

			<img className="logo me-2" src={Logo} alt="" />
			<div className="loader_content ms-2 ms-md-5">
				<h2 className="text_cyan">
					TLBstaking
				</h2>
				<h3 className="text-white content_loading_animate">
					塔勒布加载中<span>.</span><span>.</span><span>.</span><span>.</span>
				</h3>
			</div>
		</Loader>
	);
}