import React from 'react';

const DatabaseErrorPage = (props) => {


    return (
        <div className="ErrorPage">
            <div className="wrapper">
                <h1 className="title">Whoops!</h1>
                <h2 className="title">Something has gone wrong with our database.</h2>
                <p>We are working on the problem and apologize for any inconvenience this may have caused.</p>

            </div>
        </div>
    );

}

export default DatabaseErrorPage;