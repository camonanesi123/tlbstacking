import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import {NF, copyToClipboard} from '../../util';
import Metamask from '../../connector';

const Section = styled.section`
    .custom_table {
        &.custom_table_style {
            border-collapse: separate;
            border-spacing: 20px;
            tr {
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
function Section_13(props) {
    const contractAddress = Metamask.contract;
	let contract = useSelector(state => state.contract);
    return (
        <Section className="py-3">
            <div className="content_wrapper p-0 p-md-5">
                <h3 className="text-center">
                    智能合约统计
                </h3>
                <table className="w-100 text-center custom_table custom_table_style">
                    <tbody>
                        <tr>
                            <td>合约地址</td>
                            <td>{contractAddress ? contractAddress.slice(0,8)+'***'+contractAddress.slice(-4) : '-'}</td>
                        </tr>
                        <tr>
                            <td>推荐人地址</td>
                            <td>{contract.referer ? contract.referer.slice(0,8)+'***'+contract.referer.slice(-4) : '-'}</td>
                        </tr>
                        <tr>
                            <td>我的邀请地址</td>
                            <td onClick={()=>copyToClipboard('https://'+window.location.host+'/mlm/'+contract.address || '')}>{contract.address ? contract.address.slice(0,8)+'***'+contract.address.slice(-4) : '-'}</td>
                        </tr>
                        <tr>
                            <td>回购金额</td>
                            <td>{contract.redeemAmount ? NF(contract.redeemAmount) : '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
}
export default Section_13;