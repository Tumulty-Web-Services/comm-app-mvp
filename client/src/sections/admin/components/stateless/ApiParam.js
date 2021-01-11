import React from 'react'

const ApiParam = (props) => {


    return (
        <div className="param">
            <div className="row">
                <div className="col s3">
                    <p className="param-name">{props.name}</p>
                    <p className="param-optional">{props.optional === 'required' ? props.optional: <span className="text-success">{props.optional}</span> }</p>
                </div>
                <div className="col s9">
                    <p className="param-description">{props.description}</p>
                    <p className="param-example">Ex: <span className="example-text"> {props.example}</span></p>
                </div>
            </div>
        </div>
    );

}

export default ApiParam;