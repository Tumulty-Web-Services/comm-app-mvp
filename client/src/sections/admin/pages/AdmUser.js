import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

import moment from 'moment';
import Axios from 'axios';

import {  createNotificationStandard } from '../../../functions/misc/notifications';

class AdmUser extends Component {

    state = {
        user: {},
        shouldRedirect: false
    }

    

    async componentDidMount() {

        const user = this.props.app_users.find((user) => user._id === this.props.match.params.id)

        if(!user) {

            this.setState({shouldRedirect: '/admin/dashboard'});

        } else {

            //get this users modules
            try {
              const modules = await Axios({
                method:'get',
                url:'/api/v1/comm_modules/get/' + user._id,
              })

              this.setState({ user: user, comm_modules: modules.data})

            
            } catch(e) {
            
              console.log('Error ', e)
              createNotificationStandard('<span class="text-danger">Whoops</span>', 'Something went wrong fetching this users lessons.')

            }

        }
      
    }

    onMarkComplete = async (url) => {

        //a url must be passed
        if(!url) {
            createNotificationStandard('Complete', 'Video has already been marked complete', 2000)
        } else {

            //get the awsKey from the url
            const awsKey = url.split('amazonaws.com/')[1];

            try {
                Axios({
                    method:'post',
                    url:'/api/aws/bucket/delete?key=' + awsKey,
                })

                createNotificationStandard('<span class="text-success">Success</span>', 'Video was deleted and will no longer be visible on page loads.')

            } catch(e) {
                console.log(e)
                createNotificationStandard('<span class="text-danger">Whoops</span>', 'Something went wrong deleting this video.')
                
            }

              

        }
    }

    render() {

        if(!this.state.comm_modules) {
            return <div></div>
        }

        if(this.state.shouldRedirect) {
            return <Redirect to={this.state.shouldRedirect} />
        }

        const commModules = this.state.comm_modules

        return (


        
            <div className="content-raised">
                 <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                    </div>
                    <h2 className="title">Viewing {this.state.user.givenName} {this.state.user.family_name}</h2>
                    <p>Email: {this.state.user.email}</p>

                </div>

                <div className="content">
                    <div className="content-wrapper">

                        <div className="row">
                        
                            <div className="col l6 s12">
                                <h2 className="title">User Information</h2>

                                <img src={this.state.user.picture_url} alt={this.state.user.givenName + ' ' + this.state.user.family_name} style={{borderRadius: '100%', margin: '15px 0'}} />
                            </div>
                        
                            <div className="col l6 s12 text-right">
                                <h2 className="title">Address</h2>
                                <p>{this.state.user.address_line_1 ? this.state.user.address_line_1 : ''}</p>
                                <p>{this.state.user.address_line_1 ? this.state.user.city + ', ' + this.state.user.state + ' ' + this.state.user.postal_code : '' }</p>
                            </div>
                        
                        </div>

                        <div className="row">
                        
                            <div className="row">
                            
                                <div className="col l4 s12">
                                    <p><span className="font-weight-bold">Email: </span><br/>{this.state.user.email}</p>
                                </div>
                            
                                <div className="col l4 s12 text-center">
                                    {this.state.user.phone ? <p><span className="font-weight-bold">Phone: </span><br/>{this.state.user.phone}</p> : ''}
                                </div>

                                <div className="col l4 s12 text-right">
                                    <p><span className="font-weight-bold">Created On: </span><br/>{moment.unix(this.state.user.created_at).format("MM/DD/YYYY")}</p>
                                </div>
                            
                            </div>
                                
                        </div>

                        <hr />

                        <h2 className="title" style={{marginTop: 40}}>Finished Lessons</h2>
                        <p>Note that due to s3 versioning deleted videos will still may still show but will not play (This may take a second to take effect after marking complete).</p>
                        <p><a className="text-info" href="https://s3.console.aws.amazon.com/s3/home?region=us-east-2" target="_blank" rel="noopener noreferrer" >You may check you re s3 bucket storage he</a></p>

                        {Object.keys(commModules).map((module, index) => {
                            return (module === '_id' || module === '__v' || module === 'id' || module === 'user_id') ? '' : (
                            <div className="col l4 m6 s12" key={index}>

                                {commModules[module].finished ? (
                                <div className="card">
                                    <div className="card-body text-righ">
                                        


                                        <div className="row">
                                        
                                            <div className="col l6 s12">
                                                <p className="mb-0">Status: Finished</p>
                                                <h2 className="title">Module: {commModules[module].key}</h2>
                                            </div>
                                        
                                            <div className="col l6 s12 text-right">
                                                <button onClick={() => this.onMarkComplete(commModules[module].video_url)} className="btn btn-success">Mark Complete</button>
                                                <br />
                                                <br />
                                                <a className="btn btn-info" href={"mailto:" + this.state.user.email + "?subject=COMM%20App%20Module%20" + commModules[module].key}>Email {this.state.user.given_name}</a>
                                            </div>
                                        
                                        </div>

                                        <div className="row">
                                            <div className="col s12">
                                                <video className="z-depth-3" height="200" width="300" src={commModules[module].video_url} controls={true}></video>
                                            </div>          
                                        </div>

                                        
                                    </div>

                                    
                                </div>
                                ) : (
                                    <div></div>  
                                )}

                                
                            </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        
              
    
           
        )
    }

};

const mapStateToProps = state => {
    return {
      app_users: state.user.app_users
    };
  };

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
  
    };
};



  export default connect( mapStateToProps, mapDispatchToProps )(AdmUser);  
  
