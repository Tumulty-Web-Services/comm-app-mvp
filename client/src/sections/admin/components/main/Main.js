import React, { Component } from 'react';

class Main extends Component {


    render() {
        return (
            <div className="aos__admin-main">
                {this.props.children}
            </div>
        )
    }

}

export default Main;