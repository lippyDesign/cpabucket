import React from 'react';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';

import App from './pages/App';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ProgressPage from './pages/ProgressPage';
import SampleTestPage from './pages/SampleTestPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import MyQuestionsPage from './pages/MyQuestionsPage';
import Testing from './pages/Testing';
import AboutCPAPage from './pages/AboutCPAPage';
import EditQuestionPage from './pages/EditQuestionPage';

export default routes = (
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())} >
        <Route path='/' component={App}>
            <IndexRoute component={HomePage}/>
            <Route path='/about' component={AboutPage}/>
            <Route path='/legal' component={LegalPage}/>
            <Route path='/contact' component={ContactPage}/>
            <Route path='/sign-up' component={SignUpPage}/>
            <Route path='/sign-in' component={SignInPage}/>
            <Route path='/dashboard' component={DashboardPage}/>
            <Route path='/settings' component={SettingsPage}/>
            <Route path='/progress' component={ProgressPage}/>
            <Route path='/sample-test' component={SampleTestPage}/>
            <Route path='/testing' component={Testing}/>
            <Route path='/create-question' component={CreateQuestionPage}/>
            <Route path='/my-questions' component={MyQuestionsPage}/>
            <Route path='/about-cpa' component={AboutCPAPage}/>
            <Route path='/edit-question/:questionId' component={EditQuestionPage}/>
        </Route>
    </Router>
);