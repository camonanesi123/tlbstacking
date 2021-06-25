import React from 'react';
import styled from 'styled-components';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Logo from '../../img/logo.webp'

const Head = styled.header`
	background: #0e1525;
    padding: 15px 36px;
    @media (max-width: 575px) {
        padding: 8px 15px;
    }
    @media (max-width: 767px) {
        .logo {
        height: 60px;
        @media (max-width: 575px) {
            height: 40px;
        }
        }
        .toggle_wrapper {
            .fa-5x {
                font-size: 3rem;
                @media (max-width: 575px) {
                font-size: 2rem;
                }
            }
        }
    }
`


export default function (props) {
    return (
        <Head>
            <div className="header_wrapper d-flex justify-content-between align-items-center">
                <Link to="/" className="btn">
                    <img className="logo" src={Logo} alt="logo" />
                </Link>
                <div className="col_wrapper d-flex align-items-center">
                    <Link to="/" className="btn bg-black rounded-pill font_size_29 text-white">
                        中文（简体）
                    </Link>
                    <div className="toggle_wrapper ms-1 ms-sm-3">
                        <div className="dropdown custom_dropdown">
                            <button id="dropdownMenuButton"
                                data-mdb-toggle="dropdown" className="btn btn-muted shadow-0 text-white dropdown-toggle">
                                <i className="fas fa-bars fa-5x"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end custom_dropdown_menu bg_blue_9" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link to="/" className="dropdown-item text-white">
                                        主页
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/miner" className="dropdown-item text-white">
                                        矿机
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Head>
    );
}