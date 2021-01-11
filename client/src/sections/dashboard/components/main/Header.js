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
                        {/* <li><Link to="/">COMM App</Link></li> */}
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
                                            <li onClick={this.toggleUserMenu} >
                                                <Link to="/dashboard/account/settings" >
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

                    </ul>

                </nav>

               

            </AuxWrapper>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user.user, 
        showSidebar: state.sidebar.show, 

    };
};

const mapDispatchToProps = dispatch => {
    return {

        //send a user either found or unfound to our reducer
        toggleSidebar: (value) => dispatch({
            type: actionTypes.TOGGLE_SIDEBAR,
            payload: { show: value }
        }),

       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
