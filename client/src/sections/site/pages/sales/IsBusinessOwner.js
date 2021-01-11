/*
Documentation

Corresponds to /page/2

*/

import React, {Component} from 'react';

import {Link} from 'react-router-dom';




import CornerCreated from '../../components/stateless/CornerCreated';

import johnCutOut from '../../../../assets/img/johnCutOut.png';

import AuxWrapper from '../../../../globalComponents/AuxWrapper';

import {connect} from 'react-redux';
import BlogCard1 from '../../components/stateless/BlogCard1';

import ImgThree from '../../components/stateless/ImgThree';


import heroku from '../../../../assets/img/heroku.png';  
import cssTricks from '../../../../assets/img/css-tricks.png';

import TopResources from '../../components/stateless/TopResources';

import ArticleSidebar from '../../components/stateless/ArticleSidebar'




class IsDeveloper extends Component {

    componentDidMount = () => {
        window.scrollTo(0,0)
    }

    render() {

        
        return (

            <AuxWrapper >



                <div className="hero-main">
                    <div className="filter">

                       <div className="filter-dark">
                        <div className="container ">
                                <div className="row">
                                
                                    <div className="col l6 s12 column" >


                                        <h3 className="sub-title">Modern Age <span className="text-roo">Development</span></h3>
                                        <h2 className="title">Connecting developers and non-technical founders</h2>
                                        
                                        {/* <p >Modern age development is about more than just code, it's systems engineering in both application building and inter-personal communication. As entrepreneurs our systems change the world and the way we do it creates massive impact.</p>  */}

                                        <p >Modern age development is about more than just code, it's systems engineering in both application building and inter-personal communication. Whether your a developer or a business owner there is an entire world in front of you to be mastered before you can truly scale your business. So I ask, which one are you?</p> 


                                        <Link to="/page/1" className="btn btn-success" style={{marginTop: 20, marginRight: 15}}>I'm A Developer</Link>
                                        <button className="btn " style={{marginTop: 20}}>I Own A Business</button>
                                        
                                    </div>
                                
                                    <div className="col l6 s12 column">
                                        <div className="row">
                                        
                                            <div className="col l6 s12">
                         
                                                <ImgThree 
                                                    className="first"
                                                    img={heroku}
                                                    link=""
                                                    alt="heroku"
                                                    openNewTab={true}
                                                    tilt="left"
                                                />
                                            </div>
                                        
                                            <div className="col l6 s12">
                                                <ImgThree 
                                                    img={cssTricks}
                                                    link=""
                                                    alt="css tricks"
                                                    openNewTab={true}
                                                    tilt="right"
                                                />
                                            </div>
                                        
                                        </div>

                                        <div className="row">
                                            <div className="col l6 push-l3 s12">

                                                <ImgThree 
                                                    img="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1558372275588"
                                                    link=""
                                                    alt="picture image"
                                                    openNewTab={true}
                                                    tilt="down"
                                                />
                                               
                                            </div>
                                        
                                        </div>

                                    </div>
                                
                                </div>
                            </div>                       
                        </div>
                    
                    </div>
                </div>

                <div className="contaner top-resource-container z-depth-5" >
                        <h2 className="title" >Top Resources</h2>
                        <p className="sub-title">* I currently do not get any commisions for products or services recommended on
                                    this site. Everything on here is something I have used and believe in 100%.</p>
                                <br />
                        <TopResources />
                    </div>

                

                
                <div className="main dark page-home">

                    <div className="container" style={{marginTop: 75}}>
                        <div className="row ">
                            <div className="col l9 ">


                                <div className="under-header" >
                                    <div className="contaner">
                                        <div className="padding">

                                            <img className="imgRight" src={johnCutOut} alt="COMM App"/>

                                            <div className="row" style={{marginBottom: 0, display: 'fle'}}>
                                            
                                                <div className="col l3" style={{algnSelf: 'center'}}>
                                                    <div className="row">
                                                        <div className="col s3 ">
                                                            <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559073921694" alt="resource logo"/>
                                                        </div>
                                                        <div className="col s3 ">
                                                            <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559074556245" alt="resource logo"/>
                                                        </div>
                                                        <div className="col s3 ">
                                                            <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559074206969" alt="resource logo"/>
                                                        </div>
                                                    
                                                        <div className="col s3 ">
                                                            <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559075371919" alt="resource logo"/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="row" style={{marginBottom: 0, }}>
                                                
                                                        
                                                        <div className="col s3 push-l ">
                                                            <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559074286347" alt="resource logo"/>
                                                        </div>
                                                        <div className="col s3 push-l ">
                                                            <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559075967693" alt="resource logo"/>
                                                        </div>
                                                    </div>

                                                    <Link to="/contact" className="btn" style={{marginTop: 20, width: '100%'}}>Start Your Project</Link>
                                                </div>
                                                <div className="col l7" style={{borderLeft: 'solid 3px hite', alignSelf: 'center', marginTop: -5}}>
                                                    <h2 className="title">No Shortcuts, No Nonsense<br /> <span className="gradient">No EXCUSES</span></h2>
                                                    <p>Applications built by the best, for the best without any fluff thrown in. Just the way we like it and you deserve it.</p>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                
                                <h2 className="title">What is modern application development?</h2>
                                <p>Simply put, its' world class engineers working with world class business owners to create systems that change the world. Boldly put, its a new paradigm of communication to get apps built that do not waste a business budget or a developers time. It's scalable scalability.</p>


                                <i className="material-icons z-depth-2">code</i> 
                                <i className="material-icons z-depth-2">chat_bubble</i> 
                                <i className="material-icons z-depth-2">stay_current_portrait</i> 
                                <i className="material-icons z-depth-2">people</i> 

                                <div className="text-right">
                                    <Link className="btn btn-success" to="/" >Learn More</Link>
                                </div>

                                <hr  />

                                <div style={{marginTop: 125}}>
                                    {this.props.published_articles ? this.props.published_articles.map((article, index) => {
                                        return index < 3 ? index%2 === 0 ? (
                                        
                                            <div className="row" key={article._id}>
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
                                        ) : ''
                                    }) : ''}
                                </div>
                            </div>
       
                            <div className="col l3 m12 s12  article-sidebar">

                                <ArticleSidebar />

                            </div>

                        </div>

                    </div>

                </div>

                



                <CornerCreated />

            </AuxWrapper>
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


