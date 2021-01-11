import React, { Component } from 'react';
import AuxWrapper from '../AuxWrapper';

class Dots extends Component {


    state = {
        dots: 1
    };

    componentDidMount = () => {


        setInterval(() => {
            let dots = this.state.dots
            dots++

            if(dots === 4) {
                dots = 1;
            }

            this.setState({dots})

        }, this.props.interval)

    }

    render() {


        return (

            <AuxWrapper>
                {this.props.text}{this.state.dots === 1 ? '.' : this.state.dots === 2 ? '..' : '...'}
            </AuxWrapper>

        )

    }

}

export default Dots;