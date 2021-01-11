/*
Documentation

this reducer holds all the actions we can dispatch for our global user object

*** make sure to declare all action types in actions.js one folder level back

*/

import * as actionTypes from '../actions';
import store from '../../index';
import Axios from 'axios';
import { createSystemLogNotification } from '../../functions/db-helpers/system-logs';

export const refreshDbTables = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios.get('/api/schema/tables/names');

            store.dispatch({
                type: actionTypes.SET_DB_TABLES,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occurred loading system tables. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

const initialState = {
    // tables: []
    tables: ''
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
       
        case actionTypes.SET_DB_TABLES:


            return {
                ...state,
                tables: action.payload.objects
            }


        default:
        

            return state;
    }
}



export default reducer;