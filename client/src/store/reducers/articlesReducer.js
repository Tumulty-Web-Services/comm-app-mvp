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
    articles: '',
    published_articles: '',
    article_category_names: ''
}

export const refreshSystemArticles = async() => {

    
    return new Promise( async (resolve, reject) => {
        try {

            const objects = await Axios.get('/api/v1/articles/get/all');


            store.dispatch({
                type: actionTypes.SET_APP_ARTICLES,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occured loading system articles. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}
export const refreshSystemPublishedArticles = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios.get('/api/v1/articles/get/published');


            store.dispatch({
                type: actionTypes.SET_APP_PUBLISHED_ARTICLES,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occured loading system articles. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

export const refreshSystemArticleCategoryNames = async() => {
    return new Promise( async (resolve, reject) => {

        try {
            const objects = await Axios.get('/api/article_categories_names/get/all');


            store.dispatch({
                type: actionTypes.SET_APP_ARTICLE_CATEGORY_NAMES,
                payload: {
                    objects: objects.data
                }
            });

            resolve(true)

        } catch (e) {

            resolve(false);
            createSystemLogNotification('An error occured loading system articles. Please contact support', 1, 1)
            console.log('Error ', e)

        }

    })

}

const reducer = (state = initialState, action) => {

    switch (action.type) {
       

        case actionTypes.SET_APP_ARTICLES:

            return {
                ...state,
                articles: action.payload.objects
            }

        case actionTypes.SET_APP_PUBLISHED_ARTICLES:

            return {
                ...state,
                published_articles: action.payload.objects
            }
            
        case actionTypes.SET_APP_ARTICLE_CATEGORY_NAMES:

            return {
                ...state,
                article_category_names: action.payload.objects
            }


        default:
        

            return state;
    }
}



export default reducer;