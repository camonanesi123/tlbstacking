import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';

import {NF} from '../../util';
import ImgWave from '../../img/wave.webp'

const Section = styled.section`
	position: relative;
	&::before {
		content: "";
		width: 100%;
		height: 33%;
		position: absolute;
		top: -65px;
		right: 0;
		background: #080e23 url(${ImgWave}) center/cover no-repeat;
		background-blend-mode: screen;
	}
	h3 {
		margin-top: 100px;
		color: white;
		text-align: center;
	}
	.content_wrapper {
		z-index: 1;
		position: relative;
		.custom_table {
			&.custom_table_style {
				border-collapse: separate;
				border-spacing: 20px;
				td {
					background: #393e4f;
					&:first-of-type {
						border-radius: 25px 0 0 25px;
					}
					&:last-of-type {
						border-radius: 0 25px 25px 0;
					}
				}
			}
		}
	}
`

function Section_7(props) {
	let contract = useSelector(state => state.contract);
	return (
		<Section>
			<div className="content_wrapper p-0 p-md-5">
				<h3>数据统计</h3>
				<table className="w-100 text-center custom_table custom_table_style">
					
					<tbody>
						<tr>
							<td style={{maxWidth:100}}>用户ID</td>
							<td style={{minWidth:100}}>{contract._userid ? contract._userid : '-' }</td>
						</tr>
						<tr>
							<td>钱包地址</td>
							<td>{contract.address ? contract.address.slice(0,8)+'***'+contract.address.slice(-4) : '-' }</td>
						</tr>
						<tr>
							<td>USDT总收益</td>
							<td>{contract._withdrawal ? NF(contract._withdrawal) + 'USDT' : '-'}</td>
						</tr>
						<tr>
							<td>综合收益</td>
							<td>{contract._limit ? NF(contract._limit) + 'USDT' : '-'}</td>
						</tr>
						<tr>
							<td>总持币地址</td>
							<td>{contract._children || '-'}</td>
						</tr>
						<tr>
							<td>总业绩</td>
							<td>{contract._contribution ? NF(contract._contribution) : '-'}</td>
						</tr>
						<tr>
							<td>累计存款</td>
							<td>{contract._deposit ? NF(contract._deposit) : '-'}</td>
						</tr>
						<tr>
							<td>可提金额</td>
							<td>{contract._withdrawable ? NF(contract._withdrawable) : '-'}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Section>
	);
}

export default Section_7;