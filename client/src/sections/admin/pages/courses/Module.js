import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {  createNotificationStandard } from '../../../../functions/misc/notifications';


import AuxWrapper from '../../../../globalComponents/AuxWrapper';

class AdmAddModule extends Component {

    state = {
        module: {},
        renderRedirect: false
    }

    onInputChange = (name) => object => {

        //get the value of the changed input
        let value =  object.target.value;

      
        //create a new object with it
        let updatedModule = Object.assign({}, this.state.module);
        updatedModule[name] = value;

        //update state
        this.setState({module: updatedModule});
        
    }

    onSubmit = async () => {


        if(!this.state.module.name) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add the module for this invoice.', 2000)
            return false;
        }

        if(!this.state.module.order) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add the order of this module.', 2000)
            return false;
        }

        if(!this.state.module.description) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add a description this module.', 2000)
            return false;
        }

        if(!this.state.module.picture_url) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add the modules picture.', 2000)
            return false;
        }

      
        try {
          await Axios({
            method:'post',
            url:'/api/course_modules/create',
            data: {
               ...this.state.module,
              
            }
          })

        //   window.location.href = '/admin/courses';
        this.setState({renderRedirect: true})
        
        } catch(e) {
        
          console.log('Error ', e)
          createNotificationStandard('<span class="text-danger">Error</span>', 'Looks like something went wrong creating this invoice.', 2000)
        }

    }

    async componentDidMount() {

        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/courses',
            drop: '/admin/courses'
        })

      


    }

    render() {

        return (

            this.state.renderRedirect ? <Redirect to="/admin/courses" /> : 
        
                <AuxWrapper>
                    <div className="page-top">

                            <div className="navigation">

                            <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>

                            <button className="btn btn-success" onClick={() => this.onSubmit()}>Create Module</button>

                            </div>
                            <h2 className="title">Add Module</h2>
                            <p>Create a module to hold your lessons</p>

                                
                    </div>

                    <div className="content">
                        <div className="content-raised">
                            
                            <div className="row">
                            
                                <div className="col l6 s12">

                                    <h2 className="title">Required Field</h2>

                                    <label>Module Name</label>
                                    <input type="text" value={this.state.module.name || ''} onChange={this.onInputChange('name')} />

                                    <label>Picture URL</label>
                                    <input type="text" value={this.state.module.picture_url || ''} onChange={this.onInputChange('picture_url')} />

                                    <label>Module Order</label>
                                    <input type="number" value={this.state.module.order || ''} onChange={this.onInputChange('order')} />

                                </div>
                            
                                <div className="col l6 s12">
                            
                                    <h2 className="title">Optonal Fields</h2>
                                    
                                    <label>Module Excerpt</label>
                                    <input type="text" value={this.state.module.excerpt || ''} onChange={this.onInputChange('excerpt')} />

                                    <label>Module Descripton</label>
                                    <textarea type="text" value={this.state.module.description || ''} onChange={this.onInputChange('description')} ></textarea>

                                </div>
                            
                            </div>

                        </div>
                    </div>
                </AuxWrapper>
        
            
           
        )
    }

};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
  
        
    };
};



export default connect( '', mapDispatchToProps )(AdmAddModule);  
