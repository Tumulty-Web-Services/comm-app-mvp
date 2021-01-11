import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';


import ApiParam from '../../components/stateless/ApiParam';
import ApiArgument from '../../components/stateless/ApiArgument';
import ApiCodeBox from '../../components/stateless/ApiCodeBox';

import { getExampleData } from '../../../../functions/db-helpers/exampleByColumnName';




import hljs from 'highlightjs';



// import { objectToString } from '../../../../functions/misc/objectToString';


function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g, function (match) {
        
        return match ;
    });
}



class DevApi extends Component {

    state = {
        columnsCanBeSet: [{}],
        table: ''
    }

    getApiContent = async (props) =>  {

        //////////////////////////////////////////////////
        //Start conversion from postgres to MongoDB
        //////////////////////////////////////////////////

        //get table by parameter value
        const tableName = props.match.params.table;


        //get the table schema from our redux store
       const foundTable = this.props.tables.find((table) => {
            return Object.keys(table)[0] === tableName
        })



        //get the column for the table
        let columns = foundTable[tableName]

        //set a new array to push to
        const newArray = [];

        columns.forEach((column) => {
            let obj = {};

            //convert current keys to postgres for rendering
            obj.column_name = Object.keys(column)[0];
            obj.is_nullable = column[Object.keys(column)].isRequired
            obj.data_type = column[Object.keys(column)].type


            newArray.push(obj)
        })

        var tableColumns = newArray;
       

        //////////////////////////////////////////////////
        //end conversion to postgres schema
        //////////////////////////////////////////////////

        const tableSingular = tableName.slice(0, -1);



        const columnsToIgnore = [
   
            'created_at',
            'updated_at',
            '_id',
            '__v'
        ]

        //get columns that can be set (ignore id, createdAt, etc)
        const columnsCanBeSet = tableColumns.filter((column) => {
            if(columnsToIgnore.includes(column.column_name)) {
                return false;
            }
            return true;
        })

        function compare(a,b) {
            if (a.is_nullable === 'NO') {
                return -1;
            }
              
            // if (a.last_nom > b.last_nom)
            //   return 1;
            return 0;
          }
           
          columnsCanBeSet.sort(compare);
 

        let objectResponse = {};
        
        for (let i = 0; i < tableColumns.length; i++) {

            const data_type = tableColumns[i].data_type;
            const column_name = tableColumns[i].column_name;

            objectResponse[column_name] = getExampleData(column_name, data_type);
                                    
        }

        objectResponse = [objectResponse];

        
        var str = JSON.stringify(objectResponse, undefined, 4);
        str = syntaxHighlight(str);
        //convert data from the object into a string to set the example response
        // document.getElementById('api-get-all').innerText = objectToString(str);
        document.getElementById('api-get-all').innerText = str;
        document.getElementById('api-get-one').innerText = str;

        //set create api code
        document.getElementById('api-create').innerHTML = str;

        //set update api code
        document.getElementById('api-update').innerHTML = str;
        
       

        await this.setState({table: tableName, tableSingular, columnsCanBeSet})

         //run the highlight function to format code
         document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });

    }

    async componentWillReceiveProps(nextProps) {

        if(this.props.location.pathname !== nextProps.location.pathname) {
            this.getApiContent(nextProps);

            this.props.SET_SIDEBAR_HIGHLIGHT({
                tab: nextProps.match.params.table,
                drop: '/dev/api/table'
            })
        }
        
    }

    async componentDidMount() {

        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
        
          //send action to set active sidebar tab
          this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: this.props.match.params.table,
            drop: '/dev/api/table'
        })

        this.getApiContent(this.props);
        

    }

    render() {


        return ( 

            <div className="aos__api">
                 <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/dashboard"><i className="material-icons">arrow_back</i> Dashboard</Link>
                    </div>
                    <h2 className="title">Api Documentation</h2>
                    {/* <p>Total: {this.state.feature_requests.length}</p> */}

                    </div>

                <div className="content">
                    <div className="content-wrapper">
                        <div className="aos__api">
                            
                            <div className="row api-section flex">
                                <div className="col l6 m12 documentation">

                                    <h2 className="route-name">Get All <span className="text-capitalize">{this.state.table}</span></h2>
                                    <p className="description">Returns all {this.state.table} you have access to.</p>
                                    <h4 className="endpoint"><span className="text-success">GET </span> http://localhost:3000/api/{this.state.table}/get/all?limit=10</h4>


                                    <h2>URL GET Parameters</h2>

                                    <h4 className="text-danger">(Currently does not work with extra params)</h4>

                                    <ApiParam 
                                        name="limit"
                                        optional="optional"
                                        description="An integer that represents the maximum amount of objects to return."
                                        example="&limit=10"
                                    />

                                    <ApiParam 
                                        name="search"
                                        optional="optional"
                                        description="A string to search the database for. Must be used with searchColumn parameter."
                                        example="&search=1552601970"
                                    />

                                    <ApiParam 
                                        name="searchColumn"
                                        optional="optional"
                                        description="A string representing a column to search. Must be used with search parameter."
                                        example="&searchColumn=created_at"
                                    />

                                    <ApiParam 
                                        name="order"
                                        optional="optional"
                                        description="Either 'ASC' or 'DESC', tells the database in which order to sort the data it returns. Must be used with orderColumn."
                                        example="&order=DESC"
                                    />                                
                                
                                    <ApiParam 
                                        name="orderColumn"
                                        optional="optional"
                                        description="A string representing the column name to order results by. Must be used with order."
                                        example="&orderColumn=id"
                                    />

                                </div>

                                <div className="col l6 m12 s12 code">

<ApiCodeBox
name="Example Request"
code={`
var result = await Axios({
    method: "get",
    url: "/api/users/get/all",   
})

result = result.data;
`}
id=""
/>

<ApiCodeBox
name="Example Response"
code=""
id="api-get-all"
/>
                           
                        
                                </div>
                            </div>

                            <div className="row api-section flex">
                                <div className="col l6 m12 documentation">

                                    <h2 className="route-name">Get A Single <span className="text-capitalize">{this.state.tableSingular}</span></h2>
                                    <p className="description">Returns a {this.state.table} with the id provided.</p>
                                    <h4 className="endpoint"><span className="text-success">GET</span> http://localhost:3000/api/{this.state.table}/get/<span className="text-info">{`<id>`}</span></h4>

                                    <h2>URL Parameters</h2>

                                    <ApiParam 
                                        name="id"
                                        optional="required"
                                        description={"The id of the "+this.state.tableSingular+" to return"}
                                        example="1"
                                    />

                                </div>

                                <div className="col l6 m12 s12 code">

<ApiCodeBox
name="Example Request"
code={`
var result = await Axios({
    method:'get',
    url:'/api/${this.state.table}/get/<id>',   
})

result = result.data;
`}
id=""
/>

<ApiCodeBox
name="Example Response"
code=""
id="api-get-one"
/>
                           
                                
                                </div>
                            </div>

                            <div className="row api-section flex">
                                <div className="col l6 m12 documentation">

                                    <h2 className="route-name">Delete <span className="text-capitalize">{this.state.tableSingular}</span></h2>
                                    <p className="description">Deletes a {this.state.tableSingular} user from the system. "id" is the id of the {this.state.tableSingular} you wish to delete.</p>
                                    <h4 className="endpoint"><span className="text-danger">POST </span> http://localhost:3000/api/{this.state.table}/delete/<span className="text-info">{`<id>`}</span></h4>

                                    <h2>URL Parameters</h2>

                                    <ApiParam 
                                        name="id"
                                        optional="required"
                                        description={"The id of the "+this.state.tableSingular+" to delete"}
                                        example="1"
                                    />

                                

                                </div>

                                <div className="col l6 m12 s12 code">

<ApiCodeBox
name="Example Request"
code={`
var result = await Axios({
    method:'post',
    url:'/api/${this.state.table}/delete/<id>',   
})

result = result.data;
`}
id=""
/>
<ApiCodeBox
name="Example Response On Success"
code={`
{
    success: true,
    message: 'Successfully deleted.'
}
`}
id=""
/>

<ApiCodeBox
name="Example Response On Failure"
code={`
{
    success: false,
    message: 'Nothing was deleted.'
}
`}
id=""
/>
                           
                        
                                </div>
                            </div>


                            <div className="row api-section flex">
                                <div className="col l6 m12 documentation">
                                    <h2 className="route-name">Create A <span className="text-capitalize"> {this.state.tableSingular}</span></h2>
                                    <p className="description">Adds a new {this.state.tableSingular} to the database.</p>
                                    <h4 className="endpoint"><span className="text-danger">POST </span> http://localhost:3000/api/{this.state.table}/create</h4>

                                
                                    <h2><span className="text-capitalize">{this.state.tableSingular}</span> Properties That Can Be Set</h2>

                                    {this.state.columnsCanBeSet.map((column, index) => {
                                        return (
                                            <ApiArgument
                                                key={index}
                                                name={column.column_name}
                                                is_nullable={column.is_nullable}
                                                dataType={column.data_type}
                                            />
                                        )
                                    })}

                                    

                                
                                </div>
                                <div className="col l6 m12 s12 code">

                           
<ApiCodeBox
name="Example Request"
code={`
var result = await Axios({
    method: 'post',
    url: '/api/${this.state.table}/create',
    data: {        
        <object properties>
    }
})

result = result.data;
`}
id=""
/>
                               





                                    <ApiCodeBox
                                        name="Example Response"
                                        code=""
                                        id="api-create"
                                    />
                                
                                </div>
                            </div>


                            <div className="row api-section flex">
                                <div className="col l6 m12 documentation">
                                
                                    <h2 className="route-name">Update A <span className="text-capitalize"> {this.state.tableSingular}</span></h2>
                                    <p className="description">Updates an existing {this.state.tableSingular} in the database.</p>
                                    <h4 className="endpoint"><span className="text-danger">POST </span>  http://localhost:3000/api/{this.state.table}/update/<span className="text-info">{`<id>`}</span></h4>

                                    <h2> <span className="text-capitalize">{this.state.tableSingular}</span> Properties That Can Be Updated</h2>

                                    {this.state.columnsCanBeSet.map((column, index) => {
                                        return (

                                            <ApiArgument
                                                key={index}
                                                name={column.column_name}
                                                is_nullable={column.is_nullable}
                                                dataType={column.data_type}
                                            />
                            
                                        )
                                    })}

                                    

                                
                                </div>
                                <div className="col l6 m12 s12 code">
                            
                           
<ApiCodeBox
name="Example Update Request"
code={
`var result = await Axios({
    method: 'post',
    url: '/api/${this.state.table}/update/<id>', 
    data: {        
        <object properties>
    }
})

result = result.data;
`}
id=""
/>
      
         

                                    <ApiCodeBox
                                        name="Example Response"
                                        code=""
                                        id="api-update"
                                    />
                                
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

      tables: state.db.tables,
     
      
    };
  };


const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),

        
    };
};

  export default connect( mapStateToProps, mapDispatchToProps )(DevApi);  
  

