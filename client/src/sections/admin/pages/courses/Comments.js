import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {createNotificationStandard} from '../../../../functions/misc/notifications';

import PaginatedTable from '../../../../functions/tables/PaginatedTable';

import AuxWrapper from '../../../../globalComponents/AuxWrapper';

import { onCreateDeleteModal } from '../../../../functions/misc/modals';

import { refreshSystemComments } from '../../../../store/reducers/commentsReducer';

class AdminHome extends Component {

    state = {
        comments: ''
    }

    onDelete= async (id, name) => {

        const table = 'comment';

        onCreateDeleteModal({
            textHeadline: 'Delete ' + table ,
            textSub: 'Are you sure you wish to delete comment  '+id+' from the system?<br> This cannot be undone.',
            urlToDelete: '/api/course_comments/delete/' + id,

            onSuccess: async () => {
               
    
                refreshSystemComments()

                createNotificationStandard('<span class="text-success">Success</span>', 'Successfully deleted '+table+': ' + id , 2000);

            },
            onFailure: (e) => {
               
                createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Something went wrong deleting this '+table+'. ' + e);

            }
        })

    }


    async componentDidMount() {

        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({tab: '/admin/comments', drop: '/admin/courses'})

    }

    render() {

        return (

            <div className="content-raised">
                <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard">
                            <i className="material-icons">arrow_back</i>
                            Dashboard</Link>
                    </div>
                    <h2 className="title">All Lesson Comments</h2>
                    <p>Total: {this.props.comments ? this.props.comments.length : 0}</p>

                </div>

                <div className="content">
                    <div className="content-wrapper">

                    <PaginatedTable 
                            data={this.props.comments} 
                
                            table = {{

                                settings: {
                                    rows: 10,
                                    showSearch: true,
                                    showCount: true,
                                },

                                search: (row, filterValue) => {
                                    return row.user_picture_url.toLowerCase().includes(filterValue) || row.user_family_name.toLowerCase().includes(filterValue) ? true : false
                                },

                                header: {
                                    title: 'Contacts'
                                },
                            
                                body: {
                                    Name:  (row) => {
                                        return (
                                            <Link to={"/admin/user/" + row.id}>
                                            <img src={row.user_picture_url} alt={row.user_givenName + ' ' + row.user_family_name}/>
                                            <span className="text-img">{row.user_givenName} {row.user_family_name}</span>
                                        </Link>
                                    )
                                    }, 
                                    Email:  (row) => {
                                        return row.user_email
                                    },
                                    Lesson:  (row) => {
                                        return <Link to={"/lesson/" + row.lesson_id}>{row.lesson_name}</Link>
                                    },
                                    Text: (row) => {
                                            return row.text
                                    }, 
                                    Actions: (row) => {
                                        return  (
                                            <AuxWrapper>
                                                <i 
                                                    style={{  position: 'relative', top: 8 }}
                                                    className="material-icons text-danger"
                                                    onClick={() => { this.onDelete(row.id, row.user_givenName  + ' ' +  row.user_family_name) }}
                                                >delete</i>
                                                            
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
        comments: state.comments.comments
    };
};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) => dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
