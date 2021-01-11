import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

import CubeLoader from '../../globalComponents/loaders/Cube';


class CheckoutForm extends Component {



  
  constructor(props) {
    super(props);
    // var checkout = this
    this.state = {complete: false, processing: false, cardError: ''};
    this.submit =  this.props.loginHandler.bind(this);

    
  }


  render() {

    
    return (
        this.state.processing ? <CubeLoader /> : 
      
      
      <div className="checkout" >
      
        <div id="stripeCardError">{this.state.cardError}</div>

        <CardElement  className="card-element" />
        
        <div className="text-right">
        <button onClick={(event) => this.submit(event, this.props.params)}>{this.props.buttonText}</button>
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);