/*
Documentation

this reducer holds all the actions we can dispatch for our app as a whole

this includes loading screens, etc

*** make sure to declare all action types in actions.js one folder level back

*/


import * as actionTypes from '../actions';
import store from '../../index';
import Axios from 'axios';
import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

const initialState = {
    isLoading: false,
    system_config: ''
}



export const refreshSystemConfig = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios.get('/api/system');

            store.dispatch({
                type: actionTypes.SET_APP_CONFIG,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occurred loading system configuration. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}


const reducer = (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.SET_LOADING:

        if(action.payload.value === true) {
            return {
                ...state,
                isLoading: true,
            }
        }
    
        return {
            ...state,
            isLoading: false,
        }

        case actionTypes.SET_APP_CONFIG:

        return {
            system_config: action.payload.objects
        }


        default:

        return state

    }

}

export default reducer;