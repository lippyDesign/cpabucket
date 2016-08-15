import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isMobileNavWrapperVisible: false,
            isMobileNavVisible: false,
            spinnerOrPower: 'fa fa-power-off',
            mobileMenuIcon: "fa fa-bars fa-2x",
            dashboardActive: '',
            progressActive: '',
            testActive: '',
            createQuestionActive: '',
            settingsActive: '',
            sampleTestActive: '',
            aboutActive: ''
        }
    }

    componentWillMount() {
        switch(this.props.active) {
            case 'dashboard':
                this.setState({settingsActive: '', progressActive: '', createQuestionActive: '', testActive: '', dashboardActive: 'activeNaviLink'});
                break;
            case 'progress':
                this.setState({settingsActive: '', dashboardActive: '', createQuestionActive: '', testActive: '', progressActive: 'activeNaviLink'});
                break;
            case 'test':
                this.setState({settingsActive: '', progressActive: '', dashboardActive: '', createQuestionActive: '', testActive: 'activeNaviLink'});
                break;
            case 'createQuestion':
                this.setState({settingsActive: '', progressActive: '', dashboardActive: '', testActive: '', createQuestionActive: 'activeNaviLink'});
                break;
            case 'settings':
            this.setState({settingsActive: 'activeNaviLink', progressActive: '', dashboardActive: '', testActive: '', createQuestionActive: ''});
                break;
            case 'sampleTest':
            this.setState({sampleTestActive: 'activeNaviLink', aboutActive: ''});
                break;
            case 'about':
            this.setState({sampleTestActive: '', aboutActive: 'activeNaviLink'});
                break;
            default:
                break;
        }
    }

    logUserOut() {
        this.setState({
            spinnerOrPower: "fa fa-circle-o-notch fa-spin",
        })
        Meteor.logout( (er) => {
            if (er) {
                this.setState({
                    spinnerOrPower: "fa fa-power-off",
                });
                console.log(er)
            } else {
                this.setState({
                    spinnerOrPower: "fa fa-power-off",
                });
                browserHistory.push("/");
            }
        });
    }

    toggleMobileNav() {
        if (this.state.mobileMenuIcon === "fa fa-times fa-2x") {
            this.setState({
                mobileMenuIcon: "fa fa-bars fa-2x"
            })
        } else {
            this.setState({
                mobileMenuIcon: "fa fa-times fa-2x"
            })
        }
        this.setState({
            isMobileNavWrapperVisible: !this.state.isMobileNavWrapperVisible,
            isMobileNavVisible: !this.state.isMobileNavVisible
        })
    }

    render() {
        let mobileNavi = this.state.isMobileNavVisible ? 'mobileUlAnimation' : '';
        let mobileNaviWrapper = this.state.isMobileNavWrapperVisible ? '' : 'displayNone';
        // If not logged in
        if (!Meteor.userId()) {
            return (
                <div>
                    <nav className="navbar bg-faded hidden-xs hidden-sm">
                        <Link className="navbar-brand" to="/">CPA Bucket</Link>
                        <ul className="nav navbar-nav hidden-xs hidden-sm">
                            <li className="nav-item">
                                <Link className={`nav-link ${this.state.sampleTestActive}`} to="/sample-test">Sample Test</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${this.state.aboutActive}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <ul className="marginRight5 nav navbar-nav navbar-right hidden-xs hidden-sm">
                            <li className="nav-item">
                                <Link className="nav-link btn btn-success navButton" to="/sign-up">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-primary navButton" to="/sign-in">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="navbar bg-faded hidden-md hidden-lg">
                        <Link className="navbar-brand marginTop5" to="/">CPA Bucket</Link>
                        <ul className="nav navbar-nav marginRight5">
                            <li className="nav-item">
                                <a onClick={this.toggleMobileNav.bind(this)} className="nav-link navbar-right pull-right mobileNaviMainButton"><i className={this.state.mobileMenuIcon} aria-hidden="true"></i></a>
                            </li>
                        </ul>
                        <div className={`mobilNaviWrapper ${mobileNaviWrapper}`}>
                            <ul className={`mobileNaviUl ${mobileNavi}`}>
                                <li className={`list-group-item mobileItems ${this.state.sampleTestActive}`} onClick={() => {browserHistory.push('/sample-test')} }>Sample Test</li>
                                <li className={`list-group-item mobileItems ${this.state.aboutActive}`} onClick={() => {browserHistory.push('/about')} }>About</li>
                                <li className="list-group-item mobileSignIn" onClick={() => {browserHistory.push('/sign-in')} }>Sign In</li>
                                <li className="list-group-item mobileSignUp" onClick={() => {browserHistory.push('/sign-up')} }>Sign Up</li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        } else {
            // if taking a test
            if (this.props.testTitle) {
            return (
                <div>
                    <nav className="navbar bg-faded hidden-xs hidden-sm">
                        <span className="navbar-brand testNavi">{ `${this.props.testTitle.toUpperCase()} Test` }</span>
                        <span className="navbar-brand testNavi">{ `answered ${this.props.qNumber} of ${this.props.testSize} questions` }</span>
                        <ul className="marginRight5 nav navbar-nav navbar-right hidden-xs hidden-sm">
                            <li className="nav-item">
                                <Link className="nav-link btn btn-danger navButton" to="/dashboard"><i className={this.state.spinnerOrPower} aria-hidden="true"></i> Quit</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="navbar bg-faded hidden-md hidden-lg">
                        <span className="navbar-brand testNavi marginTop5">{ `${this.props.testTitle.toUpperCase()} Test` }</span>
                        <span className="navbar-brand testNavi marginTop5">{ `${this.props.qNumber} / ${this.props.testSize}` }</span>
                        <ul className="nav navbar-nav marginRight5">
                            <li className="nav-item">
                                <a onClick={this.toggleMobileNav.bind(this)} className="nav-link navbar-right pull-right mobileNaviMainButton"><i className={this.state.mobileMenuIcon} aria-hidden="true"></i></a>
                            </li>
                        </ul>
                        <div className={`mobilNaviWrapper ${mobileNaviWrapper}`}>
                            <ul className={`mobileNaviUl ${mobileNavi}`}>
                                <li className="list-group-item mobileSignOut" onClick={() => {browserHistory.push('/dashboard')} }><i className={this.state.spinnerOrPower} aria-hidden="true"></i> Quit</li>
                            </ul>
                        </div>
                    </nav>
                </div>
                )
            }
            // if logged in but not taking a test
            return (
                <div>
                    <nav className="navbar bg-faded hidden-xs hidden-sm">
                        <Link className="navbar-brand" to="/">CPA Bucket</Link>
                        <ul className="nav navbar-nav hidden-xs hidden-sm">
                            <li className="nav-item">
                                <Link className={`nav-link ${this.state.dashboardActive}`} to="/dashboard"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${this.state.progressActive}`} to="/progress"><i className="fa fa-bar-chart"></i> Progress</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${this.state.testActive}`} to="/testing"><i className="fa fa-check" aria-hidden="true"></i> Test</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${this.state.createQuestionActive}`} to="/create-question"><i className="fa fa-plus"></i> Add a Question</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${this.state.settingsActive}`} to="/settings"><i className="fa fa-cog" aria-hidden="true"></i> Settings</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right hidden-xs hidden-sm paddingRightTen">
                            <li className="nav-item">
                                <a className="nav-link btn btn-danger navButton" onClick={this.logUserOut.bind(this)} href="#"><i className={this.state.spinnerOrPower} aria-hidden="true"></i> Sign Out</a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="navbar bg-faded hidden-md hidden-lg">
                        <Link className="navbar-brand marginTop5" to="/">CPA Bucket</Link>
                        <ul className="nav navbar-nav floatRight marginRight5">
                            <li className="nav-item">
                                <a onClick={this.toggleMobileNav.bind(this)} className="nav-link navbar-right pull-right mobileNaviMainButton"><i className={this.state.mobileMenuIcon} aria-hidden="true"></i></a>
                            </li>
                        </ul>
                        <div className={`mobilNaviWrapper ${mobileNaviWrapper}`}>
                            <ul className={`mobileNaviUl ${mobileNavi}`}>
                                <li className={`list-group-item mobileItems ${this.state.dashboardActive}`} onClick={() => {browserHistory.push('/dashboard')} } ><i className="fa fa-home" aria-hidden="true"></i> Home</li>
                                <li className={`list-group-item mobileItems ${this.state.progressActive}`} onClick={() => {browserHistory.push('/progress')} } ><i className="fa fa-bar-chart"></i> Progress</li>
                                <li className={`list-group-item mobileItems ${this.state.testActive}`} onClick={() => {browserHistory.push('/testing')} } ><i className="fa fa-check" aria-hidden="true"></i> Test</li>
                                <li className={`list-group-item mobileItems ${this.state.createQuestionActive}`} onClick={() => {browserHistory.push('/create-question')} } ><i className="fa fa-plus"></i> Add a Question</li>
                                <li className={`list-group-item mobileItems ${this.state.settingsActive}`} onClick={() => {browserHistory.push('/settings')} } ><i className="fa fa-cog" aria-hidden="true"></i> Settings</li>
                                <li className="mobileSignOut list-group-item" onClick={this.logUserOut.bind(this)}><i className={this.state.spinnerOrPower} aria-hidden="true"></i> Sign Out</li>
                            </ul>
                        </div>
                        
                    </nav>
                </div>
            )
        }
        
    }
}

export default Navbar;