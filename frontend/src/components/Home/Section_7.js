import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';

import ImgWave from '../../img/wave.webp'

const Section = styled.section`
	position: relative;
	&::before {
		content: "";
		width: 100%;
		height: 33%;
		position: absolute;
		top: -7%;
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
		<Section className="section_paddingX py-3">
			<div className="content_wrapper p-0 p-md-5">
				<h3 className="font_size_90">
					数据统计
				</h3>
				<table className="w-100 text-center text-white font_size_37 custom_table custom_table_style">
					<tbody>
						<tr>
							<td>用户ID</td>
							<td>{contract.userid ? contract.userid : '-' }</td>
						</tr>
						<tr>
							<td>钱包地址</td>
							<td>{contract.address ? contract.address.slice(0,4)+'...'+contract.address.slice(-4) : '-' }</td>
						</tr>
						<tr>
							<td>USDT总收益</td>
							<td>{contract.totalWithdrwal ? contract.totalWithdrwal : '-' } USDT</td>
						</tr>
						<tr>
							<td>综合收益</td>
							<td>{contract.maxProfits ? contract.maxProfits : '-' } USDT</td>
						</tr>
						<tr>
							<td>总持币地址</td>
							<td>{contract.children ? contract.children : '-' }</td>
						</tr>
						<tr>
							<td>总业绩</td>
							<td>{contract.totalDeposit ? contract.totalDeposit : '-' }</td>
						</tr>
						<tr>
							<td>累计存款</td>
							<td>{contract.totalDeposit ? contract.totalDeposit : '-' }</td>
						</tr>
						<tr>
							<td>可提金额</td>
							<td>{contract.withdrawal ? contract.withdrawal : '-' }</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Section>
	);
}

export default Section_7;