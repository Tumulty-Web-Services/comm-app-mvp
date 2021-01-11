import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';


import logoGoogle from '../../../assets/img/google.png';
import logoFacebook from '../../../assets/img/facebook.png';


import AosSite from '../components/main/AosSite';
import Main from '../components/main/Main';




class SiteLogin extends Component {

    state = {
        shouldRedirect: false
    }

   async componentDidMount() {


        if(this.props.user) {

            if(this.props.user.is_admin) {

                this.setState({shouldRedirect: '/admin/dashboard'});

            } else if (this.props.user.loggedIn) {

                this.setState({shouldRedirect: '/dashboard'});

            }

        }


   }


    render() {

        if(this.state.shouldRedirect) {
            return <Redirect to={this.state.shouldRedirect} />
        }

        

        return (

            <AosSite>
                    
                <div className="background-filter">

                    <Main>
        
                        <div className="login login-1" style={{background: 'none'}}>
                            <div className="wrapper">
                                <div className="shell" >

                                    {/* <img src={logo} style={{width: '150px'}} alt="site logo"/> */}
                                    

                                    <h1 className="title" style={{marginBottom: 50, color: 'white', textTransform: 'none'}}>COMM App Register / Login</h1>
                    
                                    <a href={"/auth/google" + this.props.location.search} className="social-button button-google " >
                                        <img  src={logoGoogle} alt="google logo" />
                                        <span >Login with Google</span>
                                    </a>

                                    <a href={"/auth/facebook" + this.props.location.search} className="social-button button-facebook " >
                                        <img  src={logoFacebook} alt="google logo" />
                                        <span >Login with Facebook</span>
                                    </a>

                                    <p style={{color: 'white'}}>By logging in, you agree to our  <Link to="/terms-of-service">Terms of Service</Link></p>


                                </div>
                            </div>
                        </div>
            
                    </Main>
           
                </div>
        
            </AosSite>
    
           
        )
    }

}


const mapStateToProps = (state) => {
    return {
            user: state.user.user
    };
};


export default connect(mapStateToProps, '')(SiteLogin);


