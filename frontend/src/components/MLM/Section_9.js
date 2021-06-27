import React from 'react';
import styled from 'styled-components';
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
	return (
		<Section>
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
						<tr>
							<td>10001</td>
							<td>买入</td>
							<td>2021-6-12 22：00：00</td>
							<td>89554134</td>
						</tr>
						<tr>
							<td>10001</td>
							<td>卖出</td>
							<td>2021-6-12 22：00：00</td>
							<td>89554134</td>
						</tr>
						<tr>
							<td>10001</td>
							<td>买入</td>
							<td>2021-6-12 22：00：00</td>
							<td>89554134</td>
						</tr>
						<tr>
							<td>10001</td>
							<td>卖出</td>
							<td>2021-6-12 22：00：00</td>
							<td>89554134</td>
						</tr>
						<tr>
							<td>10001</td>
							<td>买入</td>
							<td>2021-6-12 22：00：00</td>
							<td>89554134</td>
						</tr>
						<tr>
							<td>10001</td>
							<td>买入</td>
							<td>2021-6-12 22：00：00</td>
							<td>89554134</td>
						</tr>
						<tr className="text_blue">
							<td>10001</td>
							<td>买入</td>
							<td>2021-6-12 22：00：00</td>
							<td>89554134</td>
						</tr>

					</tbody>
				</table>
			</div>
		</Section>
	);
}

export default Section_9;