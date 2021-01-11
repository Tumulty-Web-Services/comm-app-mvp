import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CornerCreated from '../../components/stateless/CornerCreated';



import BlogCard1 from '../../components/stateless/BlogCard1';

import Hero from '../../components/stateless/Hero';
import ArticleSidebar from '../../components/stateless/ArticleSidebar';

class SiteLanding extends Component {

    componentDidMount = async  () => {

        window.scrollTo(0,0)
        
    }

    render() {

        return (

            <div className="page-knowledge-base" >

                <Hero
                    subTitle="Keeping You Up To date"
                    title="The Latest Articles, Happenings, And Knowledge In Tech"
                    text="There's the textbook way do things and then there's the way things actually get done. Here you'll find shortcuts, secrets, and information to scale whether your a coding developer, business owner, or tech aficionado."
                />

           
                <div className="main dark" >

                    <div className="z-depth- categories-selector"  >
                        <div className="container">

                        <div className="row">
                            <div className="col s12">
                            <h2 className="title">Article Categories</h2>
                            </div>
                        </div>

                            <div className="row"> 

                                {this.props.article_category_names ? this.props.article_category_names.map((cat) => {
                                    return (
                                        <div key={cat._id} className="col l3 m4 s12" style={{float: 'right'}}>
                                            <Link to={"/articles/category/" + encodeURI(cat.name.toLowerCase())} >
                                                <div className="category-card z-depth-3" style={{backgroundImage: 'url("'+cat.picture_url+'")'}}>
                                                    <div className="category-filter"></div>
                                                    <h4 className="category-name title">{cat.name}</h4>
                                                
                                                </div>
                                            </Link>
                                        
                                    </div>
                                    )
                                }) : ''}
                            </div>

                            
                        </div>

                        
                    </div>   
                  

                    <div className="container " style={{marginTop: 100}}>
                        
                    <div className="row ">
                            <div className="col l9 " style={{position: 'relative'}}>
                  

                                <div className="border-right z-depth-3 " />

                                    {this.props.published_articles ? this.props.published_articles.map((article, index) => {
                                        return index%2 === 0 ? (
                                            
                                            <div key={article._id} className="row">
                                                <div className="col xl9 l12">
                                                    <BlogCard1
                                                        key={index}
                                                        article={article}
                                                    />
                                                </div>
                                            </div>
                                            
                                            
                                        ) : (
                                            <div key={article._id} className="row">
                                                <div className="col xl9 l12 push-xl3">
                                                    <BlogCard1
                                                        key={index}
                                                        article={article}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }) : ''}


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

        published_articles: state.articles.published_articles,
        article_category_names: state.articles.article_category_names,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteLanding);
