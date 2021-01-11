import React, {Component } from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {   getAllCategories, addArticleCategory } from '../../pages/text-editor/functions';
import { deleteWithCallback } from '../../../../functions/misc/modals'

import MediaLibrary from '../media-library';

class AdmArticlesCategories extends Component {

    state = {
        categories: '',
        showMediaLibrary: false,
        newCategory: {},

        idToUpdate: ''

    }

    onChange = (e) => {
        const name = e.target.value;
        this.setState({newCategory: { ...this.state.newCategory, name  }})
    }

    onChangeDescription = (e) => {
        const description = e.target.value;
        this.setState({newCategory: { ...this.state.newCategory, description }})
    }



    getAllCategories = () => {


        return new Promise ( async (resolve, reject) => {

            resolve(getAllCategories())
        })

    }

    componentDidMount = async () => {

        const getAllCategories = await this.getAllCategories();


        if(!getAllCategories.success) {
            return;
        }

        this.setState({categories: getAllCategories.categories})


    }

    async onDelete(_id, name) {
        deleteWithCallback({

            name,
            object: 'category',
            showNotifications: true,
                        
            delete: async () => {

                return await Axios({
                    method:'post',
                    url:'/api/article_categories_names/delete/' + _id,
                })

            },

            onSuccess: async () => { 
                const getAllCategories = await this.getAllCategories();


                if(!getAllCategories.success) {
                    return;
                }

                this.setState({categories: getAllCategories.categories})

             },

            onFailure: (e) => {}

        })
    }

    onAddCategory = async () => {

        const category = this.state.newCategory;


        if(category.name && category.description && category.picture_url) {

            console.log(category)
            await addArticleCategory(category);

            const getAllCategories = await this.getAllCategories();


            if(!getAllCategories.success) {
                return;
            }

            this.setState({categories: getAllCategories.categories, newCategory: {}})
        }
        
    }

    onUpdateCategory = async () => {

        const _id = this.state.idToUpdate;
        const category = this.state.newCategory;


        if(category.name && category.description && category.picture_url) {

            try {
              await Axios({
                method:'post',
                url:'/api/article_categories_names/update/' + _id,
                data: {
                   ...this.state.newCategory
                }
              })
            
            } catch(e) {
            
              console.log('Error ', e)
            
            }

            const getAllCategories = await this.getAllCategories();


            if(!getAllCategories.success) {
                return;
            }

            this.setState({categories: getAllCategories.categories, newCategory: {}, idToUpdate: '', editing: false})
        }
        
    }

    toggleMediaLibrary = (value) => {
        this.setState({showMediaLibrary: value})
      }

    onSelectObject = (url) => {
        this.setState({newCategory: { ...this.state.newCategory, picture_url: url }})
        this.toggleMediaLibrary(false)
    }
   
    render() {

      
      return (

       

        <div className="content-raised content-contained">

            {this.state.showMediaLibrary ? <MediaLibrary toggleMediaLibrary={(value) => this.toggleMediaLibrary(value)} onSelectObject={(value) => this.onSelectObject(value)} /> : ''}

            <div className="page-top">

                <div className="navigation">
                    My Dashboard
                </div>
                <h2 className="title">All Categories</h2>
                <p>Total: {this.state.categories ? this.state.categories.length : ''}</p>

            </div>

            

            <div className="content">
                <div className="content-wrapper">

                    <div className="table-wrapper">

                        <div className="table-header">
                            <div className="header-left">
                                <h4 className="title">Categories</h4>
                            </div>
                           
                        </div> 

                        <div className="table-responsive">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Picture</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.categories ? this.state.categories.map((cat, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{cat.name}</td>
                                                <td>{cat.description ? cat.description.length > 50 ? cat.description.substring(0,50) + '...' : cat.description : ''}</td>
                                                <td>{cat.picture_url ? <img src={cat.picture_url} alt="cat background pic" /> : 'no image selected'}</td>
                                                <td>
                                                    <span className="tooltip top">
                                                        <span>Delete</span>
                                                        <i className="material-icons text-success"
                                                            onClick={() => { this.setState({
                                                                editing: true,
                                                                newCategory: {
                                                                    name: cat.name,
                                                                    description: cat.description,
                                                                    picture_url: cat.picture_url,
                                                                    
                                                                },
                                                                idToUpdate: cat._id
                                                            }) }}>edit
                                                        </i>
                                                    </span>
                                                    <span className="tooltip top">
                                                        <span>Delete</span>
                                                        <i className="material-icons text-danger"
                                                            onClick={() => { this.onDelete(cat._id, cat.name) }}>delete_forever
                                                        </i>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr>
                                            <td>You haven't created any categories yet.</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>


                        <h2 className="title" style={{marginTop: 40}}>Add Category</h2>
                        <input  value={this.state.newCategory.name || ''} onChange={this.onChange} />

                        <h2 className="title" style={{marginTop: 40}}>Add Description</h2>
                        <textarea  value={this.state.newCategory.description || ''} onChange={this.onChangeDescription} />

                        <h2 className="title" style={{marginTop: 40}}>Add Picture</h2>

                        {this.state.newCategory.picture_url ? <img src={this.state.newCategory.picture_url} alt="cat background pic to set" /> : ''}
                        
                        <p   onClick={() => this.toggleMediaLibrary(true)}>Set Picture</p>

                        <hr style={{margin: '40px 0'}}/>

                        <div className='text-right'>
                            {this.state.editing ? (
                                <div>
                                    <button style={{marginRight: 10}} className="btn btn-danger" onClick={() => this.setState({editing: false, newCategory: {}})}>Cancel</button>

                                    <button className="btn btn-info" onClick={() => this.onUpdateCategory()}>Update Category</button>
                                    </div>
                            ): <button className="btn btn-success" onClick={() => this.onAddCategory()}>Add Category</button>}
                                    
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

  
  export default connect( mapStateToProps, mapDispatchToProps )(AdmArticlesCategories);  
  