/*
Documentation
NOTE CURRENTLY IN USE, HERE A PLACEHOLDER FOR THE FUTURE
Corresponds to /page/1


*/

import React, {Component} from 'react';


import {connect} from 'react-redux';



class IsDeveloper extends Component {

    componentDidMount = () => {
        window.scrollTo(0,0)
    }

    render() {

        
        return (

            <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(IsDeveloper);


