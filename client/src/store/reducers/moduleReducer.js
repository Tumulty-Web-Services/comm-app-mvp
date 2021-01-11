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
    modules: '',
    modules_user: ''
}

// /api/course_modules/get/all

export const refreshSystemModules = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios.get('/api/course_modules/get/all');

            store.dispatch({
                type: actionTypes.SET_MODULES,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occurred loading system modules. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

export const refreshUserModules = async(userId) => {
    return new Promise( async (resolve, reject) => {

        try {

            if(!userId) {
                throw new Error('No userId was passed')
            }

            const objects = await Axios.get('/api/v1/modules/get/' + userId);

            store.dispatch({
                type: actionTypes.SET_MODULES_USER,
                payload: {
                    objects: objects.data
                }
            });

            
            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error loading user modules. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

const reducer = (state = initialState, action) => {

   


    switch (action.type) {
        case actionTypes.SET_MODULES:


            return {
                ...state,
                modules: action.payload.objects,
            }

        case actionTypes.SET_MODULES_USER :

        return {
            ...state,
            modules_user: action.payload.objects,
        }


        default:

        return state

    }

}

export default reducer;