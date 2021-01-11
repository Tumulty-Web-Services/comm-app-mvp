/*
Documentation

this reducer holds all the actions we can dispatch for our global user object

*** make sure to declare all action types in actions.js one folder level back

*/

import Axios from 'axios';
import store from '../../index';
import * as actionTypes from '../actions';

import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

//call this function to refresh system logs
export const refreshSystemLogs = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios({method: 'get', url: ' /api/system_logs/get/all'})


            store.dispatch({
                type: actionTypes.SET_SYSTEM_LOGS,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occured loading system logs. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

const initialState = {
    logs: ''
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.SET_SYSTEM_LOGS:

            return {
                ...state,
                logs: action.payload.objects
            }

        default:

            return state;
    }
}

export default reducer;
