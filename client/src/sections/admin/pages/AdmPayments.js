import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

import {  destroyModal, createDeleteModal } from '../../../functions/misc/modals'
import {  createNotificationStandard } from '../../../functions/misc/notifications';
import AuxWrapper from '../../../globalComponents/AuxWrapper';

import PaginatedTable from '../../../functions/tables/PaginatedTable';


class AdminPayments extends Component {

    state = {
        payments: [{}]
    }

    onConfirmDelete(eventId, name) {

        const modal= createDeleteModal();


        modal.toDeleteId.value = eventId;
        modal.title.innerHTML = 'Delete Comment: <span className="text-danger">'+eventId+'</span>';
        modal.text.innerHTML = 'Are you sure you wish to delete payment id: '+eventId+' from the system? This cannot be undone.'
       
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
                url:'/api/course_payments/delete/' + id,

              })

              console.log('deleted');
    
              createNotificationStandard('Delete Successful', '<span class="text-success">Successfully deleted payment. </span>', 2000);

        } catch(e) {
            console.log(e)
            createNotificationStandard('Error Deleting', '<span class="text-danger">Error Deleting Comment. </span>', 2000);
        }

    }

    async componentDidMount() {

        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/payments',
            drop: ''
        })

        

    }

    render() {

        return (

            
        
            <div className="content-raised">
                 <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                    </div>
                    <h2 className="title">Payments</h2>
                    <p>Total: {this.props.payments ? this.props.payments.length : 0}</p>

                </div>

 
                <div className="content">
                    <div className="content-wrapper">

                    <PaginatedTable 
                            data={this.props.payments} 
                
                            table = {{

                                settings: {
                                    rows: 10,
                                    showSearch: true,
                                    showCount: true,
                                },

                                header: {
                                    title: 'System Payments'
                                },

                                search: (row, filterValue) => {
                                    return row.user_givenName.toLowerCase().includes(filterValue) || row.user_family_name.toLowerCase().includes(filterValue) ? true : false
                                },
                            
                                body: {
                                    Name:  (row) => {
                                        return (row.user_givenName + ' ' +  row.user_family_name )
                                    }, 
                                    Email:  (row) => {
                                        return row.user_email
                                    },
                                    Stripe_ID: (row) => {
                                            return <a href={"https://dashboard.stripe.com/live/payments/" + row.charge_id} target="_blank" rel="noopener noreferrer">{row.charge_id}</a>
                                    }, 
                                    Amount: (row) => {
                                            return <AuxWrapper>${Math.round(row.amount / 100).toFixed(2)}</AuxWrapper>
                                    }, 
                                    Paid_On: (row) => {
                                        return  <AuxWrapper>{moment.unix(row.created_at).format("MM/DD/YYYY")}</AuxWrapper>
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

      payments: state.payments.payments,

    };
};


const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
  
        
    };
};



  export default connect( mapStateToProps, mapDispatchToProps )(AdminPayments);  
  