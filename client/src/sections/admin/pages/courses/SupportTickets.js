import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {  destroyModal, createDeleteModal } from '../../../../functions/misc/modals'
import {  createNotificationStandard } from '../../../../functions/misc/notifications';

import PaginatedTable from '../../../../functions/tables/PaginatedTable'

class AdminHome extends Component {

    state = {
        contactForms: ''
    }

    onConfirmDelete(eventId, name) {

        const modal= createDeleteModal();


        modal.toDeleteId.value = eventId;
        modal.title.innerHTML = 'Delete Support Ticket: <span className="text-danger">'+eventId+'</span>';
        modal.text.innerHTML = 'Are you sure you wish to delete ticket id: '+eventId+' from the system? This cannot be undone.'
       
        modal.buttonConfirm.addEventListener('click', function () {
            this.onDeleteWasConfirmed()
        }.bind(this));

        
    }

    async onDeleteWasConfirmed() {

        const id = document.getElementById('aos__toDeleteId').value;


        const rowToRemove = document.getElementById('id_row_' + id)
        rowToRemove.parentNode.removeChild(rowToRemove);
        destroyModal();

            
        try {
            await Axios({
                method:'post',
                url:'/api/course_support_tickets/delete/' + id,

              })

              console.log('deleted');
    
              createNotificationStandard('Delete Successful', '<span class="text-success">Successfully deleted support ticket</span>', 2000);

        } catch(e) {
            console.log(e)
            createNotificationStandard('Error Deleting', '<span class="text-danger">Error Deleting Support Ticket </span>', 2000);
        }

    }

    async componentDidMount() {

        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/support-tickets',
            drop: '/admin/courses'
        })


       console.log(this.props)

    }

    render() {

        return (


        
            <div className="content-raised">
                 <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                    </div>
                    <h2 className="title">All Support Tickets</h2>
                    <p>Total: {this.props.supportTickets ? this.props.supportTickets.length : 0}</p>

                </div>

           

                <div className="content">
                    <div className="content-wrapper">


                        <PaginatedTable 
                            data={this.props.supportTickets} 
                
                            table = {{

                                settings: {
                                    rows: 10,
                                    showSearch: true,
                                    showCount: true,
                                },

                                search: (row, filterValue) => {
                                    return row.user_givenName.toLowerCase().includes(filterValue) || row.user_family_name.toLowerCase().includes(filterValue)? true : false
                                },

                                header: {
                                    title: 'Support Tickets'
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
                                    Reason: (row) => {
                                            return row.reason
                                    }, 
                                    Message: (row) => {
                                            return row.message
                                    }, 
                         
                                    Actions: (row) => {
                                        return  <i className="material-icons text-danger" onClick={() => {this.onConfirmDelete(row.id, row)}} >delete</i>
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
        supportTickets: state.supportTickets.supportTickets
    };
};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
  
        
    };
};



  export default connect( mapStateToProps, mapDispatchToProps )(AdminHome);  
  