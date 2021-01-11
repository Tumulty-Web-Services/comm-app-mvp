import React, {Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import TextEditor from '../text-editor';

import {  createOrUpdate, updateArticleCategories, getAllCategories } from '../text-editor/functions';

import { createSystemLogNotification } from '../../../../functions/db-helpers/system-logs';
import { refreshSystemArticles } from '../../../../store/reducers/articlesReducer';

import { createNotificationStandard } from '../../../../functions/misc/notifications';

import moment from 'moment';

import Axios from 'axios';
import CubeLoader from '../../../../globalComponents/loaders/Cube';


import MediaLibrary from '../media-library';

class AdmDashboard extends Component {


    
    state = {

        showPreview: false,
        previewLoaded: false,
        previewArticleId: '',
        previewLink: '',

        showMediaLibrary: false,


        showLinkModal: false,
        modalLinkValue: '',

        published: 'draft',             //either publish or draft

        shouldRedirect: false,          //if we should redirect to another page, if so the link

        initialValue: '',               //the initial value to send to the editor

        categories: '',                 //list of all category names, null or array of objects
        categories_selected: [],

        text: "",                       // the returned value from the editor

        headline: '',                   //headline of  the article
        excerpt: '',      // excerpt of the article
        picture_url: '',         //picture of the aricle
        _id: '',                        //the _id of the article, if we pass one we will update the article with the given _id else we create a new article

      }

      handleFileLoad = () => {
          setTimeout(() => {
            this.setState({previewLoaded: true})
          }, 200)
      }

      /*
      Documentation
      
      //toggles the preview modal

      creates a new entry in the database for a preview of what is on the screen
      deletes afterward 

      */
      togglePreview = async (value) => {


        if(value) {

            const values = this.getArticleValues();

            delete values._id;

            try {
              let res = await Axios({
                method:'post',
                url:'/api/articles/create/',
                data: {
                    ...values,
                    
                    user_id: this.props.user._id,
                    status: 'preview'
                }
              })

              res = res.data;


              this.setState({showPreview: value, previewLoaded: false, previewLink: '/article/' + res._id, previewArticleId: res._id})
              
            } catch(e) {
            
                
              createNotificationStandard('<span class="text-danger">Whoops</span>', 'Something went wrong creating a preview of this article')
            
            }

        } else {

            try {
                //delete the created preview
                Axios({
                  method:'post',
                  url:'/api/articles/delete/' + this.state.previewArticleId,
                })

                this.setState({showPreview: value, previewLoaded: false, previewLink: '', previewArticleId: ''})

            } catch(e) {

                createNotificationStandard('<span class="text-danger">Whoops</span>', 'Something went wrong deleting the preview. <a class="text-danger" href="/admin/articles">Click here to refresh.</a>')            
            }

        }

          
      }

    onChangeExcerpt = (e) => {

        const value = e.target.value;
        let emptyExcerpt = false;

        //if not creating a new article set a warning if excerpt is blank
        if(!value && this.props.match.params.id !==  'new') {
            emptyExcerpt = true
        }

        this.setState({
            excerpt: value,
            emptyExcerpt
        })
    }

    toggleLinkModal = (value) => { this.setState({showLinkModal: value}) }

    onChangeModalLink = (event) => {

        const modalLinkValue = event.target.value;
        this.setState({modalLinkValue})

    }

    //set state.headline 
    onHeadlineChange = (e) => {
        const value = e.target.value;
        let emptyHeadline = false;

        if(!value && this.props.match.params.id !==  'new') {
            emptyHeadline = true
        }

        this.setState({
            headline: value,
            emptyHeadline
        })
    }

    
    onCategoryClick = (value, e) => {

        const checked = e.target.checked

        let newArray = [...this.state.categories_selected];

        if(checked) {
            //add value to array
            newArray.push(value);
        } else {
            //remove value from array
            newArray = newArray.filter((cat) => cat !== value);
        }



        this.setState({ categories_selected: newArray })
    }

    getArticleValues = () => {

        const values = {
            user_id: this.props.user._id,
            headline: this.state.headline,
            excerpt: this.state.excerpt,
            body: this.state.text,
            picture_url: this.state.picture_url,
            _id: this.state._id,
        }

        return values;

    }

    onPublishChange = (e) => {

        const value = e.target.value;

        this.setState({published: value})
    }

    onSave = async (type) => {

        const values = this.getArticleValues();
        values.status = type;

        let emptyHeadline = false;
        let emptyExcerpt = false;
        let emptyPictureUrl = false;

        if(!values.headline) {
            emptyHeadline = true;
        }

        if(!values.excerpt) {
            emptyExcerpt = true;
        }

        if(!values.picture_url) {
            emptyPictureUrl = true;
        }
        
        this.setState({
            emptyHeadline,
            emptyExcerpt,
            emptyPictureUrl
        })
        

        if(type === 'published' && !this.state.published_at) {
            values.published_at = Math.round((new Date()).getTime() / 1000)
        }

        await updateArticleCategories(this.state.categories_selected, values._id)

        const article = await createOrUpdate(values);

        if(!article.success) {

            //send error message
            createSystemLogNotification('Something went wrong sending article information to the database. Code Article 1', 1, 1);
            return;
            
        }

        createNotificationStandard('<span class="text-success">Success!</span>', 'The article was successfully updated', 2000);

        this.setState({_id: article.article._id, status: type, updated_at: article.article.updated_at, published_at: article.published_at})
        refreshSystemArticles()

    }

      
    setEditorValue = (value) => {
        this.setState({text: value})
    }

    toggleMediaLibrary = (value) => {
        this.setState({showMediaLibrary: value})
      }
  

    componentDidMount = async () => {


        

        const _id = this.props.match.params.id

        if(_id !== 'new') {

             //set the state to return our article in the editor
            const foundArticle = this.props.articles.find((article) => article._id === _id);

            //if we havent found an article redirect ot articles page
            if(!foundArticle) {
                this.setState({shouldRedirect: '/admin/articles'});
            }

           

            const categories_selected = foundArticle.categories.map((cat) => {
                return cat.name
            })

            let emptyHeadline = false;
            let emptyExcerpt = false;
            let emptyPictureUrl = false;

            if(!foundArticle.headline) {
                emptyHeadline = true;
            }

            if(!foundArticle.excerpt) {
                emptyExcerpt = true;
            }

            if(!foundArticle.picture_url) {
                emptyPictureUrl = true;
            }

            this.setState({
                text: foundArticle.body,

                initialValue: foundArticle.body, //set to render in text editor

                published: foundArticle.status || 'draft',
                categories_selected: categories_selected,
                status: foundArticle.status,
                headline: foundArticle.headline,
                excerpt: foundArticle.excerpt,
                // excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut purus maximus, egestas mi eu, fringilla turpis. Nulla nisi justo, consectetur eu sapien in, maximus pulvinar leo. Maecenas cursus',
                picture_url: foundArticle.picture_url,
                updated_at: foundArticle.updated_at,
                published_at: foundArticle.published_at,
                _id: foundArticle._id,
                emptyHeadline,
                emptyExcerpt,
                emptyPictureUrl,
            })


        }

        


        const getAllCategories = await this.getAllCategories();


        if(!getAllCategories.success) {
            return;
        }

        this.setState({categories: getAllCategories.categories})

    }

    getAllCategories = () => {


        return new Promise ( async (resolve, reject) => {

            resolve(getAllCategories())
        })

    }


    onSelectObject = (url) => {

        let emptyPictureUrl = false;

        if(!url && this.props.match.params.id !==  'new') {
            emptyPictureUrl = true
        }

        this.setState({
            picture_url: url,
            emptyPictureUrl
        })

        // this.setState({picture_url: url})
        this.toggleMediaLibrary(false)
    }

   
    render() {

        if(this.state.shouldRedirect) {
            return <Redirect to={this.state.shouldRedirect} />
        }

        const excerptRecommended = 250;
        const excerptLength = this.state.excerpt.length
        const articleLink = window.location.href.replace('/admin/articles', '');
    
      return (

       

        <div className="content-raised">
            <div className="content">

                {this.state.emptyPictureUrl ? <alert className="alert alert-warning">There is no picture set for this article.</alert> : ''}
                {this.state.emptyHeadline ? <alert className="alert alert-warning">There is no headline set for this article.</alert> : ''}
                {this.state.emptyExcerpt ? <alert className="alert alert-warning">There is no excerpt set for this article.</alert> : ''}

            {this.state.showMediaLibrary ? <MediaLibrary toggleMediaLibrary={(value) => this.toggleMediaLibrary(value)} onSelectObject={(value) => this.onSelectObject(value)} /> : ''}


            {this.state.status === 'draft' ? <div className="alert alert-info" style={{marginBottom: 10}}>This article is currently saved as a draft.</div> : ''}
                
                <div className="aos__text-editor">

                {this.state.showLinkModal ? (

                <div className="editor-modal z-depth-3">

                    <div className="blackout" onClick={() => this.toggleLinkModal(false)}></div>

                    <div className="modal-content">

                        <h2 className="title">Insert Link <button onClick={() => this.removeLink()} className="btn-text float-right" style={{fontSize: 16}}>Remove</button></h2>

                        <textarea value={this.state.modalLinkValue} onChange={this.onChangeModalLink}></textarea>
                        
                        <div className="text-right">
                            
                            <button className="btn btn-danger" onClick={() => this.setState({showLinkModal: false})} >Cancel</button>
                            <button className="btn btn-success" onClick={() => this.onSelectLink()} >Add Link</button>
                        </div>

                    </div>

                </div>

                ) : ''}

                    {this.state.showPreview ? (
                        <div className="preview-iframe"> 

                        {this.state.previewLoaded ? (
                            <div className={this.state.previewLoaded ? "background " : "background not-loaded"}  onClick={() => this.togglePreview(false)}></div>    
                        ) : <CubeLoader text="Loading Preview" />}

                            

                            <span className="close" onClick={() => this.togglePreview(false)}>Close Preview <i className="material-icons z-depth-5">close</i></span>
                            <div className="preview-iframe-container z-depth-5">
                                <iframe title="preview" onLoad={this.handleFileLoad} scrolling="auto" src={this.state.previewLink} className="z-depth-5" />      
                            </div>   
                        </div>
                    ) : ''}


                    <div className="article-header">
                        <i className="material-icons">edit</i><input placeholder="Add Your Headline" value={this.state.headline} onChange={this.onHeadlineChange} />

                        <a  style={{marginTop: 4, fontWeight: 'bold'}} href={articleLink} target="_blank" rel="noopener noreferrer"> <p className="text-info href-link">{articleLink}</p></a>

                        {this.state.updated_at ? <p><span className="text-sucess">Last Updated:</span> {moment.unix(this.state.updated_at).format("MMM DD YYYY h:mm A")}</p> : ''}
                    </div>

                    <div className="row" style={{marginTop: !this.state.updated_at ? 15 : 'inherit'}}>
                        <div className="article-main-text-editor">
                            <TextEditor 
                                initialValue={this.state.initialValue}
                                setEditorValue={(value) => this.setEditorValue(value)}
                            />

                            <h2 className="title" >Article Excerpt </h2>
                            <p>Recommended Characters: <span className={excerptLength > (excerptRecommended - 20) && excerptLength <= excerptRecommended ? 'text-success' : excerptLength > excerptRecommended ? 'text-danger' : 'text-warning'}>{excerptLength}</span> / {excerptRecommended}</p>

                            <textarea className="excerpt-text-area" value={this.state.excerpt} onChange={this.onChangeExcerpt} placeholder="Lorem ipsum dolores...."></textarea>

                        </div>

                        <div className="text-editor-right-sidebar">


                            <div className="sidebar-section z-depth-3">
                                <div className="header">
                                    <h6 className="title"> Publish </h6>
                                </div>

                                <div className="section-content">
                                    <p><span className="font-weight-bold">Status:</span> {this.state.status === 'draft' ? <span className="text-info float-right">Draft</span> : <span className="text-success float-right">Published</span>}</p>

                                    <select onChange={this.onPublishChange} value={this.state.published}>
                                        <option value="draft">Save As Draft</option>
                                        <option value="published">Publish</option>
                                    </select>

                                    <div className="text-right">
                                        <button className="btn btn-success" 
                                        onClick={() => this.state.published === 'published' ? this.onSave('published') : this.onSave('draft')}>
                                        
                                        {this.state.published === 'draft' ? "Save Draft" : this.props.match.params.id === 'new' ? 'Publish' : 'Update Article'}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section z-depth-3">
                                <div className="header">
                                    <h6 className="title">Categories <button onClick={() => this.toggleLinkModal(true)} className="btn-text float-right text-warning" style={{position: 'relative', top: -4, }}>Add</button></h6>
                                </div>

                                <div className="section-content">

                                    <div className="categories">
                                        
                                        {this.state.categories ? this.state.categories.map((category) => {

                                            return (
                                                <div className="row" key={category._id}>         

                                                    <div className="col s2">
                                                        <input onChange={(e) => this.onCategoryClick(category.name, e)} defaultChecked={this.state.categories_selected.includes(category.name)} value={category.name} type="checkbox"></input>
                                                    </div>
                                                    <div className="col s10">
                                                        <p>{category.name}</p>
                                                    </div>                                    
                                                </div>
                                            )

                                        }) : ''}

                                    
                                    </div>
                                
                                </div>
                            </div>

                            <div className="sidebar-section z-depth-3">
                                <div className="header">
                                    <h6 className="title">Article Image</h6>
                                </div>

                                <div className="section-content">
                                        {this.state.picture_url ? <img className="z-depth-2" src={this.state.picture_url} alt={this.state.headline} />: ''}
                                    <button className="btn-text" onClick={() => this.toggleMediaLibrary(true)} >Set Article's Picture</button>
                                </div>
                            </div>

                            <div className="sidebar-section z-depth-3">
                                <div className="header">
                                    <h6 className="title"> Preview </h6>
                                </div>

                                <div className="section-content">
                                    <div className="text-right">
                                        <button onClick={() => this.togglePreview(true)} className="btn btn-info" style={{width: '100%'}}>Preview Article</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
    
            

            </div>

            
        </div>
          
      );
    }
  }
   
  const mapStateToProps = state => {
    return {

      user: state.user.user,
      articles: state.articles.articles,
      showMediaLibrary: state.mediaLibrary.showMediaLibrary,

    };
};


const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
        toggleMediaLibrary: (value) =>  dispatch({type: actionTypes.SHOW_MEDIA_LIBRARY, payload: {show: value} }),
        
    };
};

  
  export default connect( mapStateToProps, mapDispatchToProps )(AdmDashboard);  
  