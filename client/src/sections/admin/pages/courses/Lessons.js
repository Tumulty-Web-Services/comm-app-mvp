import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {  destroyModal, createDeleteModal } from '../../../../functions/misc/modals'
import {  createNotificationStandard } from '../../../../functions/misc/notifications';
import AuxWrapper from '../../../../globalComponents/AuxWrapper';

import ReactPlayer from 'react-player'


class AdminCourses extends Component {

    state = {
        lessons: [{}],
        module: {}
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
                url:'/api/course_lessons/delete/' + id,

              })

              console.log('deleted');
    
              createNotificationStandard('Delete Successful', '<span class="text-success">Successfully deleted lesson. </span>', 2000);

        } catch(e) {
            console.log(e)
            createNotificationStandard('Error Deleting', '<span class="text-danger">Error Deleting Lesson</span>', 2000);
        }

    }

    async componentDidMount() {

        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/courses',
            drop: '/admin/courses'
        })


        try {
          const lessons = await Axios({
            method:'get',
            url:'/api/course_lessons/get_by_module/' + this.props.match.params.module_id,           
          })

          const module = await Axios({
            method:'get',
            url:'/api/course_modules/get/' + this.props.match.params.module_id,
           
          })


          this.setState({
            lessons: lessons.data,
            module: module.data
        })
        
        } catch(e) {
        
            createNotificationStandard('<span class="text-danger">Whoops</span>', 'Error something went wrong, contact support.', 2000);
            console.log('Error ', e)
        
        }

        


    }

    render() {

        return (


        
            <AuxWrapper>
                 <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/courses"><i className="material-icons">arrow_back</i>Back To Modules</Link>

                        <Link to={"/admin/lessons/add/" + this.props.match.params.module_id} className="btn btn-success link-right">Add Lessons</Link>
                    </div>
                    <h2 className="title">Module: {this.state.module.name}</h2>
                    <p>Total lessons for {this.state.module.name}: {this.state.lessons.length}</p>
                    <Link to={"/admin/modules/update/" + this.props.match.params.module_id} className="btn btn-info" style={{marginTop: 20}}>Update This Module</Link>

                </div> 

                 <div className="content">
                   
                       
                    {this.state.lessons.map((lesson) => {
                        return (
                            
                            <div  className="row" id={"id_row_" + lesson.id} key={lesson.id} style={{marginBottom: 20}}>   
                                <div  className="col l4 m12 s12"  >

                                <ReactPlayer  youtubeConfig={{ playerVars: { 
                                    controls: 0,
                                    modestbranding: 1,
                                    autoplay: 0,
                                    rel: 0
                                    } }} controls="false" url={lesson.videoUrl} width="100%" />



                                </div>    
                                <div className="col l8 m12 s12">
                                    <h2>{lesson.name}</h2>
                                    <p>{lesson.description}</p>

                                    <p>Worksheet URL:<br/> {lesson.worksheet ? <Link to={lesson.worksheet}><span className="text-success">{lesson.worksheet}</span></Link> : <span className="text-danger">No worksheet uploaded</span>}</p>

                                    <p><span className="text-info">Lesson Order: {lesson.order}</span></p>

                                    <div className="text-right">
                                        <Link to={"/admin/lessons/update/" + lesson.id} className="btn btn-success">Update</Link>
                                    </div>
                                </div>                                                                                                                    
                            </div>
                        )
                    })}
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



  export default connect( '', mapDispatchToProps )(AdminCourses);  
  