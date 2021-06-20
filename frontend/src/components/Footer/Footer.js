import React from 'react';
import './Footer.css';
function Footer(props) {
    return (
        <footer className="Footer mt-3 mt-md-5">
            <div className="footer_social_row text-white px-3 px-md-5 py-2 border-top border-bottom d-flex align-items-center">
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
                            <i className="fab fa-tumblr    "></i>
                        </a>
                    </li>
                    <li>
                        <a className="font_size_49 text-white" href="#">
                            <img src={require('./chat_c.png').default} alt="chat_c" />
                        </a>
                    </li>
                    <li>
                        <a className="font_size_49 text-white" href="#">
                            <img src={require('./google.png').default} alt="google" />
                        </a>
                    </li>
                    <li>
                        <a className="font_size_49 text-white" href="#">
                            <img src={require('./youtube.png').default} alt="youtube" />
                        </a>
                    </li>
                </ul>
            </div>
            <p className="text-white text-center font_size_29 py-3 py-md-5 px-3 px-md-5 mb-0">
                Copyright © 2021 TLBstaking inc
            </p>
        </footer>
    );
}
export default Footer;