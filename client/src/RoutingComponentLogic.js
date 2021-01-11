/*
Documentation

This file wraps any given route in its corresponding sidebar, main, sectionwrapper, headers, etc
its used to not rerender the components every time a page is changed

This is called in StandardRoute, AdminRoute, and LoggedInRoute under /routes when LoaderCube is rendered

*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import AdminSidebar from './sections/admin/components/main/Sidebar';
import AdminHeader from './sections/admin/components/main/Header';
import AosAdmin from './sections/admin/components/main/AosAdmin';
import AdminMain from './sections/admin/components/main/Main';



import DashboardSidebar from './sections/dashboard/components/main/Sidebar';
import DashboardHeader from './sections/dashboard/components/main/Header';
import AosDashboard from './sections/dashboard/components/main/AosDashboard';
import DashboardMain from './sections/dashboard/components/main/Main';

import SiteHeader from './sections/site/components/main/Header';
import AosSite from './sections/site/components/main/AosSite';
import SiteMain from './sections/site/components/main/Main';

import AosSales from './sections/sales/components/main/AosSales';
import SalesMain from './sections/sales/components/main/Main';
import SalesHeader from './sections/sales/components/main/Header';

import AuxWrapper from './globalComponents/AuxWrapper';


class RoutingComponentLogic extends Component {

    componentDidMount() {

        
    }
   
    render() {
       
        return (

            <AuxWrapper>


               { this.props.component === 'admin' ? (
           
                    <AuxWrapper>

                        <AosAdmin>
                            
                            <AdminHeader/>
                            <AdminSidebar />
                            <AdminMain>
                
                                {this.props.children}

                            </AdminMain>
                    
                        </AosAdmin>
                </AuxWrapper>
               )
            
            : ''}

            { this.props.component === 'dashboard' ? (

                <AuxWrapper>
                    <AosDashboard>
                        
                        <DashboardHeader/>
                        <DashboardSidebar  />
                        <DashboardMain>

                            {this.props.children}
                        </DashboardMain>

                    </AosDashboard>
                </AuxWrapper>
            )

            : ''}

            { this.props.component === 'site' ? (

                <AuxWrapper>

                    <AosSite>
                        
                        <SiteHeader/>
                        <SiteMain>

                            {this.props.children}
                        </SiteMain>

                    </AosSite>
                </AuxWrapper>
                )

            : ''}

            { this.props.component === 'sales' ? (

            <AuxWrapper>

                <AosSales>
                    
                    <SalesHeader/>
                    <SalesMain>

                        {this.props.children}
                    </SalesMain>

                </AosSales>
            </AuxWrapper>
            )

            : ''}

            {/* Used to render a component if we do not yet know the wrapper that should be used */}
            { this.props.component === '' ? ( this.props.children ) : ''}

            </AuxWrapper>

        )

    }

}

const mapStateToProps = state => {
    return {

        user: state.user.user,

    };
};
  

export default withRouter(connect( mapStateToProps )(RoutingComponentLogic));  
  
  