import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';


import logo from '../../../../assets/img/CommLogo.jpg'



class Sidebar extends Component {

    state = {
        location: this.props.location,
        tables: []
    }

    checkActive(check) {
        return (this.state.location === check ) ? 'active': '';
    }

    checkExpanded(check) {
        if(check.includes(this.state.location)) {
            return {display: 'block'}
        }

        return {};
    }

    async componentDidMount() {


    }

    async componentWillReceiveProps(nextProps) {

        
        if(nextProps.location !== this.props.location) {

            this.setState({
                location: nextProps.location
            })

        }

    }

       
    render() {

        return (

        <div  className={this.props.showSidebar ? "aos__admin-sidebar sidebar show" : "aos__admin-sidebar sidebar "}>

            <ul className="links">
            
                <li className="logo">
                    <img src={logo} alt="" />
                    <Link style={{ position: 'relative'}} to="/dashboard" >COMM App</Link>
                    

                    <button className="sidebar-toggle" onClick={() => this.props.toggleSidebar(false)}><i className="material-icons">close</i></button>

                </li>

                <li className="profile-top">
                    <p className="name text-heavy">Welcome {this.props.user.given_name}!</p>
                    <p className="email">{this.props.user.email}</p>
                    <img src={this.props.user.picture_url} alt="profile pic" />
                </li>

                <li className="sidebar-section first-link">Dashboard</li>

                <li className="">
                    <Link onClick={() => this.props.toggleSidebar(false)}  to="/dashboard" className={(this.props.tab === '/dashboard') ? 'active' : ''}>
                    <i className="material-icons">dashboard</i> Modules 
                    </Link>
                </li>

                <li className="">
                    <Link onClick={() => this.props.toggleSidebar(false)}  to="/onboarding" className={(this.props.tab === '/onboarding') ? 'active' : ''}>
                    <i className="material-icons">chat</i> Tutorial 
                    </Link>
                </li>

                <li className="">
                    <Link onClick={() => this.props.toggleSidebar(false)}  to="/dashboard/account/settings" className={(this.props.tab === '/dashboard/account/settings') ? 'active' : ''}>
                    <i className="material-icons">person</i> My Account 
                    </Link>
                </li>


                

                                            
                                
                               
            </ul>

            <div className="bottom">
                <Link className={(this.props.tab === '/dashboard/account/settings') ? 'active' : ''} to="/dashboard/account/settings">Account Settings <span className="icon float-right"><i className="material-icons">settings</i></span> </Link>
            </div>

        </div>
           
        );
    }

}

const mapStateToProps = state => {
    return {
      user: state.user.user,
      showSidebar: state.sidebar.show,
      tab: state.sidebar.tab,
      drop: state.sidebar.drop,
      tables: state.db.tables,
      logs: state.logs.logs,
      payments: state.payments.payments,
      system_config: state.app.system_config
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
 
      //send a user either found or unfound to our reducer
      toggleSidebar: (value) =>  dispatch({type: actionTypes.TOGGLE_SIDEBAR, payload: {show: value} }),

      
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);  
  
  

