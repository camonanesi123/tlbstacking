import React from 'react';
import styled from 'styled-components';
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
    return (
        <Section className="section_paddingX py-3">
            <br /><br /><br />
            <br /><br /><br />
            <div className="content_wrapper p-0 p-md-5">
                <h3 className="text-white text-center font_size_68">
                    智能合约统计
                </h3>
                <br /><br /><br />
                <table className="w-100 text-center text-white font_size_37 custom_table custom_table_style">
                    <tbody>
                        <tr>
                            <td>合约地址</td>
                            <td>TDFtSXGdn****MXun</td>
                        </tr>
                        <tr>
                            <td>推荐人地址</td>
                            <td>TDFtSXGdn****MXun</td>
                        </tr>
                        <tr>
                            <td>我的邀请地址</td>
                            <td>TDFtSXGdn****MXun</td>
                        </tr>
                        <tr>
                            <td>回购金额</td>
                            <td>568646513</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
}
export default Section_13;