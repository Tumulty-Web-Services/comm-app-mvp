/*
Documentation

this reducer holds all the actions we can dispatch for our global user object

*** make sure to declare all action types in actions.js one folder level back

*/

import * as actionTypes from '../actions';
import store from '../../index';
import Axios from 'axios';
import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

export const refreshSystemUsers = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios({method: 'get', url: '/api/users/get/all'})

            store.dispatch({
                type: actionTypes.SET_APP_USERS,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occurred loading system users. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

const initialState = {
    user: '',
    defaultSource: {}
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:

            //set default value for logged in
            let loggedIn = false;
            let is_admin = false;



            if (action.payload.user._id) {
                loggedIn = true;

                if (action.payload.user.is_admin === true) {
                    is_admin = true;
                }

            }
        
            return {
                ...state,
                user: {
                    ...action.payload.user,
                    loggedIn,
                    is_admin                    
                }
            }



        case actionTypes.SET_USER_STRIPE_DEFAULT_SOURCE:

            return {
                ...state,
                defaultSource: action.payload.defaultSource
            }

        case actionTypes.SET_APP_USERS:


            return {
                ...state,
                app_users: action.payload.objects
            }


        default:
        

            return state;
    }
}



export default reducer;