import React from 'react';

const UnknownErrorPage = (props) => {


    return (
        <div className="ErrorPage">
            <div className="wrapper">
                <h1 className="title">Whoops!</h1>
                <h2 className="title">An unknown error has occurred with our servers.</h2>
                <p>We are working on the problem and apologize for any inconvenience this may have caused.</p>

            </div>
        </div>
    );

}

export default UnknownErrorPage;