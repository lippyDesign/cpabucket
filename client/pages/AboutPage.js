import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default AboutPage = (props)=> {
    return (
        <div>
            <Navbar active='about'/>
            <div className="text-center container aboutUsWrapper">
                <h2><i className="fa fa-users fa-3x" aria-hidden="true"></i></h2>
                <h1>About Us</h1>
                <p className="col-xs-12 col-lg-6 col-lg-offset-3">
                    CPA Bucket is a social platform for CPA Exam preparation. It is a free app that aims to help students pass the CPA Exam. Students can take practice tests, track their progress, create questions for the practice tests, upvote/downvote questions, as well as, participate in discussions about a particular question. Our platform was designed specifically for studying on the go. 
                </p>
            </div>
            <Footer/>
        </div>
    )
}