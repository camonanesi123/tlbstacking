import React from 'react';
import styled from 'styled-components';

import ImgWechat from '../../img/social-wechat.webp'
import ImgGoogle from '../../img/social-google.webp'
import ImgYoutube from '../../img/social-youtube.webp'

const Footer = styled.footer`
	.social_row {
		@media (max-width: 991px) {
			img {
				height: 30px;
				@media (max-width: 767px) {
					height: 25px;
					@media (max-width: 400px) {
						height: 20px;
					}
				}
			}
		}
	}
`

export default function(props) {
	return (
		<Footer className="mt-3 mt-md-5">
			<div className="social_row text-white px-3 px-md-5 py-2 border-top border-bottom d-flex align-items-center">
				<h4 className="font_size_29 mb-0 me-3">
					友情链接：
				</h4>
				<ul className="list-unstyled flex-grow-1 m-0 p-0 d-flex align-items-center justify-content-between">
					<li>
						<a className="font_size_49 text-white" href="#">
							<i className="fab fa-facebook    "></i>
						</a>
					</li>
					<li>
						<a className="font_size_49 text-white" href="#">
							<i className="fab fa-twitter    "></i>
						</a>
					</li>
					<li>
						<a className="font_size_49 text-white" href="#">
							<i className="fab fa-linkedin-in    "></i>
						</a>
					</li>
					<li>
						<a className="font_size_49 text-white" href="#">
							<i className="fab fa-tumblr"></i>
						</a>
					</li>
					<li>
						<a className="font_size_49 text-white" href="#">
							<img src={ImgWechat} alt="wechat" />
						</a>
					</li>
					<li>
						<a className="font_size_49 text-white" href="#">
							<img src={ImgGoogle} alt="google" />
						</a>
					</li>
					<li>
						<a className="font_size_49 text-white" href="#">
							<img src={ImgYoutube} alt="youtube" />
						</a>
					</li>
				</ul>
			</div>
			<p className="text-white text-center font_size_29 py-3 py-md-5 px-3 px-md-5 mb-0">
				Copyright © 2021 TLBstaking inc
			</p>
		</Footer>
	);
}