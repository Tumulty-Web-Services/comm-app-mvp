/*********************************************
** responsible for initial view layer setup **
/*********************************************/

import React, { Component } from 'react';


import { BrowserRouter,  } from 'react-router-dom';
import { connect } from 'react-redux';

//get our action types to dispatch
import * as actionTypes from './store/actions';

import { getCurrentUser } from './functions/db-helpers/users';

import Routes from './routes';
import Logic from './routes/logic';

import { refreshSystemConfig } from './store/reducers/appReducer';

import Axios from 'axios';

import RoutingComponentLogic from './RoutingComponentLogic'

import DatabaseErrorPage from './globalComponents/500'
import UnknownErrorPage from './globalComponents/520'


 
class App extends Component { 



    state = {
      initialDataLoaded: false,
      renderDatabaseConnectionError: false,
      renderUnknownError: false
    }

    /*
    Documentation
    
    here is where we pull all the initial data to be loaded
    we also check to make sure our application is connected to the backend server
    once we have everything we need set initialDataLoaded to true

    */
    async componentDidMount() { 

      try {

        //make sure we are connected to our mongo database
        let connected = await Axios({ method:'get', url:'/api/is_connected', })
        connected = connected.data;

        //we are connected to the database, load the app
        if(connected.connected) {

            await Promise.all([
                getCurrentUser(),       //return empty if user is logged out or an object if logged in
                refreshSystemConfig()   //get the system config
            ]).then(function(values) {
        
                //set current user values
                this.props.setCurrentUser(values[0]);
        
                //set data values to loaded
                this.setState({initialDataLoaded: true})
        
            }.bind(this));

        //we are not connected to the backend database
        } else {

            console.log("Database Connection Error: ", connected.message)
            this.setState({renderDatabaseConnectionError: true})

        }


        
      //an unknown error happened, render unknown error page
      } catch(e) {
      
        console.log('An unknown error occurred. This is likely a problem with the applications code. Check your latest updates or development code for changes. Error: ', e)
        this.setState({renderUnknownError: true})
      
      }

      


        
    }


    
    render() {

        if(this.state.renderDatabaseConnectionError) {
            return <DatabaseErrorPage />
        }

        if(this.state.renderUnknownError) {
            return <UnknownErrorPage />
        }

        return (

          (!this.state.initialDataLoaded || this.props.isLoading) ? '' :  (

            <BrowserRouter>
                        
              <RoutingComponentLogic component={this.props.component}>

                <Logic>

                  <Routes user={this.props.user} />
                  
                </Logic>

              </RoutingComponentLogic>

            </BrowserRouter> 

          )
            
        );
    }

};


const mapStateToProps = state => {
    return {

      isLoading: state.app.isLoading,
      user: state.user.user,
      component: state.mainComponent.component,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
 
      //send a user either found or unfound to our reducer
      setCurrentUser: (user) =>  dispatch({type: actionTypes.SET_CURRENT_USER, payload: {user} }),
      
     
    };
  };
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(App);  
  
  
