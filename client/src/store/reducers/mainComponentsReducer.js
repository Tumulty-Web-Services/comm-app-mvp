/*
Documentation

this reducer holds all the actions we can dispatch for our app as a whole

this includes loading screens, etc

*** make sure to declare all action types in actions.js one folder level back

*/


import * as actionTypes from '../actions';
// import store from '../../index';

const initialState = {
    component: '',
}

const reducer = (state = initialState, action) => {

   


    switch (action.type) {
        case actionTypes.SET_MAIN_COMPONENT_SET:
    

            return {
                component: action.payload.value,
            }


        default:

        return state

    }

}

export default reducer;