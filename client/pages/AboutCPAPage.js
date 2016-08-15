import React from 'react';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default AboutCPAPage = (props)=> {
    let cpaItems = [
        {
            bigText: "aud",
            list: ["Planning the engagement", "Internal controls", "Obtain and document information", "Review engagement and evaluate information", "Prepare communications"],
            smallText: "Format: 3 multiple choice testlets, combined for 90 questions (60%), 7 short task-based simulations (40%). Time allotted: 4 hours"
        },
        {
            bigText: "bec",
            list: ["Business structure", "Economic concepts", "Financial management", "Information technology", "Planning and measurement"],
            smallText: "Format: 3 multiple choice testlets, combined for 72 questions (85%), 3 written simulations (15%). Time allotted: 3 hours"
        },
        {
            bigText: "far",
            list: ["Concepts and standards for financial statements", "Typical items in financial statements", "Specific types of transactions and events", "Accounting and reporting for governmental entities", "Accounting and reporting for nongovernmental and not-for-profit organizations"],
            smallText: "Format: 3 multiple choice testlets, combined for 90 questions (60%), 7 short task-based simulations (40%). Time allotted: 4 hours"
        },
        {
            bigText: "reg",
            list: ["Ethics and professional responsibility", "Business law", "Federal tax procedures and accounting issues", "Federal taxation of property transactions", "Federal taxation- individuals", "Federal taxation--entities"],
            smallText: "Format: 3 multiple choice testlets, combined for 72 questions (60%), 6 short task-based simulations (40%). Time allotted: 3 hours"
        },
    ];
    function renderItems() {
        return cpaItems.map( ({bigText, list, smallText}) => {
                        return (
                            <ul className="list-group aboutCPAItems" key={bigText}>
                                <li className="list-group-item"><h3 className="list-group-item-heading text-info text-center">{bigText.toUpperCase()}</h3></li>
                                <li className="list-group-item"><ul>{list.map( li => <li className="listStyleNone" key={li}>{li}</li>)}</ul></li>
                                <li className="list-group-item text-info">{smallText}</li>
                            </ul>
                        );
                    })
    }
    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1 className="text-center">About CPA</h1>
                <h5>The Certified Public Accountant (CPA) Examination is the examination that a candidate passes in order to qualify for a Certified Public Accountant (CPA) License in any of the 55 U.S. jurisdictions.</h5>
                <p>CPAs are the only licensed accounting professionals. CPA licenses are issued by state boards of accountancy</p>
                <div>{renderItems()}</div>
            </div>
            <Footer/>
        </div>
    )
}