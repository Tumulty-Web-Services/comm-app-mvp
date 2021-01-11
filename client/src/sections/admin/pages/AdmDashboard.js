import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';


import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';

import {createNotificationStandard} from '../../../functions/misc/notifications';
import AuxWrapper from '../../../globalComponents/AuxWrapper';

import PaginatedTable from '../../../functions/tables/PaginatedTable';

import { onCreateDeleteModal } from '../../../functions/misc/modals';
import { cloneArrayOfObjects } from '../../../functions/misc/clones';

import { createSystemLog } from '../../../functions/db-helpers/system-logs'

class AdminHome extends Component {


    onDelete= async (id, name) => {

        const table = 'user';

        onCreateDeleteModal({
            textHeadline: 'Delete '+table+': <span className="text-danger">'+name+'</span>',
            textSub: 'Are you sure you wish to delete '+name+' from the system?<br> This cannot be undone.',
            urlToDelete: '/api/users/delete/' + id,

            onSuccess: async () => {
               
    
                let newUsers = cloneArrayOfObjects(this.props.app_users);
                newUsers = newUsers.filter((obj) => obj.id !== id);

                this.props.setAppUsers(newUsers)

                createNotificationStandard('<span class="text-success">Success</span>', 'Successfully deleted '+table+': ' + id , 2000);

            },
            onFailure: (e) => {
               
                createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Something went wrong deleting this '+table+'. ' + e);

            }
        })

    }

    async componentDidMount() {


        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({tab: '/admin/dashboard', drop: ''})


        if(!this.props.app_users) {
            
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Something went fetching system users. Code: AdmDashboard 1');
            createSystemLog('App users did not load at AdmDashboard. This means initial redux setup for admin dashboard failed to load before app was rendered.', 1, 1);

        }


            

    }
 
    render() {

        return (

            <div className="content-raised">
                <div className="page-top">

                    <div className="navigation">
                        My Dashboard
                    </div>
                    <h2 className="title">All Users</h2>
                    <p>Total: {this.props.app_users.length}</p>

                </div>

                <div className="content">
                    <div className="content-wrapper">

                        <PaginatedTable 
                            data={this.props.app_users} 
                
                            table = {{

                                settings: {
                                    rows: 10,
                                    showSearch: true,
                                    showCount: true,
                                },

                                search: (row, filterValue) => {
                                    return row.given_name.toLowerCase().includes(filterValue) || row.family_name.toLowerCase().includes(filterValue) ? true : false
                                },

                                header: {
                                    title: 'Users'
                                },
                            
                                body: {
                                    Name:  (row) => {
                                        return (
                                            <div className="user-td">
                                                <Link to={"/admin/user/" + row._id}>
                                                    <img src={row.picture_url} alt={row.given_name + ' ' + row.family_name}/>                                                        
                                                </Link>

                                        
                                                <div className="text-wrapper">
                                                    <Link to={"/admin/user/" + row._id}>
                                                        <p className="name">{row.given_name} {row.family_name}</p>
                                                    </Link>
                                                    <p className="email"><a href={"mailto:" + row.email}><i className="material-icons">email</i></a>{row.email}</p>
                                                </div>
                                                
                                            </div>
                                    )
                                    }, 
                                    Address:  (row) => {
                                        return (
                                            <div className="user-td">
                                                <p>{row.address_line_1 ? row.address_line_1 : ''}</p>
                                                <p>{row.address_line_1 ? row.city + ', ' + row.state + ' ' + row.postal_code : '' }</p>
                                            </div >
                                        )
                                    },
                                    Phone:  (row) => {
                                        return row.phone
                                    },
                                    // Tags:  (row) => {
                                    //     return (
                                    //         <AuxWrapper>
                                    //             <span className="pill">Ideal Client</span><span className="pill">Payed</span><span className="pill">+5 More</span>
                                    //         </AuxWrapper>
                                    //     )
                                    // },
                                    Created: (row) => {
                                        return (
                                            <div className="tooltip">
                                                <span>At {moment.unix(row.created_at).format("h:mm A")}</span>
                                                {moment.unix(row.created_at).format("M/D/YYYY")}
                                            </div>
                                        )
                                    }, 
                                    Actions: (row) => {
                                        return  (
                                            <AuxWrapper>
                                                <Link className="tooltip top" to={"/admin/user/" + row._id}>
                                                    <span>Edit</span>
                                                    <i className="material-icons text-info">person </i>
                                                </Link>
                                                <span className="tooltip top">
                                                <span>Edit</span>
                                                    <i
                                                        className="material-icons text-danger"
                                                        onClick={() => { this.onDelete(row.id, row.given_name + ' ' + row.family_name) }}>delete_forever
                                                    </i>
                                                </span>
                                                            
                                            </AuxWrapper>
                                        )
                                    }
                                }
                            
                            }}
                        />


                    </div>
                </div>
            </div>

        )
    }

};

const mapStateToProps = state => {
    return {

      user: state.user.user,
      app_users: state.user.app_users

    };
  };

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) => dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings}),
        setAppUsers: (app_users) => dispatch({type: actionTypes.SET_APP_USERS, payload: {app_users}}),
        setSystemLogs: (logs) => dispatch({type: actionTypes.SET_SYSTEM_LOGS, payload: {logs}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
