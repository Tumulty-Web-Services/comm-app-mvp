import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {  createNotificationStandard } from '../../../../functions/misc/notifications';

import { onCreateDeleteModal } from '../../../../functions/misc/modals'

import PaginatedTable from '../../../../functions/tables/PaginatedTable'


import { refreshSystemLogs  } from '../../../../store/reducers/systemLogReducer';

class DevSystemLogs extends Component {


    async componentDidMount() {

        //fix after something was deleted


        // createSystemLog('User did not update correctly, this could be do to database down time or another.', 0, 1);
        // createSystemLog('Twilio error trown at survey section', 1, 1);
        // createSystemLog('False Error Thrown, who knows what it is', 0, 1);
        // createSystemLog('Server is running slowly, check back later for updates', 1, 1);
        // createSystemLog('Subscription faile dand no webhook was found.', 0, 1);




          //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/dev/system/logs',
            drop: ''
        })


    }


    onDelete= async (id) => {


        onCreateDeleteModal({
            textHeadline: 'Delete System Log: <span className="text-danger">'+id+'</span>',
            textSub: 'Are you sure you wish to delete this log from the system? This cannot be undone.',
            urlToDelete: '/api/system_logs/delete/' + id,

            onSuccess: async () => {
               
    
                // let newLogs = cloneArrayOfObjects(this.props.logs);
                // newLogs = newLogs.filter((log) => log.id !== id);

                refreshSystemLogs();

                // this.props.setSystemLogs(newLogs)

                createNotificationStandard('Delete Successful', '<span class="text-success">Successfully deleted system log id: '+id+' </span>', 2000);

            },
            onFailure: (e) => {
               
                createNotificationStandard('Error', '<span class="text-danger">Something went wrong deleting this system log. '+e+'</span>', 2000);

            }
        })

    }


    render() {


        return (

            <div className="content-raised ">
                <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                    </div>

                    <h2 className="title">All System Logs</h2>
                    <p>Total: {this.props.logs ? this.props.logs.length : 0}</p>

                </div>

              

                    <div className="content">
                        <div className="content-wrapper ">

                        <PaginatedTable 
                            data={this.props.logs} 
                
                            table = {{

                                settings: {
                                    rows: 10,
                                    showSearch: true,
                                    showCount: true,
                                },

                                search: (row, filterValue) => {
                                    return row.text.toLowerCase().includes(filterValue) ? true : false
                                },

                                header: {
                                    title: 'System Logs'
                                },
                            
                                body: {
                                    Date:  (row) => {
                                        return moment.unix(row.created_at).format("MM/DD/YYYY")
                                    }, 
                                    Time:  (row) => {
                                        return moment.unix(row.created_at).format("hh:mm:ss A")
                                    },
                                    Message: (row) => {
                                            return row.text
                                    }, 
                                    Actions: (row) => {
                                        return  <i className="material-icons text-danger" onClick={function(row) {this.onDelete(row._id)}.bind(this, row)} >delete</i>
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
      logs: state.logs.logs,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
        setSystemLogs: (logs) => dispatch({type: actionTypes.SET_SYSTEM_LOGS, payload: { logs }})
        
    };
};

  export default connect( mapStateToProps, mapDispatchToProps )(DevSystemLogs);  
  


