import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {


    return (
        <div className="ErrorPage">
            <div className="wrapper">
                <h1 className="title">COMM App</h1>
                <h2 className="title">Page Not Found</h2>

                <Link to="/"><i className="material-icons">keyboard_backspace</i> Back To Site</Link>
            </div>
        </div>
    );

}

export default NotFound;