import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';



class Dashboard extends Component {

    state = {
        user: {
            ...this.props.user
        },
        stripeCustomer: {},
        defaultSource: {},
        processing: false
    }

  

    async componentDidMount() {

        

        //set the sidebar to active
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/dashboard',
            drop: ''
        })


        if(!this.props.commModules.module_1.finished) {
            this.setState({showTutorial: true})
        }

        
    }

    getCompletedModules = () => {

        let finished = 0;

        if(this.props.commModules.module_1.finished) {
            finished++;
        }
        if(this.props.commModules.module_2.finished) {
            finished++;
        }
        if(this.props.commModules.module_3.finished) {
            finished++;
        }
        if(this.props.commModules.module_4.finished) {
            finished++;
        }
        if(this.props.commModules.module_5.finished) {
            finished++;
        }
        if(this.props.commModules.module_6.finished) {
            finished++;
        }
        if(this.props.commModules.module_7.finished) {
            finished++;
        }
        if(this.props.commModules.module_8.finished) {
            finished++;
        }
        if(this.props.commModules.module_9.finished) {
            finished++;
        }
        if(this.props.commModules.module_10.finished) {
            finished++;
        }
        if(this.props.commModules.module_11.finished) {
            finished++;
        }
        if(this.props.commModules.module_12.finished) {
            finished++;
        }
        
        return finished

    }

    render() {

        this.getCompletedModules()

        const commModules = this.props.commModules;

        return (

            
            <div className="content-rased">
                <div className="page-top">

                    <div className="navigation">
                        My Dashboard
                    </div>
                    <h2 className="title">Modules</h2>
                    <p>Completed: {this.getCompletedModules()}/12</p>

                </div>

                <div className="content">
                    <div className="content-wrapper">

                        {this.state.showTutorial ? (
                            <div className="alert alert-success" style={{marginBottom: 80, color: 'white'}}><a style={{color: 'white'}} href="https://jmaher1245-media-library.s3.us-east-2.amazonaws.com/COMM+App+MVP+Tutorial_DS+Rough+Version+(1).pdf" download>Learn how CommApp works, click here</a></div>
                        ) : null}

                        <div className="row">

                            {Object.keys(commModules).map((module, index) => {
                                return (module === '_id' || module === '__v' || module === 'id' || module === 'user_id') ? '' : (
                                    <div key={index} className="col l4 m6 s12">

                                        <div className="card">
                                            <div className="card-body text-righ">
                                                
                                                <span className={commModules[module].finished ? "card-number finished" : "card-number"}>{commModules[module].key}</span>

                                                {/* <i className="material-icons">arrow_right_alt</i> */}
                                                {commModules[module].finished ? <i className="material-icons finished" style={{marginRight: 10}}>check</i> : <i className="material-icons" style={{marginRight: 10}}>arrow_right_alt</i>}

                                                <p className="mb-0">Status: </p>
                                                <h2 className="title">{commModules[module].finished ? 'Finished!' : 'Not Started'}</h2>

                                                
                                            </div>

                                            <div className="card-footer">
                                                <div className="row">
                                                
                                                    <div className="col s6">
                                                        <div className="module-number">
                                                        <i className="material-icons" style={{marginRight: 10}}>school</i>
                                                            
                                                            {commModules[module].key}
                                                        </div>
                                                    </div>
                                                
                                                    <div className="col s6 text-right">
                                                        <Link className={commModules[module].finished ? "btn btn-success" : "btn btn-info"} to={"/dashboard/lesson/" + commModules[module].key}>{commModules[module].finished ? 'Restart' : 'Start' }</Link>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </div>

                </div>

            </div>

           
        )
    }

};


const mapStateToProps = state => {
    return {

      stripeDefaultSource: state.user.defaultSource,
      commModules: state.commModules.modules

    };
};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),

    };
};

export default connect( mapStateToProps, mapDispatchToProps )(Dashboard);  
  


