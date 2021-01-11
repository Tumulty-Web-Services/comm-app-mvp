import React from 'react'

import john2 from '../../../../assets/img/john3.png';
import bg10 from '../../../../assets/img/bg-10.jpg';
const Hero = (props) => {


    return (

        <div className="hero home z-depth-3" style={{backgroundImage: props.picture_url ? 'url("'+props.picture_url+'")' :  'url("'+bg10+'")'}}>
        { /*<div className="hero home z-depth-3" style={{backgroundImage: props.picture_url ? 'url("'+props.picture_url+'")' :  'url("https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559781766594")'}}> */}
                
            <div className="filter">

                <div className="container dark">
                    <div className="row">
                        <div className="col l6 m7">
                            <img className="me" src={john2} alt="" />

                        </div>

                        <div className="col l6 m5">
                            <h5 className="sub-title">{props.subTitle}</h5>
                            <h2 className="title gradient">{props.title}</h2>
                            <div className="row">
                                <p className="text">{props.text}</p>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );

}

export default Hero;