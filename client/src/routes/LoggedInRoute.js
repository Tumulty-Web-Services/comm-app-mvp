/*
Documentation
this function is responsible for setting a logged in route and dispatching an 
action to set the outer container wrapper for it

if a user is not logged in we return them to the login page with the parameters needed
to get them to go back to the page they tried to access after login

if a user is logged in we check to see if we have rendered the dashboard wrapper

-> if we have not we return an empty div and dispatch the action to render the outer container
-> if it the outer dashboard wrapper has already been rendered we carry on as normal

*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import { Route, Redirect } from 'react-router-dom';

import AuxWrapper from '../globalComponents/AuxWrapper'
import LoaderCube from '../globalComponents/loaders/Cube';

class AdminRoute extends Component {

  render() {

      const {component: Component,  ...rest} = this.props;

      return (
          <Route {...rest} render={(props) => (

              (
                rest.user.loggedIn === true  ? (
                    <AuxWrapper>                            

                      {
                        (this.props.componentWrapper !== 'dashboard') ? 
                        <LoaderCube componentToSet="dashboard" />
                        :
                        <Component {...props} {...rest} />
                      }                        
                        
                    </AuxWrapper>
                ) :         

                <Redirect to={'/login?redirect=' + encodeURIComponent(props.location.pathname)  } />
        
                
              )
        
            )} />
      );
    }

}


const mapStateToProps = state => {
    return {
      componentWrapper: state.mainComponent.component,     
    };
};
  
const mapDispatchToProps = dispatch => {
  return {

      setComponent: (value) =>  {
        dispatch({type: actionTypes.SET_MAIN_COMPONENT_SET, payload: {value} })
      },
    
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(AdminRoute);  
