/*
Documentation

this reducer holds all the actions we can dispatch for our global user object

*** make sure to declare all action types in actions.js one folder level back

*/

import * as actionTypes from '../actions';
import store from '../../index';
import Axios from 'axios';
import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

export const refreshSystemComments = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios.get('/api/v1/comments/get/all');

            store.dispatch({
                type: actionTypes.SET_APP_COMMENTS,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occurred loading system comments. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}


const initialState = {
    comments: ''
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
       

        case actionTypes.SET_APP_COMMENTS:

            return {
                ...state,
                comments: action.payload.objects
            }


        default:
        

            return state;
    }
}



export default reducer;