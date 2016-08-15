import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default LegalPage = (props)=> {
    return (
        <div>
            <Navbar/>
            <div className="text-center container LegalWrapper">
                <h2><i className="fa fa-gavel fa-3x" aria-hidden="true"></i></h2>
                <h1>Legal</h1>
                <p className="col-xs-12 col-lg-6 col-lg-offset-3">
                    CPA Bucket was designed to assist student with the CPA exam preparation. It does not replace any other study materials. We encourage you to use as many study materials as possible. CPA Bucket team is not responsible for an individual's score on the official CPA Exam. The use of the CPA Bucket app does not guarantee boosted results during the official CPA Exam. CPA Bucket is not affiliated with the official CPA Exam in any way. CPA Bucket team is not responsible for correctness of the practice test questions created by the CPA Bucket's users.
                </p>
            </div>
            <Footer/>
        </div>
    )
}