// /*
// Documentation

// this file should wrap all aos__admin pages
// this allows us to add any stylings and logic we wish to apply to all pages

// */

// import React, { Component } from 'react';


// class AosSite extends Component {

//     componentDidMount() {
        // //remove the scrollbar used on admin section
        // document.body.classList.add('aos__admin-scrollbar');
//     }

//     render() {
//         return (

//             <div className="aos__site">
                
//                     {this.props.children}
                   
//             </div>
                
//         )
//     }

// }

// export default AosSite;

/*
Documentation

this file should wrap all aos__admin pages
this allows us to add any stylings and logic we wish to apply to all pages

*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Axios from 'axios';
// import * as actionTypes from '../../../../store/actions';
import LoaderCube from '../../../../globalComponents/loaders/Cube';

// import { refreshSystemLogs } from '../../../../store/reducers/systemLogReducer';
// import { refreshSupportTickets } from '../../../../store/reducers/supportTicketsReducer';
// import { refreshSystemPayments } from '../../../../store/reducers/paymentsReducer';
// import { refreshSystemComments } from '../../../../store/reducers/commentsReducer';
// import { refreshSystemUsers } from '../../../../store/reducers/userReducer';
// import { refreshDbTables } from '../../../../store/reducers/dbReducer';
// import { refreshSystemModules } from '../../../../store/reducers/moduleReducer';
import { refreshSystemPublishedArticles, refreshSystemArticleCategoryNames, refreshSystemArticles } from '../../../../store/reducers/articlesReducer';

class AosSite extends Component {

    state = {
        isLoaded: false,
        shouldSendError: false,
        loaderText: 'loading'
    }

    componentDidMount = async() => {
             
        //remove the scrollbar used on admin section


        // if(!this.props.published_articles) {
        //     // console.log('loading articles')
        //     this.setState({loaderText: 'Loading app articles.'})
        //     await refreshSystemPublishedArticles();
        // }
        // if(!this.props.article_category_names) {
        //     // console.log('loading article category names')
        //     this.setState({loaderText: 'Loading app category names.'})
        //     await refreshSystemArticleCategoryNames();
        // }

        //can be expanded to the following if database allows.

        await Promise.all([refreshSystemPublishedArticles(), refreshSystemArticleCategoryNames(), refreshSystemArticles()]).then(function(values) {
            this.setState({isLoaded: true})
        }.bind(this));

          
        this.setState({isLoaded: true})

    }

    render() {
        return (

            <div className="aos__site">
                {this.state.isLoaded
                    ? this.props.children
                    : <LoaderCube />}
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {

        published_articles: state.articles.published_articles,
        article_category_names: state.articles.article_category_names,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AosSite);
