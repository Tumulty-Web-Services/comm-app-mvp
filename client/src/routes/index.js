/*
Documentation
All routes that can only be accessed by admins go here

I do not know why the fuck setLoading has to be passed as a prop
pages wont render correctly without it

*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import { withRouter } from "react-router"; 

import { Route, Switch } from 'react-router-dom';
import NotFound from '../globalComponents/404.js';

import AdminRoute from './AdminRoute';
import LoggedInRoute from './LoggedInRoute';
import StandardRoute from './StandardRoute';
import SalesRoute from './SalesRoute';
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//Admin Routes
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
import DevSystemLogs                    from '../sections/admin/pages/developers/DevSystemLogs';
import DevApi                           from '../sections/admin/pages/api/DevApi';

import AdmDashboard                     from '../sections/admin/pages/AdmDashboard';
import AdmAccountSettings               from '../sections/admin/pages/AdmAccountSettings';
import AdmUser                          from '../sections/admin/pages/AdmUser';
import AdmPayments                      from '../sections/admin/pages/AdmPayments';

import AdmAddLesson                     from '../sections/admin/pages/courses/Lesson';
import AdmAddModule                     from '../sections/admin/pages/courses/Module';
import AdmCourses                       from '../sections/admin/pages/courses/Courses';
import AdmLessons                       from '../sections/admin/pages/courses/Lessons';
import AdmComments                      from '../sections/admin/pages/courses/Comments';

import AdmSupportTickets                from '../sections/admin/pages/courses/SupportTickets';
import AdmSupportTicket                 from '../sections/admin/pages/courses/SupportTicket';
import AdmUpdateModule                  from '../sections/admin/pages/courses/UpdateModule';
import AdmUpdateLesson                  from '../sections/admin/pages/courses/UpdateLesson';
import GetCourses                       from '../sections/admin/pages/courses/GetCourses';

import Manager                          from '../sections/admin/pages/manager/Manager';
import ManagerTable                     from '../sections/admin/pages/manager/ManagerTable';
import GetManager                       from '../sections/admin/pages/manager/GetManager';

import Article                          from '../sections/admin/pages/articles/Article';
import Articles                         from '../sections/admin/pages/articles/Articles';
import Categories                       from '../sections/admin/pages/articles/Categories';


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//Logged In Routes
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

import DashAccountSettings              from '../sections/dashboard/pages/DashAccountSettings';
import Dashboard                       from '../sections/dashboard/pages/Dashboard';
import Onboarding                       from '../sections/dashboard/pages/Onboarding';
import DashboardLesson                       from '../sections/dashboard/pages/Lesson';


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//Standard Routes
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
import SiteLogin                        from '../sections/site/pages/SiteLogin';
// import SiteLanding                      from '../sections/site/pages/SiteLanding';




import KnowledgeBase                    from '../sections/site/pages/articles/KnowledgeBase';
import Single                           from '../sections/site/pages/articles/Single';
import ArticleCategory                  from '../sections/site/pages/articles/Category';

import TermsOfUse                       from '../sections/site/pages/legal/TermsOfUse';
import PrivacyPolicy                    from '../sections/site/pages/legal/PrivacyPolicy';

import IsDeveloper                      from '../sections/site/pages/sales/IsDeveloper';
import IsBusinessOwner                  from '../sections/site/pages/sales/IsBusinessOwner';

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//Sales Routes
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
import Landing1                  from '../sections/sales/pages/Landing1';

class AdminRoutes extends Component {

    render() {


        return (


            <Switch>

                {/********************************************
                **********************************************
                Admin Routes
                **********************************************
                *********************************************/}
                <AdminRoute 
                    exact path="/admin/account/settings" 
                    component={AdmAccountSettings} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                <AdminRoute 
                    exact path="/admin/manager" 
                    component={Manager} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                <AdminRoute 
                    exact path="/admin/manager/table/:table" 
                    component={ManagerTable} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                <AdminRoute 
                    exact path="/admin/manager/get" 
                    component={GetManager} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
                
                <AdminRoute 
                    exact path="/admin/dashboard" 
                    component={AdmDashboard} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/dev/system/logs" 
                    component={DevSystemLogs} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/dev/api/table/:table" 
                    component={DevApi} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                <AdminRoute 
                    exact path="/admin/user/:id" 
                    component={AdmUser} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/admin/payments" 
                    component={AdmPayments} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                <AdminRoute 
                    exact path="/admin/courses" 
                    component={AdmCourses} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/admin/courses/get" 
                    component={GetCourses} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/admin/modules/add" 
                    component={AdmAddModule} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                /> 
    
                <AdminRoute 
                    exact path="/admin/modules/update/:id" 
                    component={AdmUpdateModule} 
                    user={this.props.user} 
                    setLoading={(value) => this.props.setLoading(value)}                       
                />
    
                <AdminRoute 
                    exact path="/admin/lessons/add/:module_id" 
                    component={AdmAddLesson} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/admin/lessons/update/:id" 
                    component={AdmUpdateLesson} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                <AdminRoute 
                    exact path="/admin/lessons/view/:module_id" 
                    component={AdmLessons} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/admin/support-tickets" 
                    component={AdmSupportTickets} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
    
                <AdminRoute 
                    exact path="/admin/support-tickets/:id" 
                    component={AdmSupportTicket} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}
                />
    
                <AdminRoute 
                    exact path="/admin/comments" 
                    component={AdmComments} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />


                <AdminRoute 
                    exact path="/admin/articles/article/:id" 
                    component={Article} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                <AdminRoute 
                    exact path="/admin/articles/" 
                    component={Articles} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />
                <AdminRoute 
                    exact path="/admin/articles/categories" 
                    component={Categories} 
                    user={this.props.user}                         
                    setLoading={(value) => this.props.setLoading(value)}                         
                />

                {/********************************************
                **********************************************
                Logged In Routes
                **********************************************
                *********************************************/}

                <LoggedInRoute 
                    exact path="/dashboard" 
                    component={Dashboard} 
                    user={this.props.user}                 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <LoggedInRoute 
                    exact path="/onboarding" 
                    component={Onboarding} 
                    user={this.props.user}                 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <LoggedInRoute 
                    exact path="/dashboard/lesson/:module_id" 
                    component={DashboardLesson} 
                    user={this.props.user}                 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <LoggedInRoute 
                    exact path="/dashboard/account/settings" 
                    component={DashAccountSettings} 
                    user={this.props.user}                 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                {/********************************************
                **********************************************
                Standard In Routes
                **********************************************
                *********************************************/}

                <StandardRoute 
                    exact path="/" 
                    component={SiteLogin} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <StandardRoute 
                    exact path="/login" 
                    component={SiteLogin} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

               

                    <StandardRoute 
                    exact path="/knowledge-base" 
                    component={KnowledgeBase} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <StandardRoute 
                    exact path="/article/:id" 
                    component={Single} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <StandardRoute 
                    exact path="/articles/category/:category_name" 
                    component={ArticleCategory} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <StandardRoute 
                    exact path="/terms-of-service" 
                    component={TermsOfUse} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />
                <StandardRoute 
                    exact path="/privacy-policy" 
                    component={PrivacyPolicy} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <StandardRoute 
                    exact path="/page/1" 
                    component={IsDeveloper} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <StandardRoute 
                    exact path="/page/2" 
                    component={IsBusinessOwner} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />
                
                <SalesRoute 
                    exact path="/lucci" 
                    component={Landing1} 
                    setLoading={(value) => this.props.setLoading(value)} 
                />

                <Route component={NotFound} />
 
                
            </Switch>
    
        )
    
    }

}
  
const mapDispatchToProps = dispatch => {
    return {

        setComponent: (value) =>  {
            dispatch({type: actionTypes.SET_MAIN_COMPONENT_SET, payload: {value} })
        },
    
    };
};

export default withRouter(connect( '', mapDispatchToProps )(AdminRoutes));  

