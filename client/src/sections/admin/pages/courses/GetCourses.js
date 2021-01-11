import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';

// import img1 from '../../../../assets/img/GetManager1.jpg'
// import img2 from '../../../../assets/img/GetManager2.jpg'


class GetCourses extends Component {

    state = {
        tableSchema : '',
    }

   
    //set results on open
    async componentDidMount() {


         //send action to set active sidebar tab
         this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/courses',
        })


    }



    render() {


        return (


            <div className="aos__manager">

            
                <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                    </div>
                    <h2 className="title">Admin Manager</h2>
                    <p>Get Course Module</p>

                </div>

                <div className="content">
                    <div className="content-raised"  >
                        <div className="row">
                            <div className="col s12">
                                <h2>AOS Database Manager</h2>

                                <p>Manage large amounts of data without the need for database specialist. Our database manager has been used in social networks, investment companies, personality tests, and more</p>

                                <p>With this add on you can see every bit of your applications data, all of your database tables, and the entries in them.</p>
                                <p>You can update any entry you want, copy ones you want to duplicate and delete anything you dont want to store.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col m6 s12">
                                {/* <img src={img1} /> */}
                            </div>
                            <div className="col m6 s12">
                                {/* <img src={img2} /> */}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12">
                                <h2>Tech Specs</h2>
                                <ul>
                                    <li>Visual see all entries in your database</li>
                                    <li>Filter by database table</li>
                                    <li>See required and non required fields</li>
                                    <li>Sanitize all entries before you create, update, or copy an entry</li>

                                </ul>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12">
                                <hr />
                                <h2>Activate You Database Manager</h2>
                                <h2>$499</h2>
                                <p>To activate your applications database manager click the button below to charge your AOS account.</p>
                                <div className="text-right">
                                    <button className="btn btn-success">Activate Now ($499)</button>
                                </div>

                            </div>
                        </div>

                       
                       
                    </div>
                </div>
            </div>
    
           
        )
    }

};


const mapStateToProps = state => {
    return {

     
    };
};
  
const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
        SET_MANAGER_SCHEMA: (schema) =>  dispatch({type: actionTypes.SET_MANAGER_SCHEMA, payload: {schema} }),

        
    };
};

  export default connect( mapStateToProps, mapDispatchToProps )(GetCourses);  
  
