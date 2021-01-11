
import 'materialize-css/dist/css/materialize.min.css';
import './assets/css/app.scss';
import './assets/js/script.js';


import React from 'react';
import ReactDom from 'react-dom';

//used for redux, allows us to inject store into react components
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import App from './App';

import userReducer from './store/reducers/userReducer';
import appReducer from './store/reducers/appReducer';
import sidebarReducer from './store/reducers/sidebarReducer';
import mainComponentReducer from './store/reducers/mainComponentsReducer';
import dbReducer from './store/reducers/dbReducer';
import moduleReducer from './store/reducers/moduleReducer';
import systemLogReducer from './store/reducers/systemLogReducer';
import paymentsReducer from './store/reducers/paymentsReducer';
import supportTicketsReducer from './store/reducers/supportTicketsReducer';
import commentsReducer from './store/reducers/commentsReducer';
import managerReducer from './store/reducers/managerReducer';
import articlesReducer from './store/reducers/articlesReducer';
import mediaLibraryReducer from './store/reducers/mediaLibraryReducer';
import commModules from './store/reducers/commModulesReducer';


//tell redux to match the following properties to each reducer
const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    sidebar: sidebarReducer,
    mainComponent: mainComponentReducer,
    db: dbReducer,
    modules: moduleReducer,
    logs: systemLogReducer,
    payments: paymentsReducer,
    supportTickets: supportTicketsReducer,
    comments: commentsReducer,
    manager: managerReducer,
    articles: articlesReducer,
    mediaLibrary: mediaLibraryReducer,
    commModules: commModules
    // res: resultReducer
})



const store = createStore(rootReducer, applyMiddleware(thunk));

//1st argument is root component, 2nd is where we want render component to inside of DOM
//provider is react component that can read state changes
ReactDom.render( 
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);

export default store;
