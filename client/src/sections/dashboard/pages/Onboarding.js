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
            tab: '/onboarding',
            drop: ''
        })


        
    }


    render() {



        return (

            
            <div className="content-rased">
                <div className="page-top">

                    <div className="navigation">
                        My Dashboard
                    </div>
                    <h2 className="title">Modules</h2>
                    <p>Onboarding</p>

                </div>

                <div className="content">
                    <div className="content-wrapper">

                            <div className="alert alert-success" style={{marginBottom: 80, color: 'white'}}><a style={{color: 'white'}} href="https://jmaher1245-media-library.s3.us-east-2.amazonaws.com/COMM+App+MVP+Tutorial_DS+Rough+Version+(1).pdf" download>Learn how CommApp works, click here</a></div>

                        

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
  


