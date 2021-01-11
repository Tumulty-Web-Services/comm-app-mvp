import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

class RecentPost extends Component {


    state = {

    };

    render() {


        return (

            <div className="container text-center">
                <Link to={"/article/" + this.props.published_articles[0]._id} ><div className="cta z-depth-2">

                    <h2 className="sub-title mb-0"><span className="pill">New!</span><span style={{textTransform: 'uppercase'}}> {this.props.published_articles[0].headline} </span> <span> - {moment.unix                (this.props.published_articles[0].published_at).format("MMM Do")}</span></h2>
                    </div>
                </Link>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentPost);
