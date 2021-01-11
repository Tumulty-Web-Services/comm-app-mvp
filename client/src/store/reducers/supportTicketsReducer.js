/*
Documentation

this reducer holds all the actions we can dispatch for our global user object

*** make sure to declare all action types in actions.js one folder level back

*/

import * as actionTypes from '../actions';
import store from '../../index';
import Axios from 'axios';
import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

//call this function to refresh system logs
export const refreshSupportTickets = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios.get('/api/v1/contact_forms/get/all');

            store.dispatch({
                type: actionTypes.SET_SUPPORT_TICKETS,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occurred loading support tickets. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

const initialState = {
    supportTickets: ''
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
       

        case actionTypes.SET_SUPPORT_TICKETS:


            return {
                ...state,
                supportTickets: action.payload.objects
            }


        default:
        

            return state;
    }
}



export default reducer;