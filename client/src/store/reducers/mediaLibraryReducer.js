/*
Documentation

this reducer holds all the actions we can dispatch for our app as a whole

this includes loading screens, etc

*** make sure to declare all action types in actions.js one folder level back

*/


import * as actionTypes from '../actions';

const initialState = {
    showMediaLibrary: false,
}

const reducer = (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.SHOW_MEDIA_LIBRARY:


        let showMediaLibrary = false;
            if(action.payload.show === true) {
                showMediaLibrary = true;

                //stop document from scrolling
               

            } else {
                //let document scroll
                document.body.classList.remove("stop-scrolling");
            }

        
            return {
                ...state,
                showMediaLibrary
            }

        default:

        return state

    }

}

export default reducer;