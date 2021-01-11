import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard1 = (props) => {


    return (
        <div style={{background: '#555', paddingTop: 75, paddingBottom: 35, marginBottom: 100}} >
            <div className="container">
                <div className="row">
    
                    <div className="col l3 s12">
                        
                    </div>
            
                    <div className="col l6 s12 text-center">

                    <div className="BlogCard2">
                        <div className="surrounder pic1">
                                <div className="background"></div>

                                <a href="https://heroku.com" target="_blank" rel="noopener noreferrer" >
                                    <div className="img-holder" style={{transform: 'rotate(-25deg) skewY(-0deg)'}}>
                                        <img src={props.img} className="img-bg-1 z-depth-2" alt="props.img" />
                                        <img src={props.img} className="img-bg-2 z-depth-2" alt="props.img" />
                                        <img src={props.img} className="img-main z-depth-3" alt="props.img" />
                                    </div>
                                </a>

                            </div>

                            <div className="featured-card z-depth-3">
                            <h2 className="title">My Headline Would Go Here</h2>
                            <p style={{color: 'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut purus maximus, egestas mi eu, fringilla turpis. Nulla nisi justo, consectetur eu sapien in, maximus pulvinar leo. Maecenas cursus...</p>

                            <div className="text-righ">
                                    <Link to="/" className="btn">Read More</Link>
                                </div>
                                </div>

                                <div className="surrounder pic2">
                                <div className="background"></div>

                                <a href="https://heroku.com" target="_blank" rel="noopener noreferrer" >
                                    <div className="img-holder" style={{transform: 'rotate(25deg) skewY(-0deg)'}}>
                                        <img src={props.img} className="img-bg-1 z-depth-2" alt="props.img" />
                                        <img src={props.img} className="img-bg-2 z-depth-2" alt="props.img" />
                                        <img src={props.img} className="img-main z-depth-3" alt="props.img" />
                                    </div>
                                </a>

                            </div>
                        </div>
                            
                    </div>

                    <div className="col l3 s12">
                    
                    </div> 
            
                </div>
            </div>
        </div>


        

    );

}

export default BlogCard1;