import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {NF} from '../../util';
const Section = styled.section`
	h3 {
		margin-top: 50px;
	}
	.content_wrapper {
		z-index: 1;
		position: relative;
		.custom_table{
			tbody{
				td{
					padding-top: 20px;
				}
			}
		}
	}
`

function Section_9(props) {
	let contract = useSelector(state => state.contract);
	let pendingKey = 0;
	return (
		<Section>
			{
				contract.pending.length ? <>
					<h3 className="text-center"></h3>
					<h4 className="text-center">我的挂单</h4>
					<div className="content_wrapper p-0 p-md-5 mb-5">
						<table className="w-100  text-center custom_table custom_table_style">
							<thead>
								<tr >
									<td className="bg_blue_9 py-2 py-md-3 radius_left_side_pill">
										时间
									</td>
									<td className="bg_blue_9 py-2 py-md-3">
										状态
									</td>
									<td className="bg_blue_9 py-2 py-md-3 radius_right_side_pill">
										余额
									</td>
								</tr>
							</thead>
							<tbody>
								{contract.pending ? (
									contract.pending.map(v=><tr key={v[0]}>
										<td>{v[0]}</td>
										<td>{v[1]===0?'买入':'出售'}</td>
										<td>{v[2].toFixed(2) + '/' + v[3].toFixed(2)} {v[1]===0?'USDT':'TLB'}</td>
									</tr>)
								) : null}
							</tbody>
						</table>
					</div>
				</>  : null
			}
			<h3 className="text-center">交易记录</h3>
			<h4 className="text-center">实时数据</h4>
			<div className="content_wrapper p-0 p-md-5">
				<table className="w-100  text-center custom_table custom_table_style">
					<thead>
						<tr >
							<td className="bg_blue_9 py-2 py-md-3 radius_left_side_pill">
								ID
							</td>
							<td className="bg_blue_9 py-2 py-md-3">
								状态
							</td>
							<td className="bg_blue_9 py-2 py-md-3">
								时间
							</td>
							<td className="bg_blue_9 py-2 py-md-3 radius_right_side_pill">
								数量
							</td>
						</tr>
					</thead>
					<tbody>
						{contract.orders ? (
							contract.orders.map(v=><tr key={v[0]}>
								<td>{v[0]}</td>
								<td>{v[1]===0?'买入':'出售'}</td>
								<td>{v[3]}</td>
								<td>{NF(v[2])} TLB</td>
							</tr>)
						) : null}
					</tbody>
				</table>
			</div>
		</Section>
	);
}

export default Section_9;