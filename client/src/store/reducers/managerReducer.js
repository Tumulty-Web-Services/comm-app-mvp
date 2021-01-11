/*
Documentation

this reducer holds all the actions we can dispatch for our app as a whole

this includes loading screens, etc

*** make sure to declare all action types in actions.js one folder level back

*/


import * as actionTypes from '../actions';
// import store from '../../index';
// import Axios from 'axios';
// import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

const initialState = {
    schema: false,

}

const reducer = (state = initialState, action) => {


    switch (action.type) {
        
        case actionTypes.SET_MANAGER_SCHEMA:

            return {
                ...state,
                schema: action.payload.schema,
            }


        default:

        return state

    }

}

export default reducer;