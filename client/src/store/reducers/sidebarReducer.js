/*
Documentation

this reducer holds all the actions we can dispatch for our app as a whole

this includes loading screens, etc

*** make sure to declare all action types in actions.js one folder level back

*/


import * as actionTypes from '../actions';
// import store from '../../index';

const initialState = {
    show: false,
    showSidebarRight: false,
    drop: '',
    tab: ''
}

const reducer = (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.TOGGLE_SIDEBAR:


        let show = false;
            if(action.payload.show === true) {
                show = true;
            }
        
            return {
                ...state,
                show
            }

        case actionTypes.SET_SIDEBAR_HIGHLIGHT:

            return {
                ...state,
                tab: action.payload.tab,
                drop: action.payload.drop
            }

        case actionTypes.TOGGLE_SIDEBAR_RIGHT:

            let showSidebarRight = false;
            if(action.payload.show === true) {
                showSidebarRight = true
            }
        
            return {
                ...state,
                showSidebarRight
            }


        default:

        return state

    }

}

export default reducer;