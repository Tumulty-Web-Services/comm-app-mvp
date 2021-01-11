import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import logo from '../../../../assets/img/AOSLOGO.png';

import {  destroyModal, createDeleteModal } from '../../../../functions/misc/modals'
import {  createNotificationStandard } from '../../../../functions/misc/notifications';

class AdminCourses extends Component {

    state = {
        modules: [{}]
    }

    onConfirmDelete(eventId, name) {

        const modal= createDeleteModal();


        modal.toDeleteId.value = eventId;
        modal.title.innerHTML = 'Delete User: <span className="text-danger">'+name+'</span>';
        modal.text.innerHTML = 'Are you sure you wish to delete  '+name+' from the system? This cannot be undone.'
       
        modal.buttonConfirm.addEventListener('click', function () {
            this.onDeleteWasConfirmed()
        }.bind(this));

        
    }

    async onDeleteWasConfirmed() {

        const id = document.getElementById('aos__toDeleteId').value;

        console.log(id);

        const rowToRemove = document.getElementById('id_row_' + id)
        rowToRemove.parentNode.removeChild(rowToRemove);
        destroyModal();

            
        try {
            await Axios({
                method:'post',
                url:'/api/course_modules/delete/' + id,

              })

              console.log('deleted');
    
              createNotificationStandard('Delete Successful', '<span class="text-success">Successfully deleted '+this.props.match.params.table+ ' object: '+id+' </span>', 2000);

        } catch(e) {
            console.log(e)
            createNotificationStandard('Error Deleting', '<span class="text-danger">Error Deleting '+this.props.match.params.table+ ' object: '+id+' </span>', 2000);
        }

    }

    async componentDidMount() {

        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/courses',
            drop: '/admin/courses'
        })

        try {
          const modules = await Axios({
            method:'get',
            url:'/api/course_modules/get/all',           
          })

          console.log(modules);

          this.setState({
            modules: modules.data
        })
        
        } catch(e) {
        
            createNotificationStandard('<span class="text-danger">Whoops</span>', 'Error something went wrong, contact support.', 2000);
            console.log('Error ', e)
        
        }

        


    }

    render() {

        return (


        
            <div >
                 <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>

                        <Link to="/admin/modules/add" className="btn btn-success link-right">Add Module</Link>
                    </div>
                    <h2 className="title">All modules</h2>
                    <p>Total Modules: {this.state.modules.length}</p>

                </div>

            <div className="content">
                   
                <div  className="row" >          
                    {this.state.modules.map((module) => {
                        return (
                            
                            
                            <div id={"id_row_" + module.id} key={module.id} className="col l3 s12"  style={{marginBottom: 20}}>


                                <Link to={"/admin/lessons/view/" + module.id} >
                                    <div className="module-card" style={{ backgroundImage: 'url("'+module.picture_url+'")'}} >

                                        <div className="filter">  </div>
                                            <h3 className="module-card-name">{module.name}</h3>
                                            <img className="module-card-pic" src={logo} alt="author pic" />       
                                    </div>
                                </Link>

                            </div>                                                                                                                        
                            
                        )
                    })}
                    </div>             
                </div>
            </div>
        
              
    
           
        )
    }

};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
  
        
    };
};



  export default connect( '', mapDispatchToProps )(AdminCourses);  
  