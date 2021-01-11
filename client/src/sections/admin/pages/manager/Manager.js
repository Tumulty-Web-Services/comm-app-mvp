import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';


class DbResults extends Component {

    state = {
        tableSchema : '',
    }

   
    //set results on open
    async componentDidMount() {


         //send action to set active sidebar tab
         this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/admin/manager',
        })

        if(!this.props.table_schema) {
            try {
                const tableSchema = await Axios({
                  method:'get',
                  url:'/api/manager/table_schema',
      
                })


      
               this.props.SET_MANAGER_SCHEMA(tableSchema.data)
       
              
              } catch(e) {
              
                console.log('Error ', e)
              
              }
        } 

    }



    render() {


        return (

           !this.props.table_schema ? '' :

            <div className="aos__manager">

            
                <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                    </div>
                    <h2 className="title">Admin Manager</h2>
                    <p>Total Tables: {this.props.table_schema.length}</p>

                </div>

                <div className="content">
                    <div className="content-raised"  >
                        <h2>Select Your Table</h2>

                        <div className="row">
                        {this.props.table_schema.map((table, index) => {

                            return (

                                <div key={index} className="col xl4 l6 m6 s12">
                                    <Link to={"/admin/manager/table/" + table.name}>
                                        <div className="table_schema_card">
                                            <h3 className="table_name">{table.name.split('_').join(' ')}</h3>
                                            <h4 className="stat">Entries: {table.rowCount}</h4>
                                            <h4 className="stat">Columns: {table.columns.length}</h4>
                                        </div>
                                    </Link>
                                </div>

                            )

                        })}
                        </div>

                       
                    </div>
                </div>
            </div>
    
           
        )
    }

};


const mapStateToProps = state => {
    return {

        table_schema: state.manager.schema,
     
    };
};
  
const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),
        SET_MANAGER_SCHEMA: (schema) =>  dispatch({type: actionTypes.SET_MANAGER_SCHEMA, payload: {schema} }),

        
    };
};

  export default connect( mapStateToProps, mapDispatchToProps )(DbResults);  
  
