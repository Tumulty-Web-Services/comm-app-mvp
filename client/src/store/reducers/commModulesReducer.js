/*
Documentation

this reducer holds all the actions we can dispatch for our global user object

*** make sure to declare all action types in actions.js one folder level back

*/

import * as actionTypes from '../actions';
import store from '../../index';
import Axios from 'axios';
import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

const initialState = {
    modules: '',
}

export const refreshCommModules = async(user_id) => {

    
    return new Promise( async (resolve, reject) => {
        try {

            const objects = await Axios.get('/api/v1/comm_modules/get/' + user_id);


           
            store.dispatch({
                type: actionTypes.SET_COMM_MODULES,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occurred loading comm_modules. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}


const reducer = (state = initialState, action) => {

    switch (action.type) {
       

        case actionTypes.SET_COMM_MODULES:

            return {
                ...state,
                modules: action.payload.objects
            }

       

        default:
        

            return state;
    }
}



export default reducer;