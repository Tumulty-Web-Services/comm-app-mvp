import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';



import CornerCreated from '../../components/stateless/CornerCreated';


import AuxWrapper from '../../../../globalComponents/AuxWrapper';

import BlogCard1 from '../../components/stateless/BlogCard1';


import Hero from '../../components/stateless/Hero';

class ArticleCategory extends Component {

    state = {
        shouldRedirect: false,
        cat_articles: ''
    }

    runUpdate = (props) => {

        window.scrollTo(0,0)
        
        const cat_name = props.match.params.category_name;

        if(!cat_name) {
            this.setState({shouldRedirect: '/knowledge_base'})
        }

        const cat_articles = props.published_articles.filter((article) => {
            const shouldReturn = article.categories.find((cat) => {
                return cat.name.toLowerCase() === cat_name.toLowerCase()
            });

            if(shouldReturn) {
                return true;
            }

            return false;
        })

        this.setState({cat_articles})

    }

    componentDidMount = async  () => {

        this.runUpdate(this.props)

    }

    componentWillReceiveProps = (nextProps) => {

        if(this.props.match.params.category_name !== nextProps.match.params.category_name) {
            this.runUpdate(nextProps);
        }

    }

    render() {

        if(this.state.shouldRedirect) {
            return <Redirect to={this.state.shouldRedirect} />
        }

        const category = this.props.article_category_names.find((cat) => cat.name.toLowerCase() === this.props.match.params.category_name)

        return (

            <div className="page-knowledge-base" >

                <Hero
                    subTitle="Knowledge Base"
                    title={"Articles In: " + category.name}
                    text={category.description}
                    picture_url={category.picture_url}
                />

                <div className="main dark" >

                    <div className="container">
                
                    {this.state.cat_articles ? this.state.cat_articles.length ? (
                        <AuxWrapper>
                            <div className="border-right z-depth-3 " />
                            <div style={{margin: '75px 0 150px'}}> 
                                <h2 className="title">Category: <span className="gradient">{this.props.match.params.category_name}</span></h2>
                                <p onClick={() => this.props.history.goBack()}   ><i className="text-primary material-icons" style={{position: 'relative', top: 8, marginRight: 10}}>keyboard_backspace</i>Back </p>
                            </div>

                        </AuxWrapper>
                     ): '' : ''}

                        {this.state.cat_articles ? this.state.cat_articles.length ? this.state.cat_articles.map((article, index) => {
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
                                }) : (
                                    <div style={{margin: '75px 0'}}>

                                        <h2 className="title" >There are no articles in <br /><span className="gradient">"{this.props.match.params.category_name}"</span></h2>
                                        <Link to="/knowledge-base" style={{color: 'white'}}  ><i className="material-icons" style={{position: 'relative', top: 8, marginRight: 10}}>keyboard_backspace</i>Back To Knowledge Base</Link>
                                    </div>
                                ) : ''}

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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCategory);
