import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

import CornerCreated from '../../components/stateless/CornerCreated';

import {connect} from 'react-redux';


import ReactHtmlParser from 'react-html-parser';


import moment from 'moment';

import {incrementArticleViews} from '../../../../functions/articles';

import ArticleSidebar from '../../components/stateless/ArticleSidebar';
import Axios from 'axios';

import { refreshSystemPublishedArticles } from '../../../../store/reducers/articlesReducer';

class SiteLanding extends Component {

    state = {
        article: '',
        shouldRedirect: false,
        comment: {}
    }

    onChangeComment = (e, name) => {
        const value = e.target.value;

        this.setState({
            comment: {
                ...this.state.comment,
                [name]: value
            }
        })
    }

    onDeleteComment = async (_id) => {
        try {
          await Axios({
            method: 'post',
            url:'/api/article_comments/delete/' + _id,            
          })

          refreshSystemPublishedArticles();
        
        } catch(e) {
        
          console.log('Error ', e)
        
        }
    }

    onSubmitComment = async () => {


        const name = this.state.comment.name;
        const text = this.state.comment.text;

        let nameError = false;
        let textError = false;

        let errors = 0;

        if(!name) {
            nameError = true;
            errors++;
        }

        if(!text) {
            textError = true;
            errors++;
        }

        if(errors) {
            this.setState({nameError, textError});
            return false;
        } else {

            try {
              await Axios({
                method:'post',
                url:'/api/article_comments/create',
                data: {
                   ...this.state.comment,
                   picture_url: !this.props.user.picture_url ? 'https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559606165789' : this.props.user.picture_url,
                   article_id: this.props.match.params.id
                }
              })

              refreshSystemPublishedArticles();
            
            } catch(e) {
            
              console.log('Error ', e)
            
            }

        }

    }

    setArticle = (props) => {

        let article = props.published_articles.find((article) => article._id === props.match.params.id)

        //if we don't have a normal article check all articles to see if we are looking for a preview
        if(!article) {
            article = props.articles.find((article) => article._id === props.match.params.id);
            
            //if we have a preview articles
            if(article) {
                //disable all link
                document.body.style.pointerEvents = 'none';
            } else {
                this.setState({shouldRedirect: '/knowledge-base'});
                return false;
            }


        }
        
        this.setState({article})

        return article

    }

    componentDidMount = async  () => {

        window.scrollTo(0,0)
        
        let article = this.setArticle(this.props)

        if(article) {

            let views = article.views || 0;
            const viewsToSet = views +1;
    
            incrementArticleViews(this.props.match.params.id, viewsToSet)
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setArticle(nextProps)
    }

    render() {

        if(this.state.shouldRedirect) {
            return <Redirect to={this.state.shouldRedirect} />
        }

        return (

            <div className="article-page" >

                <div className="hero home z-depth-3" style={{backgroundImage: 'url("'+this.state.article.picture_url+'")'}}>
                
                    <div className="filter">
        
                        <div className="container dark">
                            <div className="row">
                                
                                <div className="col l5 m5">
                                    <img className="me z-depth-5" src={this.state.article.picture_url} alt={this.state.headline}  />
                                </div>
        
                                <div className="col l7 m7">


                                    <h5 className="sub-title">
                                        {this.state.article.categories && this.state.article.categories.map((cat, index) => 
                                            <Link key={cat._id} to={"/articles/category/" + encodeURI(cat.name.toLowerCase())} >
                                                <span key={index} className="category-pill z-depth-3">{cat.name}</span>
                                            </Link>
                                        )}
                                    </h5>

                                    <h2 className="title gradient">{this.state.article.headline}</h2>

                                    {this.state.article.excerpt &&  ( <p>{ this.state.article.excerpt }...</p> )}

                                    
                                    <hr />

                                    <div className="row">
                                        
                                        <div className="col s2 author-img">
                                            <img className="img-author" src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p160x160/18699768_1284207708344626_8003713518879003763_n.jpg?_nc_cat=103&amp;_nc_ht=scontent-lga3-1.xx&amp;oh=470e2c88c8ac2b808a259644afd678ed&amp;oe=5D07410D"
                                    alt="author " /> 
                                        </div>

                                        <div className="col s10 author-text">
                                            <p className="name">COMM App</p>
                                            <p className="published">Published On: {moment.unix(this.state.article.published_at).format("MMM DD YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="article-wrapper">
                    <div className="container">

                    <div className="row" style={{marginBottom: 0}}>
                        <div className="col s12">
                            <h2 className="title gradient" >{this.state.article.headline}</h2>
                            <div style={{marginBottom: 30}}>
                            <p onClick={() => this.props.history.goBack()}  ><i className="material-icons text-primary" style={{position: 'relative', top: 8, marginRight: 10}}>keyboard_backspace</i>Back </p>
                            </div>
                        </div>
                    </div>

                        <div className="row ">
                        
                            <div className="col l9 m12 s12">
                           
                                <div className="main dark article">

                                    <div className="article-content z-depth-5">
                                        {ReactHtmlParser(this.state.article.body)}
                                    </div>

                                    <div className="article-comments">

                                        <h2 className="title">Comments</h2>

                                            {this.state.article.comments && this.state.article.comments.length ? this.state.article.comments.map((comment, index) => {
                                            return (
                                            <div key={comment._id} className="comment z-depth-2">

                                                {this.props.user.is_admin && <span className="delete-comment" onClick={() => this.onDeleteComment(comment._id)}>Delete</span>}

                                                <div className="row">
                                                    <div className="col s2 image-holder">
                                                        <img className="z-depth-3" src={comment.picture_url ? comment.picture_url : 'https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559606165789'} alt="name" />
                                                    </div>
                                                    <div className="col s10 content-holder">
                                                        <p className="name">{comment.name}</p>
                                                        {/* <p className="date">May 12th, 2018 at 4:38 PM</p> */}
                                                        <p className="date">{moment.unix(comment.created_at).format("MMM D, YYYY")} At {moment.unix(comment.created_at).format("h:mm A")} </p>
                                                        <hr />
                                                    
                                                    </div>
                                                </div>

                                                <p className="text">{comment.text}</p>

                                            </div>
                                            )
                                        }) : <p>There are no comments yet, be the first! Leave your comment below.</p>}

                                       


                                        <div className="add-comment">

                                            <h2 className="title gradient">Add Comment</h2>

                                            {this.state.nameError && <p className="text-danger">Please Add Your Name</p>}
                                            {this.state.textError && <p className="text-danger">Please Add Your Comment</p>}

                                            <input value={this.state.comment.name || ''} onChange={(e) => this.onChangeComment(e, 'name')} placeholder="Your Name" />

                                            <textarea value={this.state.comment.text || ''} onChange={(e) => this.onChangeComment(e, 'text')} placeholder="Your Comment" />

                                            <div className="text-right">
                                                <button className="btn" onClick={this.onSubmitComment}>Submit Comment</button>
                                            </div>

                                        </div>
                                       
                                    </div>
                                                
                                </div>
                            </div>
                        
                            <div className="col l3 m12 s12  article-sidebar">

                               <ArticleSidebar />
                                           
                            </div>
                        
                        </div>
                    </div>
                </div>


                <CornerCreated />

            </div>
        )

    }

}



const mapStateToProps = state => {
    return {
        user: state.user.user,
        published_articles: state.articles.published_articles,
        articles: state.articles.articles
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteLanding);

// export default SiteLanding;


