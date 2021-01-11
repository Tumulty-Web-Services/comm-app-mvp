/*
Documentation

this file should wrap all aos__admin pages
this allows us to add any stylings and logic we wish to apply to all pages

*/

import React, {Component} from 'react';

import LoaderCube from '../../../../globalComponents/loaders/Cube';
import { connect } from 'react-redux';

import { refreshCommModules } from '../../../../store/reducers/commModulesReducer';

class AosAdmin extends Component {

    state = {
        isLoaded: false,
        shouldSendError: false,
        loaderText: 'loading'
    }

    componentDidMount = async() => {

        //async  load all data
        await Promise.all([
            refreshCommModules(this.props.user._id)
        ]).then(function(values) {

            this.setState({isLoaded: true})

        }.bind(this));

    }

    render() {
        return (

            <div className="aos__admin dashboard">
                {this.state.isLoaded
                    ? this.props.children
                    // : <LoaderCube text={this.state.loaderText}/>}
                    : <LoaderCube />}
            </div>

        )
    }

}


const mapStateToProps = state => {
    return {

        user: state.user.user
        
    };
};



export default connect(mapStateToProps, '')(AosAdmin);
