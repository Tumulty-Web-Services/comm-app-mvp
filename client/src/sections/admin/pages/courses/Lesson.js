import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {  createNotificationStandard } from '../../../../functions/misc/notifications';


import AuxWrapper from '../../../../globalComponents/AuxWrapper';

class AdmAddLesson extends Component {

    state = {
        lesson: {
            module_id: this.props.match.params.module_id
        },
        renderRedirect: false
    }

    onInputChange = (name) => object => {

        //get the value of the changed input
        let value =  object.target.value;

       
        //create a new object with it
        let updatedLesson = Object.assign({}, this.state.lesson);
        updatedLesson[name] = value;

        //update state
        this.setState({lesson: updatedLesson});
        
    }

    onSubmit = async () => {


        if(!this.state.lesson.name) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add the lesson for this invoice.', 2000)
            return false;
        }

        if(!this.state.lesson.order) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add the order of this lesson.', 2000)
            return false;
        }

        if(!this.state.lesson.picture_url) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add the modules picture.', 2000)
            return false;
        }

        if(!this.state.lesson.videoUrl) {
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Please add a video for this course.', 2000)
            return false;
        }
      
        try {
          await Axios({
            method:'post',
            url:'/api/course_lessons/create',
            data: {
               ...this.state.lesson,
              
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

            this.state.renderRedirect ? <Redirect to={"/admin/lessons/view/" + this.props.match.params.module_id} /> : 
        
                <AuxWrapper>

                    <div className="page-top">

                        <div className="navigation">

                        <Link to={"/admin/lessons/view/" + this.props.match.params.module_id}><i className="material-icons">arrow_back</i>Back To Module</Link>

                        <button className="btn btn-success" onClick={() => this.onSubmit()}>Create Lesson</button>

                        </div>
                        <h2 className="title">Add Lesson</h2>
                        <p>Adding for module #{this.props.match.params.module_id}</p>
                                
                    </div>

                    <div className="content">
                        <div className="content-raised">
                            
                            <div className="row">
                            
                                <div className="col l6 s12">

                                    <h2 className="title">Required Field</h2>

                                    <label>Lesson Name</label>
                                    <input type="text" value={this.state.lesson.name || ''} onChange={this.onInputChange('name')} />

                                    <label>Picture URL</label>
                                    <input type="text" value={this.state.lesson.picture_url || ''} onChange={this.onInputChange('picture_url')} />

                                    <label>Video URL</label>
                                    <input type="text" value={this.state.lesson.videoUrl || ''} onChange={this.onInputChange('videoUrl')} />

                                    <label>Lesson Order</label>
                                    <input type="number" value={this.state.lesson.order || ''} onChange={this.onInputChange('order')} />

                                </div>
                            
                                <div className="col l6 s12">
                            
                                    <h2 className="title">Optonal Fields</h2>
                                    
                                    <label>Lesson Excerpt</label>
                                    <input type="text" value={this.state.lesson.excerpt || ''} onChange={this.onInputChange('excerpt')} />

                                    <label>Worksheet Url</label>
                                    <input type="text" value={this.state.lesson.worksheet || ''} onChange={this.onInputChange('worksheet')} />

                                    <label>Lesson Description</label>
                                    <textarea type="text" value={this.state.lesson.description || ''} onChange={this.onInputChange('description')} ></textarea>


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



export default connect( '', mapDispatchToProps )(AdmAddLesson);  
