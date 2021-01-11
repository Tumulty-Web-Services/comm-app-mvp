import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';


import logo from '../../../../assets/img/CommLogo.jpg'
import { toggleDropContent } from '../../../../functions/misc/dropdowns';

import AuxWrapper from '../../../../globalComponents/AuxWrapper';

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
                    <Link style={{ position: 'relative'}} to="/admin/dashboard" >COMM App</Link>
                    

                    <button className="sidebar-toggle" onClick={() => this.props.toggleSidebar(false)}><i className="material-icons">close</i></button>

                </li>

                <li className="profile-top">
                    <p className="name text-heavy">Welcome {this.props.user.given_name}!</p>
                    <p className="email">{this.props.user.email}</p>
                    <img src={this.props.user.picture_url} alt="profile pic" />
                </li>

                <li className="sidebar-section first-link">Admin Dashboard</li>

                <li className="">
                    <Link onClick={() => this.props.toggleSidebar(false)}  to="/admin/dashboard" className={(this.props.tab === '/admin/dashboard') ? 'active' : ''}>
                    <i className="material-icons">dashboard</i> Dashboard 
                    </Link>
                </li>

                

                {/* <li>
                    <Link onClick={() => this.props.toggleSidebar(false)} to="/admin/payments" className={(this.props.tab === '/admin/payments') ? 'active' : ''}>
                    <i className="material-icons">account_balance_wallet</i>   Payments <span className="pill green">{this.props.payments.length}</span>
                    </Link>
                </li> */}

                {/* {this.props.system_config.course_enabled ? (
                    <li className="dropdown" >
                        <a href="javascript:void(0);" onClick={toggleDropContent} className="trigger" to="/tables">
                        <i className="material-icons">school</i>  Courses                        
                        </a>

                        <div className="drop-content" style={{ display: (this.props.drop === '/admin/courses' ) ? 'block' : ''  }}>

                            <ul className="dropdown-list">
                                
                                <li >

                                    <Link  to={"/admin/courses/"} className={(this.props.tab === '/admin/courses') ? 'active': '' }>
                                        Modules
                                    </Link>
                                    <Link  to={"/admin/comments/"} className={(this.props.tab === '/admin/comments') ? 'active': '' }>
                                        Comments
                                    </Link>
                                    <Link  to={"/admin/support-tickets/"} className={(this.props.tab === '/admin/support-tickets') ? 'active': '' }>
                                        Support Tickets
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>
                    </li> 
                ): ''} */}


                    {/* <li className="dropdown" >
                 

                        <button onClick={toggleDropContent} className="trigger" to="/tables">
                            <i className="material-icons">forum</i>  Articles                        
                        </button>

                        <div className="drop-content" style={{ display: (this.props.drop === '/admin/articles' ) ? 'block' : ''  }}>

                            <ul className="dropdown-list">
                                
                                <li >

                                    
                                    <Link  to={"/admin/articles"} className={(this.props.tab === '/admin/articles') ? 'active': '' }>
                                        Articles
                                    </Link>

                                    <Link  to={"/admin/articles/categories"} className={(this.props.tab === '/admin/articles/categories') ? 'active': '' }>
                                        Categories
                                    </Link>
                                   
                                </li>
                                
                            </ul>
                        </div>
                    </li>  */}

            

                {/* <li className="sidebar-section">Add Ons</li> */}

                {/****************************
                ******************************
                If not manager enabled
                ******************************
                *****************************/}
                {!this.props.system_config.manager_enabled ? (
                    <li>
                        <Link onClick={() => this.props.toggleSidebar(false)} to="/admin/manager/get" className={(this.props.tab === '/admin/manager') ? 'active' : ''}>
                        <i className="material-icons">cloud</i>  Database Manager 
                        </Link>
                    </li>
                ): ''}

                {/****************************
                ******************************
                If not course enabled
                ******************************
                *****************************/}

                {!this.props.system_config.course_enabled ? (
                    <li>
                        <Link onClick={() => this.props.toggleSidebar(false)} to="/admin/courses/get" className={(this.props.tab === '/admin/courses') ? 'active' : ''}>
                        <i className="material-icons">school</i>  Courses 
                        </Link>
                    </li>
                ): ''}

              

                
                

                <li className="sidebar-section">Developers</li>
                {this.props.user.is_dev ? (
                   <AuxWrapper>
 
                        <li>
                            <Link onClick={() => this.props.toggleSidebar(false)} to="/dev/system/logs" className={(this.props.tab === '/dev/system/logs') ? 'active' : ''}>
                            <i className="material-icons">book</i> System Logs <span className="pill red">{this.props.logs.length}</span>
                            </Link>
                        </li>

                        <li className="dropdown" >
                            <button onClick={toggleDropContent} className="trigger" to="/tables">
                            <i className="material-icons">school</i>  API                        
                            </button>

                            <div className="drop-content" style={{ display: (this.props.drop === '/dev/api/table' ) ? 'block' : ''  }}>

                                {/* {console.log(this.props.tables)} */}

                        
                                <ul className="dropdown-list">
                                    {this.props.tables ? this.props.tables.map((table) => {
                                        return (
                                        <li key={Object.keys(table)[0]}>

                                            <Link  to={"/dev/api/table/" + Object.keys(table)[0]} className={(this.props.tab === Object.keys(table)[0] && this.props.drop === '/dev/api/table' ) ? 'active': '' }>
                                                {
                                                    Object.keys(table)[0] && Object.keys(table)[0].length > 17 ? 
                                                    (Object.keys(table)[0].slice(0,17) + '...'): 
                                                    Object.keys(table)[0]
                                                }
                                            </Link>
                                        </li>
                                        )
                                    }) : ''}
                                </ul>
                            </div>
                        </li> 

                        {/* {this.props.system_config.manager_enabled ? (
                            <li>
                                <Link onClick={() => this.props.toggleSidebar(false)} to="/admin/manager" className={(this.props.tab === '/admin/manager') ? 'active' : ''}>
                                <i className="material-icons">cloud</i>  Database Manager 
                                </Link>
                            </li>
                        ): ''} */}

                      
                                            
                   </AuxWrapper>
                                
               ) : ''}
                               
            </ul>

            <div className="bottom">
                <Link className={(this.props.tab === '/admin/account/settings') ? 'active' : ''} to="/admin/account/settings">Account Settings <span className="icon float-right"><i className="material-icons">settings</i></span> </Link>
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
  
  

