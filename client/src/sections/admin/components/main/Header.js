import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import Clock from '../../../../globalComponents/time/Clock';
import AuxWrapper from '../../../../globalComponents/AuxWrapper';

class Header extends Component {

    state = {
        showUserMenu: false
    }

    toggleUserMenu = () => {
        this.setState({
            showUserMenu: !this.state.showUserMenu
        })
    }

    render() {

        return (
            <AuxWrapper>

                <nav className="aos__admin-header nav ">

                    <ul className="nav-left">
                        {/* <li><Link to="/">View Site</Link></li> */}
                    </ul>

                    <ul className="nav-right">

                        <li className="user-picture">
                            <div onClick={this.toggleUserMenu}>
                                <img src={this.props.user.picture_url} alt="profile pic"/>
                                <span className="name">{this.props.user.given_name} {this.props.user.family_name}</span>
                                <span className="sub-text"><Clock/></span>
                            </div>

                            {this.state.showUserMenu
                                ? <div className="user-menu">
                                        <ul>
                                            <li>
                                                <Link to="/admin/account/settings">
                                                    <i className="material-icons">settings</i>
                                                    Account Settings</Link>
                                            </li>
                                            <li>
                                                <a href="/api/logout">
                                                    <i className="material-icons">time_to_leave</i>
                                                    Logout</a>
                                            </li>
                                        </ul>

                                        <div onClick={this.toggleUserMenu} className="close">
                                            <i className="material-icons">close</i>
                                        </div>

                                    </div>
                                : ''}

                        </li>

                        <li
                            className="menu menu-mobile"
                            onClick={() => this.props.toggleSidebar(!this.props.showSidebar)}>
                            <i className="material-icons">menu</i>
                        </li>

                        <li
                            className="menu menu-desktop"
                            onClick={() => this.props.toggleSidebarRight(!this.props.showSidebarRight)}>
                            <i className="material-icons">toggle_off</i>
                        </li>

                    </ul>

                </nav>

                {this.props.showSidebarRight
                    ? <div className="aos__admin-sidebar-right">

                            <div className="blackout" onClick={() => this.props.toggleSidebarRight(!this.props.showSidebarRight)}></div>

                            <div className="sidebar-container">

                                <div className="sidebar-wrapper">
                                    <ul>
                                        <li>
                                            <div className="sidebar-divider stat">
                                                <h2 className="title">App Users</h2>
                                                <i className="material-icons">people</i>
                                                {this.props.app_users && this.props.app_users.length}
                                                <h2 className="title">Articles</h2>
                                                <i className="material-icons">edit</i>
                                                {this.props.articles && this.props.articles.length}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-divider logs">
                                                <h2 className="title">System Logs ({this.props.logs.length})</h2>
                                                {this.props.logs.length > 2 ? this.props.logs.slice(0, 2).map((log) => {
                                                    return (
                                                        <p className="text-muted">{log.text}</p>
                                                    )
                                                }) : this.props.logs.map((log) => {
                                                    return (
                                                        <p className="text-muted">{log.text}</p>
                                                    )
                                                })}
                                                <div className="text-right">
                                                    <Link onClick={() => this.props.toggleSidebarRight(!this.props.showSidebarRight)} className="btn btn-info" to="/dev/system/logs" >See All</Link>
                                                </div>
                                            </div>
                                        </li>
                                       

                                    </ul>
                                </div>
                            </div>

                        </div>
                    : ''}

            </AuxWrapper>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user.user, 
        app_users: state.user.app_users,
        showSidebar: state.sidebar.show, 
        showSidebarRight: state.sidebar.showSidebarRight, 
        logs: state.logs.logs,
        articles: state.articles.articles
    };
};

const mapDispatchToProps = dispatch => {
    return {

        //send a user either found or unfound to our reducer
        toggleSidebar: (value) => dispatch({
            type: actionTypes.TOGGLE_SIDEBAR,
            payload: { show: value }
        }),

        //toogle the right sidebar on desctip
        toggleSidebarRight: (value) => dispatch({
            type: actionTypes.TOGGLE_SIDEBAR_RIGHT,
            payload: { show: value }
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
