import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BlogCard1 = (props) => {


    return (
        
        <div className="article-teaser z-depth-3">

            <div className="card-backing z-depth-1"></div>

            <div className="row" style={{marginBottom: 0}}>
                <div className="col l5 s12">

                    <div className="surrounder">
                        <div className="background"></div>

                        <Link to={"/article/" + props.article._id} >
                            <div className="img-holder">
                                <img src={props.article.picture_url} className="img-bg-1 z-depth-2" alt={props.article.headline}/>
                                <img src={props.article.picture_url} className="img-bg-2 z-depth-2" alt={props.article.headline}/>
                                <img src={props.article.picture_url} className="img-main z-depth-3" alt={props.article.headline}/>
                            </div>
                        </Link>

                        <span className="icons count">
                            <i className="fas fa-eye z-depth-2"></i> 
                            <span className="count">{props.article.views || 0}</span>
                            
                        </span>
                        <span className="icons comments"> 
                            <i className="fas fa-comments z-depth-2"></i>
                            <span className="count">8</span>
                        </span>

                        <span className="icons edit"> 
                            <i className="fas fa-edit z-depth-2"></i>
                            <span className="count">{moment.unix(props.article.updated_at).format("MMM Do")}</span>
                        </span>

                    </div>

                </div>
                <div className="col l7 s12">
                <Link to={"/article/" + props.article._id} ><h3 className="title mb-0">{props.article.headline}</h3></Link>


                    <div className="row author-row">
                        <div className="col s2 author-img">
                            <img className="img-author z-depth-2" src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p160x160/18699768_1284207708344626_8003713518879003763_n.jpg?_nc_cat=103&amp;_nc_ht=scontent-lga3-1.xx&amp;oh=470e2c88c8ac2b808a259644afd678ed&amp;oe=5D07410D" alt=""/>
                        </div>
                        <div className="col s10 author-text">
                            <p className="name">COMM App</p>
                            <p className="published">Published On:  {moment.unix(props.article.published_at).format("MMM DD, YYYY")}</p>
                        </div>
                    </div>

                    <h5 className="sub-title">{ props.article.categories ? props.article.categories.map((cat) => {
                        return (
                            <Link key={cat._id} to={"/articles/category/" + encodeURI(cat.name.toLowerCase())} >
                                <span  className="category-pill z-depth-3">{cat.name}</span>
                            </Link>
                        )
                    }) : '' }</h5>

                    <p className="sub-title excerpt">{props.article.excerpt}...</p>

     

                    <div className="text-right">
                        <Link to={"/article/" + props.article._id} className="btn">Read More</Link>
                    </div>

                </div>

                
            </div>

            
            
           
        </div>

    );

}

export default BlogCard1;