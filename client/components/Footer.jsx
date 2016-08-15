import React from 'react';
import { Link } from 'react-router';

export default Footer = (props)=> {
    return (
        <footer className="footer">
            <div className="container">
                <div className="col-xs-12 col-lg-6">
                    <ul>
                        <li><h3><a>CPA Bucket</a></h3></li>
                        <li><p>The study application for the 21st century.</p></li>
                    </ul>
                </div>
                <div className="col-xs-12 col-lg-6 footerList">
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/legal">Legal</Link></li>
                    </ul>
                </div>
            </div>
            <div className="col-xs-12 text-center copyRight">
                <p>© 2016 CPA Bucket all rights reserved</p>
            </div>
        </footer>
    )
}