import React from 'react';
import { Link } from 'react-router-dom';

const ImgThree = (props) => {


    return (
        <div className={"surrounder " + props.className}>
            <div className="background"></div>

            {props.link && props.openNewTab ? (
                <a href={props.link} target="_blank" rel="noopener noreferrer">
                    <div className="img-holder">
                        <img src={props.img} alt={props.alt} className="img-bg-1 z-depth-2" style={{transform: props.tilt === 'down' ? 'rotate(-15deg)' : ''}}/>
                        <img src={props.img} alt={props.alt} className="img-bg-2 z-depth-2" style={{transform: props.tilt === 'down' ? 'rotate(15deg)' : ''}} />
                        <img src={props.img} alt={props.alt} className="img-main z-depth-3" style={{transform: props.tilt === 'right' ? 'rotate(15deg)' : props.tilt === 'left' ? 'rotate(-15deg)' : ''}} />
                
                    </div>
                </a>
            ) : props.link ? (
                <Link to={props.link} >
                    <div className="img-holder">
                        <img src={props.img} alt={props.alt} className="img-bg-1 z-depth-2" style={{transform: props.tilt === 'down' ? 'rotate(-15deg)' : ''}}/>
                        <img src={props.img} alt={props.alt} className="img-bg-2 z-depth-2" style={{transform: props.tilt === 'down' ? 'rotate(15deg)' : ''}} />
                        <img src={props.img} alt={props.alt} className="img-main z-depth-3" style={{transform: props.tilt === 'right' ? 'rotate(15deg)' : props.tilt === 'left' ? 'rotate(-15deg)' : ''}} />
                
                    </div>
                </Link>
        ) : (
            <div className="img-holder">
                <img src={props.img} alt={props.alt} className="img-bg-1 z-depth-2" style={{transform: props.tilt === 'down' ? 'rotate(-15deg)' : ''}}/>
                <img src={props.img} alt={props.alt} className="img-bg-2 z-depth-2" style={{transform: props.tilt === 'down' ? 'rotate(15deg)' : ''}} />
                <img src={props.img} alt={props.alt} className="img-main z-depth-3" style={{transform: props.tilt === 'right' ? 'rotate(15deg)' : props.tilt === 'left' ? 'rotate(-15deg)' : ''}} />
        
            </div>
    )}

        </div>  
    );

}

export default ImgThree;