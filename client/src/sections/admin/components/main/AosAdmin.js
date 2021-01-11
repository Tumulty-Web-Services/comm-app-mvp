/*
Documentation

this file should wrap all aos__admin pages
this allows us to add any stylings and logic we wish to apply to all pages

*/

import React, {Component} from 'react';

import LoaderCube from '../../../../globalComponents/loaders/Cube';

import { refreshSystemLogs } from '../../../../store/reducers/systemLogReducer';
import { refreshSupportTickets } from '../../../../store/reducers/supportTicketsReducer';
import { refreshSystemPayments } from '../../../../store/reducers/paymentsReducer';
import { refreshSystemComments } from '../../../../store/reducers/commentsReducer';
import { refreshSystemUsers } from '../../../../store/reducers/userReducer';
import { refreshDbTables } from '../../../../store/reducers/dbReducer';
import { refreshSystemModules } from '../../../../store/reducers/moduleReducer';
import { refreshSystemArticles } from '../../../../store/reducers/articlesReducer';

class AosAdmin extends Component {

    state = {
        isLoaded: false,
        shouldSendError: false,
        loaderText: 'loading'
    }

    componentDidMount = async() => {

        //async  load all data
        await Promise.all([
            refreshDbTables(), 
            refreshSystemUsers(), 
            refreshSystemLogs(), 
            refreshSupportTickets(), 
            refreshSystemPayments(), 
            refreshSystemComments(),
            refreshSystemModules(), 
            refreshSystemArticles()]
        ).then(function(values) {

            this.setState({isLoaded: true})

        }.bind(this));

    }

    render() {
        return (

            <div className="aos__admin">
                {this.state.isLoaded
                    ? this.props.children
                    // : <LoaderCube text={this.state.loaderText}/>}
                    : <LoaderCube />}
            </div>

        )
    }

}

export default AosAdmin;

// const mapStateToProps = state => {
//     return {

//         // tables: state.db.tables,
//         // app_users: state.user.app_users,
//         // logs: state.logs.logs,
//         // payments: state.payments.payments,
        
//         // supportTickets: state.supportTickets.supportTickets,
//         // comments: state.comments.comments,
//         // modules: state.modules.modules,
//         // articles: state.articles.articles
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {

//         //send a user either found or unfound to our reducer
//         // setDBTables: (tables) => dispatch({type: actionTypes.SET_DB_TABLES, payload: { tables }}),
//         // setAppUsers: (app_users) => dispatch({type: actionTypes.SET_APP_USERS, payload: {app_users}}),
//         // setSystemLogs: (logs) => dispatch({type: actionTypes.SET_SYSTEM_LOGS, payload: {logs}}),
//         // setSystemPayments: (payments) => dispatch({type: actionTypes.SET_APP_PAYMENTS, payload: {payments}}),
//         // setSystemSupportTickets: (supportTickets) => dispatch({type: actionTypes.SET_SUPPORT_TICKETS, payload: {supportTickets}}),
//         // setSystemComments: (comments) => dispatch({type: actionTypes.SET_APP_COMMENTS, payload: {comments}})
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AosAdmin);
