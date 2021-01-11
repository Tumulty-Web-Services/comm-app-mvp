/*
Documentation

this file is responsible for creating aroute anyone can access

when a standard route is called it will check to see if the "site" wrapper is rendered
if not we will set it through the Loader Cube component

if not we render the route as nomral

*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import { Route } from 'react-router-dom';

import AuxWrapper from '../globalComponents/AuxWrapper'
import LoaderCube from '../globalComponents/loaders/Cube';

class StandardRoute extends Component {

  render() {

    const {component: Component,  ...rest} = this.props;

    return (

        <Route {...rest} render={(props) => (
                        
          <AuxWrapper>
              {
              (this.props.componentWrapper !== 'sales') ? 
              <LoaderCube componentToSet="sales" />
              :
              <Component {...props} {...rest} />
            }
            
          </AuxWrapper>
                    
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

export default connect( mapStateToProps, mapDispatchToProps )(StandardRoute);  
