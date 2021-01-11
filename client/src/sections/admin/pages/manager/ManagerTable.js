/*
Documentation

This page takes our paginated table and expands upon its idea's to create a visual postgress database

*/


import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Axios from 'axios';

import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import {Paginate} from '../../../../functions/tables/paginate';

import {createNotificationStandard} from '../../../../functions/misc/notifications';

import {onCreateDeleteModal} from '../../../../functions/misc/modals'
import AuxWrapper from '../../../../globalComponents/AuxWrapper';

import {  getSearchArray, getSearchPlaceholder } from './search';

class DbResults extends Component {

    state = {
        tableSchema: '',
        action_object: {},
        action: '',
        showSlider: false,

        filter: '',
        searchPlaceholder: 'Search Table',
        possibleFilters: ['id'],

        dataToShow: ''

    }

    paginate = '';


   

    setData = async () => {
        //get the current table information
        try {

            const table_name = this.props.match.params.table;

            let found_table = await Axios({
                method: 'get',
                url: '/api/' + table_name + '/get/all'
            })

            found_table = found_table.data


            const possibleFilters = getSearchArray(found_table[0])
            const searchPlaceholder = getSearchPlaceholder(possibleFilters);

            const paginate = new Paginate({
                show: 15,
                offset: 0
            }, found_table);

            //run the paginate class
            let dataSet = paginate.run();

            dataSet = dataSet.data;

            this.paginate = paginate;

            this.paginate.possibleFilters = possibleFilters;
            
            this.setState({dataToShow: dataSet})
            this.setState({found_table: dataSet,  possibleFilters, searchPlaceholder})

        } catch (e) {

            console.log('Error ', e)

        }

    }


    /********************************* *
    ***********************************
    ***********************************
    Specific To THis page
    ***********************************
    ***********************************
    ***********************************
    /**********************************/

   passesCheck = () => {

        let passesCheck = true;

        this.props.table_schema.find(tableToFind => tableToFind.name === this.props.match.params.table).columns.forEach((column) => {
                
            const colName = column.name;
            
            if(column.is_nullable === 'NO') {
                if(colName !== 'id' && colName !== 'createdAt' && colName !== 'created_at' && colName !== 'updatedAt' && colName !== 'updated_at') {

                    if(this.state.action_object[colName] !== '') {
                        passesCheck = false;
                    }
                    
                }   
            }

        })

        return passesCheck;

    }

    onCopy = async () => {

        if(this.passesCheck()) {
            try {
                await Axios({
                    method:'post',
                    url:'/api/' + this.props.match.params.table + '/create',
                    data: {
                        ...this.state.action_object,
                        id: ''
                    }
                })
    
                this.toggleActionSlider('', '');
    
                this.setData();
    
                createNotificationStandard('Success', '<span class="text-success">Entry Was Copied</span>', 2000);
            
            } catch(e) {
            
                console.log('Error ', e.message)
                createNotificationStandard('Error', '<span class="text-danger">Something went wrong copying the entry.</span>', 2000);
    
            }
        } else {
            createNotificationStandard('Whoops!', '<span class="text-danger">Make sure all required fields are filled out before copying this entry.</span>', 2000);
        }
        
    }

    onAdd = async () => {


            


        if(this.passesCheck()) {
            try {
                await Axios({
                    method:'post',
                    url:'/api/' + this.props.match.params.table + '/create',
                    data: {
                        ...this.state.action_object,
                        id: ''
                    }
                })
    
                this.toggleActionSlider('', '');
    
                this.setData();
    
                createNotificationStandard('Success', '<span class="text-success">Entry Was Added</span>', 2000);
            
            } catch(e) {
            
                console.log('Error ', e.message)
                createNotificationStandard('Error', '<span class="text-danger">Something went wrong adding the entry.</span>', 2000);
    
            }
        } else {
            createNotificationStandard('Whoops!', '<span class="text-danger">Make sure all required fields are filled out before adding this entry.</span>', 2000);
        }
        
    }

    onEdit = async () => {

        if(this.passesCheck()) {

            try {
                await Axios({
                    method:'post',
                    url:'/api/' + this.props.match.params.table + '/update/' + this.state.action_object.id,
                    data: {
                    ...this.state.action_object,
                    }
                })

                this.toggleActionSlider('', '');

                this.setData();

                createNotificationStandard('Success', '<span class="text-success">Entry Was Updated!</span>', 2000);
                
            } catch(e) {
                
                console.log('Error ', e.message)
                createNotificationStandard('Error', '<span class="text-danger">Something went wrong editing the entry.</span>', 2000);

            }

        } else {
            createNotificationStandard('Whoops!', '<span class="text-danger">Make sure all required fields are filled out before editing this entry.</span>', 2000);
        }
    }

    onInputChange = (name) => object => {

        //get the value of the changed input
        let value = object.target.value;

        //create a new object with it
        let updatedObject = Object.assign({}, this.state.action_object);
        updatedObject[name] = value;

        //update state
        this.setState({action_object: updatedObject});

    }

    getFriendlyRequiredName(column) {


        if (column.name === 'id' || column.data_type === 'timestamp with time zone' || column.name === 'created_at' || column.name === 'updated_at') {
            return '-'
        }

        if (column.is_nullable === 'YES') {
            return <span className="text-ino">no</span>
        } else {
            return <span className="text-success">YES</span>
        }

    }

    getFriendlyColumnName(column) {

        column = column.replace(/_/g, " ");
        column = column.replace(/([a-z])([A-Z])/g, '$1 $2');

        return <span className="text-capitalize">{column}</span>;

    }

    getFriendlyDataName(column) {

        let string = '';

        if (column.name === 'id') {
            return '-';
        }

        if (column.data_type === 'character varying') {
            string = <span className="text-sccess">text</span>;
        } else if (column.data_type === 'boolean') {
            string = <span className="text-ifo">true / false</span>
        } else if (column.data_type === 'integer') {
            string = <span className="text-waring">integer</span>
        } else if (column.data_type === 'timestamp with time zone') {
            string = <span className="text-priary">date</span>
        }

        return string
    }

    getInputType(column) {

        // return <input value="hasdfasdfasf" />

        let input = '';

        if (column.name === 'id' || column.data_type === 'timestamp with time zone' || column.name === 'created_at' || column.name === 'updated_at' || column.name === 'lastLoginUnix') {
            return <p>{this.state.action_object[column.name]}</p>
        }

        if (column.data_type === 'character varying') {
            input = <textarea
                onChange={this.onInputChange(column.name)}
                value={this.state.action_object[column.name] || ''}></textarea>;
        } else if (column.data_type === 'boolean') {
            input = <select
                onChange={this.onInputChange(column.name)}
                value={this.state.action_object[column.name] || ''}>
                <option value="false">False</option>
                <option value="true">True</option>
            </select>;
        } else if (column.data_type === 'integer') {
            input = <input
                onChange={this.onInputChange(column.name)}
                type="number"
                value={this.state.action_object[column.name] || ''}/>;
        }

        return input;

    }

    toggleActionSlider(actionObjectId, action) {

        let action_object = '';

        if(actionObjectId) {
            action_object = this
            .state
            .found_table
            .find(object => object.id === actionObjectId);

        }

        this.setState({
            showSlider: !this.state.showSlider,
            action,
            action_object
        })
    }


    onDelete = async(id) => {

        /*
        Documentation
        this function removes an expectation
        onSuccess removes the deleted row from our table
        it does not affect the dom to increase load times so under the onCreateDeleteModal we simply hide the row
        this allows us to delete with what looks like 0 load time
        */

        onCreateDeleteModal({
            textHeadline: 'Delete Object ID: <span className="text-danger">' + id + '</span>',
            textSub: 'Are you sure you wish to delete this ' + this.props.match.params.table + ' object from the system? This cannot be undone.',
            urlToDelete: '/api/' + this.props.match.params.table + '/delete/' + id,
            rowIdToRemove: 'id_row_' + id,
            onSuccess: () => {

               this.setData();



                createNotificationStandard('Success', '<span class="text-success">Successfully deleted ' + this.props.match.params.table + ' object: ' + id + ' </span>', 2000);

            },
            onFailure: () => {

                createNotificationStandard('Error', '<span class="text-danger">Something went wrong deleting entry.</span>', 2000);

            }
        })

    }

     //set results on open
     async componentDidMount() {

        

        //if we dont have our database schema fetch it
        if (!this.props.table_schema) {
            try {
                const tableSchema = await Axios({method: 'get', url: '/api/manager/table_schema'})

            

                //send action to set active sidebar tab
                this.props.SET_SIDEBAR_HIGHLIGHT({tab: '/admin/manager', drop: ''})

                this.props.SET_MANAGER_SCHEMA(tableSchema.data)

            } catch (e) {

                console.log('Error ', e)

            }
        }

       this.setData();

    }

    render() {


        return (!this.state.dataToShow || !this.props.table_schema
            ? ''
            : <div className="aos__manager">

                <div className="page-top">

                    <div className="navigation">
                        <Link to="/admin/manager"> <i className="material-icons">arrow_back</i> Manager</Link>
                        <button className="btn btn-success" onClick={() => this.toggleActionSlider('', 'add')}>Add Entry</button>
                    </div>
                    <h2 className="title">Admin Manager</h2>
                    <p>Total Entries: {this
                            .props
                            .table_schema
                            .find(tableToFind => tableToFind.name === this.props.match.params.table)
                            .rowCount}</p>

                </div>

                <div className="content">
                    <div className="content-raised">



                        <div className="card-table">

                            <div className="table-wrapper">

                            <div className="table-header">
                                <div className="header-left">
                                    <h4 className="title">{this.getFriendlyColumnName(this.props.match.params.table)} Table</h4>
                                </div>
                                <div className="header-right">
                                    <input className="search" type="text" placeholder={this.state.searchPlaceholder} value={this.state.filter} onChange={(e) => this.paginate.search(e, '', this)} />
                                </div>
                            </div>

                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Actions</th>
                                                {this
                                                    .props
                                                    .table_schema
                                                    .find(tableToFind => tableToFind.name === this.props.match.params.table)
                                                    .columns
                                                    .map((column, index) => {
                                                        return (
                                                              
                                                                <th 
                                                                    key={"header_" + index} 
                                                                    className={this.paginate.getHeadClassName(column.name)} 
                                                                    // onClick={() => this.onSort(column.name)}
                                                                    onClick={() => this.paginate.sort(column.name, this)}
                                                                >
                                                                    {column.name}
                                                                </th>
                                                        )
                                                    })}
                                            </tr>

                                        </thead>
                                        <tbody>

                                            {this.state.dataToShow.map((table, index) => {
                                                    return (
                                                        <tr id={"id_row_" + table.id} key={table.id}>
                                                            <td>
                                                                <i 
                                                                    className="material-icons text-success"
                                                                    onClick={() => this.toggleActionSlider(table.id, 'edit')}
                                                                >edit</i>
                                                                <i
                                                                    className="material-icons text-info"
                                                                    onClick={() => this.toggleActionSlider(table.id, 'copy')}>file_copy</i>
                                                                <i
                                                                    className="material-icons text-danger"
                                                                    onClick={() => {
                                                                    this.onDelete(table.id)
                                                                }}>delete</i>
                                                            </td>
                                                            {this
                                                                .props
                                                                .table_schema
                                                                .find(tableToFind => tableToFind.name === this.props.match.params.table)
                                                                .columns
                                                                .map((column, index) => {
                                                                    return (
                                                                        <AuxWrapper key={index}>
                                                                            <td>{table[column.name] !== null && table[column.name].length > 75
                                                                                    ? table[column.name].slice(0, 75)
                                                                                    : table[column.name]}</td>
                                                                        </AuxWrapper>
                                                                    )
                                                                })}
                                                        </tr>

                                                    )
                                                })}

                                        </tbody>
                                    </table>

                                </div>

                                <div className="text-right table-footer">

                                    <p className="left">Showing {this.paginate.currentEntry} - {this.paginate.currentEntryEnd} of {this.paginate.dataCount}</p>

                                    <button
                                        className={this.paginate.hasPrevious
                                        ? 'btn btn-pagination btn-prev'
                                        : 'btn btn-pagination btn-prev disabled'}
                                        onClick={() => this.paginate.paginatePrevious(this)}>
                                        Previous
                                    </button>
                                    <button
                                        className={this.paginate.hasNext
                                        ? 'btn btn-pagination btn-prev'
                                        : 'btn btn-pagination btn-prev disabled'}
                                        onClick={() => this.paginate.paginateNext(this)}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div
                    className={this.state.showSlider
                    ? 'action-slider show'
                    : 'action-slider'}>

                    <div className="blackout" onClick={() => this.toggleActionSlider()}></div>

                    <div className="wrapper">

                        <h2 className="title">
                            {this.state.action === 'copy'
                                ? <span>Copying {this.getFriendlyColumnName(this.props.match.params.table)} Entry: {this.state.action_object.id}</span>
                                : ''}
                                {this.state.action === 'edit'
                                ? <span>Editing {this.getFriendlyColumnName(this.props.match.params.table)} Entry: {this.state.action_object.id}</span>
                                : ''}
                                {this.state.action === 'add'
                                ? <span>Adding New {this.getFriendlyColumnName(this.props.match.params.table)} Entry</span>
                                : ''}
                                
                        </h2>
                        <p className="text-success sub-title">Click any value to change it.</p>

                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Required</th>
                                        <th>Type</th>
                                        <th>Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // this.state.action_object ? 
                                            this
                                            .props
                                            .table_schema
                                            .find(tableToFind => tableToFind.name === this.props.match.params.table)
                                            .columns
                                            .map((column, index) => {
                                                return (
                                                    <tr className="tr" key={index}>

                                                        <td>{this.getFriendlyColumnName(column.name)}</td>
                                                        <td>{this.getFriendlyRequiredName(column)}</td>
                                                        <td>{this.getFriendlyDataName(column)}{column.character_max_length
                                                                ? "(" + column.character_max_length + ")"
                                                                : ''}</td>
                                                        <td>{this.getInputType(column)}</td>

                                                    </tr>
                                                )
                                            })
                                        // : ''
                                        }
                                </tbody>
                            </table>
                        </div>

                        <div className="text-right action-button">
                            {this.state.action === 'copy'
                                ? (
                                    <button onClick={() => this.onCopy()} className="btn btn-success">Copy Entry</button>
                                )
                                : ''}

                            {this.state.action === 'edit'
                                ? (
                                    <button onClick={() => this.onEdit()} className="btn btn-success">Update Entry</button>
                                )
                                : ''}
                                {this.state.action === 'add'
                                ? (
                                    <button onClick={() => this.onAdd()} className="btn btn-success">Add Entry</button>
                                )
                                : ''}
                        </div>

                    </div>
                </div>

            </div>)
    }

};

const mapStateToProps = state => {
    return {table_schema: state.manager.schema};
};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) => dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings}),
        SET_MANAGER_SCHEMA: (schema) => dispatch({type: actionTypes.SET_MANAGER_SCHEMA, payload: {
                schema
            }})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DbResults);
