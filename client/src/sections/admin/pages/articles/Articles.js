import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import { deleteWithCallback } from '../../../../functions/misc/modals'
import AuxWrapper from '../../../../globalComponents/AuxWrapper';

import PaginatedTable from '../../../../functions/tables/PaginatedTable';

import { refreshSystemArticles } from '../../../../store/reducers/articlesReducer';

class Articles extends Component {

    async onDelete(_id, name) {
        deleteWithCallback({

            name,
            object: 'article',
            showNotifications: true,
                        
            delete: async () => {

                return await Axios({
                    method:'post',
                    url:'/api/articles/delete/' + _id,
                })

            },

            onSuccess: () => { refreshSystemArticles() },

            onFailure: (e) => {}

        })
    }

    getAuthorName = (user_id) => {

        const author = this.props.app_users.find((author) => author._id === user_id);

        return (
            <div className="user-td">
                <Link to={"/admin/user/" + author._id}>
                    <img src={author.picture_url} alt={author.given_name + ' ' + author.family_name}/>                                                        
                </Link>

                
                <div className="text-wrapper">
                    <Link to={"/admin/user/" + author._id}>
                        <p className="name">{author.given_name} {author.family_name}</p>
                    </Link>

                        <p className="email"><a href={"mailto:" + author.email}><i className="material-icons">email</i></a>{author.email}</p>

                </div>
                
            </div>
        )

    }

    async componentDidMount() {

        //send action to set active sidebar tab
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/articles',
            drop: '/admin/articles'
        })

        //delete all preview articles incase they are left over
        await Axios.get('/api/v1/articles/delete/previews');
        refreshSystemArticles();

    }

    render() {

        return (

            
        
            <div className="content-raised">
                 <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                        <Link className="link-right btn btn-success" to="/admin/articles/article/new"> New Article</Link>
                    </div>
                    <h2 className="title">Articles</h2>
                    <p>Total: {this.props.articles ? this.props.articles.length : 0}</p>

                </div>

 
                <div className="content">
                    <div className="content-wrapper">

                    <PaginatedTable 
                    
                            data={this.props.articles} 
                
                            table = {{

                                settings: {
                                    rows: 10,
                                    showSearch: true,
                                    showCount: true,
                                },

                                header: {
                                    title: 'Articles'
                                },

                                search: (row, filterValue) => {
                                    return row.user_givenName.toLowerCase().includes(filterValue) || row.user_family_name.toLowerCase().includes(filterValue) ? true : false
                                },
                            
                                body: {
                                 
                                    
                                    Headline:  (row) => {
                                        // return (row.headline )
                                        return (
                                            <div className="user-td">
                                                <Link className="tooltip top" to={"/admin/articles/article/" + row._id}>
                                                    <img alt={row.headline} src={row.picture_url} style={{borderRadius: 0, width: 70, height: 'auto'}}/>
                                                </Link>
                                        
                                                <div className="text-wrapper content-center">
                                                    <Link className="tooltip top" to={"/admin/articles/article/" + row._id}>
                                                        <p className="ame">{row.headline}</p>
                                                    </Link>
                                                </div>
                                                
                                            </div>
                                        )
                                    }, 
                                    Author:  (row) => {
                                        return this.getAuthorName(row.user_id)
                                    }, 
                                    Comments:  (row) => {
                                        return row.comments && row.comments.length
                                    }, 
                                    Categories:  (row) => {
                                        return <Link className="tooltip top" to={"/admin/articles/categories"}>{row.categories.map((cat) =>  cat.name + ' ')}</Link>
                                    }, 
                                    Status:  (row) => {
                                    return <span className="text-capitalize">{row.status === 'published' ? <span className="text-success">{row.status}</span> : <span className="text-info">{row.status}</span>}</span>
                                    },
                                  
                                    Published: (row) => {
                                        return  <AuxWrapper>{moment.unix(row.published_at).format("MM/DD/YYYY")}</AuxWrapper>
                                    },
                                    Actions: (row) => {
                                        return  (
                                            <AuxWrapper>
                                                <Link className="tooltip top" to={"/admin/articles/article/" + row._id}>
                                                    <span>Edit</span>
                                                    <i className="material-icons text-info">edit </i>
                                                </Link>
                                                <span className="tooltip top">
                                                <span>Delete</span>
                                                    <i
                                                        className="material-icons text-danger"
                                                        onClick={() => { this.onDelete(row._id, row.headline) }}>delete_forever
                                                    </i>
                                                </span>
                                                            
                                            </AuxWrapper>
                                        )
                                    }
                                }
                            
                            }}
                        />

                        

                    </div>
                </div>
            </div>
        
              
    
           
        )
    }

};


const mapStateToProps = state => {
    return { 

        articles: state.articles.articles,
        app_users: state.user.app_users,
    };
};


const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
  
        
    };
};



  export default connect( mapStateToProps, mapDispatchToProps )(Articles);  
  