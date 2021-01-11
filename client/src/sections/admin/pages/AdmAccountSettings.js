import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

import {crud_update} from '../../../functions/db-helpers/crud_update';
import {  createNotificationStandard } from '../../../functions/misc/notifications';



class AccountSettings extends Component {

    state = {
        user: {
            ...this.props.user
        },
        stripeCustomer: {},
        defaultSource: {},
        processing: false
    }

    onInputChange = (name) => object => {

        //get the value of the changed input
        let value =  object.target.value;

       
        //create a new object with it
        let updatedUser = Object.assign({}, this.state.user);
        updatedUser[name] = value;

        //update state
        this.setState({user: updatedUser});
        
    }

    onUpdateUser = async () => {

        //make sure user family_name is added
        if(this.state.user.family_name === '') {
            createNotificationStandard('Not So Fast!', '<span class="text-danger">You must add your last name.</span>', 2000);
            return false;
        }

        //make sure user givenName is added
        if(this.state.user.givenName === '') {
            createNotificationStandard('Not So Fast!', '<span class="text-danger">You must add your first name.</span>', 2000);
            return false;
        }

        //make sure users email is added
        if(this.state.user.email === '') {
            createNotificationStandard('Not So Fast!', '<span class="text-danger">You must add your email.</span>', 2000);
            return false;
        }

        try {

            //update the user
            await crud_update('users', { 
                ...this.state.user        
            })



            //send success message
            createNotificationStandard('Success', '<span class="text-success">Profile successfully updated!</span>', 2000);

        } catch(e) {

            //something went wrong
            console.log(e);

            //send error message
            createNotificationStandard('Whoops!', '<span class="text-danger">Looks like something went wrong updating your profile. Contact support.</span>', 2000);
        }

       

    }

    // async submit(ev, params) {


          
    //     //get the name to use for this stripe source
    //     const cardName = params.user.family_name + ' ' + params.user.givenName + ' Default Card'
    //     //get the token from stripe
    //     let {token} = await this.props.stripe.createToken({name: cardName, type: 'card'});
    
    //     //create the error div
    //     const ErrorDiv = document.getElementById('stripeCardError');
    
    //     if(token) {

    //         this.setState({processing: true})

    //         let newSource = '';

    //         try {

    //             //try creating a new source
    //             newSource = await Axios({
    //                 method:'post',
    //                 url:'/api/stripe/source/create',
    //                 responseType:'stream',
    //                 data: {
    //                     tokenId: token.id,
    //                 }
    //             })

    //             newSource = newSource.data.source

    //         } catch(e) { // error thrown adding a new source in stripe

    //             console.log('Error ', e)

    //             this.setState({processing: false, cardError: e.message});
    //             createNotificationStandard('<span class="text-danger">Error</span>', 'Something went wrong with our payment provider. <br><br> <span class="text-info">Code: '+e.response.data.error+' </span>');

    //             return false;

    //         }

    //         //if user is not yet a customer
    //         if(!params.user.stripeCusId) {


    //             try {
    //                 //try creating a new customer object
    //                 let customer = await Axios({
    //                     method: 'post',
    //                     url: '/api/stripe/customer/create',
    //                     data: {
    //                         sourceId: newSource.id,
    //                         family_name: params.user.family_name,
    //                         givenName: params.user.givenName,
    //                         phone: params.user.phone,
    //                         email: params.user.email,
    //                         id: params.user.id,
    //                     }
    //                 })

    //                 customer = customer.data.customer;
               
    //                 try {

    //                     //if customer failed to created
    //                     await crud_update('users', { 
    //                         id: params.user.id, 
    //                         stripeCusId: customer.id 
                        
    //                     })


    //                     ///Success!!!!!
    //                     createNotificationStandard('<span class="text-success">Success!</span>', 'You have successfully added your payment information!', 4000)                    

    //                 } catch (e) { // error thrown updating our user

    //                     console.log('Error ', e)
                       
    //                     createNotificationStandard('<span class="text-danger">Error</span>', 'An internal error ocurred with our database. <br><br> <span class="text-info">Code: '+e.response.data.error+' </span>')

    //                 }

    //             } catch(e) { //error thrown creating customer

    //                 console.log('Error ', e)
    //                 createNotificationStandard('<span class="text-danger">Error</span>', 'An Error ocurred with Stripe\'s customer object. <br><br> <span class="text-info">Code: '+e.response.data.error+' </span>')

    //             }
              

    //         } else {

    //             try {
                              
                   
    //                 //try adding the source to the customer                        
    //                 await Axios({
    //                     method:'post',
    //                     url:'/api/stripe/customer/add_source',
    //                     data: {
    //                         sourceId: newSource.id,
    //                         customerId: params.user.stripeCusId
    //                     }
    //                 })

    //                  //remove the original source from the customer
    //                  await Axios({
    //                     method:'post',
    //                     url:'/api/stripe/customer/remove_source',
    //                     data: {
    //                         sourceId: params.defaultSource.id,
    //                         customerId: params.user.stripeCusId
    //                     }
    //                 })

    //                 //try updating the customer to have the new default source
    //                 await Axios({
    //                     method:'post',
    //                     url:'/api/stripe/customer/set_default_source',
    //                     data: {
    //                         sourceId: newSource.id,
    //                         customerId: params.user.stripeCusId
    //                     }
    //                 })

                   
    //                 //SUCCESS! customer source successfully added
    //                 params.setDefaultSource(newSource)
    //                 createNotificationStandard('<span class="text-success">Success!</span>', 'Your payment information was successfully updated', 2000)
                                                              
    //             } catch (e) { //error thrown adding source to customer or updating the customer to a new default source

    //                 console.log(e.response.data.error);

    //                 createNotificationStandard('<span class="text-danger">Error</span>', 'Something went wrong adding a new source to your account. <br><br> <span class="text-info">Code: '+e.response.data.error+' </span>')

    //             }
                                          
    //         }
            
    //     } else { //no token was passed into the function
          
    //         // this.setState({processing: false, cardError: response.data.message})
    //       ErrorDiv.innerHTML = 'Please Check Your Card Information Is Correct';
          
    //     }

    //     this.setState({ processing: false});

    // }

  

    async componentDidMount() {

        //set the sidebar to active
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/account/settings',
            drop: ''
        })

      
    }

    render() {


        return (

            <div className="content-raised">
                <div className="page-top">

                    <div className="navigation">
                        Account Settings
                    </div>
                    <h2 className="title">My Account</h2>

                </div>

                <div className="content">
                    <div className="content-wrapper">


                    <div className="row">

                        <div className="col l6 m12">

                            <div className="card">
                                <div className="card-body"> 
                        
                                    
                                    <h2>Contact Info</h2>

                                    <label>Email Address</label>
                                    <input type="text" onChange={ this.onInputChange('email')} value={this.state.user.email || ''}  />

                                    <label>Phone</label>
                                    <input type="text" onChange={ this.onInputChange('phone')} value={this.state.user.phone || ''}  />

                                </div>
                            </div>  

                            <div className="card">
                                <div className="card-body"> 
                        
                                    
                                    <h2>Name</h2>

                                    <label>First Name</label>
                                    <input type="text" onChange={ this.onInputChange('givenName')} value={this.state.user.given_name || ''}  />

                                    <label>Last Name</label>
                                    <input type="text" onChange={ this.onInputChange('family_name')} value={this.state.user.family_name || ''}  />

                                </div>
                            </div>         

                        </div>
                
                        <div className="col l6 m12">

                            <div className="card">
                                <div className="card-body"> 
                    
                                    <h2>Address</h2>

                                    <label>Address Line 1</label>
                                    <input type="text" onChange={ this.onInputChange('address_line_1')} value={this.state.user.address_line_1 || ''}  />

                                    <label>Address Line 2</label>
                                    <input type="text" onChange={ this.onInputChange('address_line_2')} value={this.state.user.address_line_2 || ''}  />

                                    <label>City</label>
                                    <input type="text" onChange={ this.onInputChange('city')} value={this.state.user.city || ''}  />

                                    <label>State</label>
                                    <input type="text" onChange={ this.onInputChange('state')} value={this.state.user.state || ''}  />

                                    <label>Country</label>
                                    <input type="text" onChange={ this.onInputChange('country')} value={this.state.user.country || ''}  />

                                    <label>Zip</label>
                                    <input type="text" onChange={ this.onInputChange('postal_code')} value={this.state.user.postal_code || ''}  />

                                </div>
                            </div>

                        </div>
                        

                    </div>

                    <div className="text-right">
                        <button onClick={() => this.onUpdateUser()} className="btn btn-success">Update Profile</button>
                    </div>

                    </div>
                </div>
            </div>
           
        )
    }

};


const mapStateToProps = state => {
    return {

      stripeDefaultSource: state.user.defaultSource,

    };
};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
        getCurrentUser: (user) =>  dispatch({type: actionTypes.SET_CURRENT_USER, payload: {user} }),
        setDefaultSource: (defaultSource) =>  dispatch({type: actionTypes.SET_USER_STRIPE_DEFAULT_SOURCE, payload: {defaultSource} }),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(AccountSettings);  
  


