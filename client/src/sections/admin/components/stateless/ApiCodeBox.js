import React from 'react'

const ApiCodeBox = (props) => {


    return (
        <div className="code-box">
            <div className="code-box-header">
                <p className="code-box-title">{props.name}</p>
            </div>

            <div className="code-box-body">
                <pre>
                    <code id={props.id}>

{props.code.trim()}


                    </code>
                </pre>
            </div>
        </div>
    );

}

export default ApiCodeBox;