import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class LoaderCube extends Component {


   componentDidMount() {
       if(this.props.componentToSet) {
           this.props.setComponent(this.props.componentToSet)
       }
   }

    render() {


        return (
            <div className="loader">
                <div className="loader-cube">
                  <div className="cube1 cube"></div>
                  <div className="cube2 cube"></div>
                  <div className="cube4 cube"></div>
                  <div className="cube3 cube"></div>
                  {this.props.text ? <h2>{this.props.text}</h2> : <h2 style={{marginTop: 20}}>{this.props.text}</h2>}
              </div>
              
            </div>
        )

    }

}
const mapDispatchToProps = dispatch => {
    return {
 
      //send a user either found or unfound to our reducer
      setComponent: (value) =>  {
        dispatch({type: actionTypes.SET_MAIN_COMPONENT_SET, payload: {value} })
      },
      
    };
  };
  
  export default connect( '', mapDispatchToProps )(LoaderCube);  