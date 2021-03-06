import React from 'react'

const ApiArgument = (props) => {


    return (
        <div className="param">
            <div className="row">
                <div className="col s3">
                    <p className="param-name">{props.name}</p>
                    <p className="param-optional">optional: {(props.isNullable) ? 'true' : 'false'}</p>
                </div>
                <div className="col s9">
                    <p className="param-description">Type: {(props.dataType === 'character varying') ? 'string': props.dataType}</p>
                </div>
            </div>
        </div>
    );

}

export default ApiArgument;