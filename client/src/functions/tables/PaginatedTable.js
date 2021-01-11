import React, {Component} from 'react';


import {connect} from 'react-redux';


import {Paginate} from './paginate';
import { CriticalError } from '../../functions/misc/errorLogging';
import AuxWrapper from '../../globalComponents/AuxWrapper';

class DevSystemLogs extends Component {

    state = {

        paginate: '',
        filter: ''
    }

    /*
    Documentation

    paginate next adds settings.show to the data to be shown
    returns updated paginate class
    */
    paginateNext() {

       
        const dataSet = this.state.paginate.paginateNext(this);


        
        this.setState({data: dataSet.data})

    }

    /*
    Documentation

    paginate next subtracts settings.show to the data to be shown
    returns updated paginate class
    */
    paginatePrevious() {

        const dataSet = this.state.paginate.paginatePrevious(this);
        this.setState({data: dataSet.data})

    }

    createTable(props) {


         /*
         Documentation
 
         paginate class takes settings as first settings and data as the second
 
         show is the number of entries from the array to show
         offset is the offset we are starting at. normally 0
         */
         const paginate = new Paginate({
             show: props.table.settings.rows,
             offset: 0
         }, props.data);
 
         //run the paginate class
         const dataSet = paginate.run();
 
         this.setState({data: dataSet.data, paginate})

    }

    componentWillReceiveProps(nextProps) {
        this.createTable(nextProps)
    }

    async componentDidMount() {
        this.createTable(this.props)
    }

    search = (e) => {

        /*
        Documentation
        This function takes a callback to sort the data
        */

        if(this.props.table.search) {

            const filter = e.target.value;

            const dataSet = this.state.paginate.runFilter((e) => {
                return this.props.table.search(e, filter)
            })
    
            const data = dataSet.data
    
    
            this.setState({ filter, data })

        } else {

            CriticalError('A Paginated was search but no search function was passed.')

        }


    }
  

    createTableHead(props) {

        //if we have the props we need
        if(props.table.body) {

            const body = props.table.body

            //loop through object keys
           const x = Object.keys(body).map(function(key, index) {
                return  <th key={index}>{key.replace(/_/g, ' ')}</th>
            });

            return x
        }

        return '';

    }

    createTableBody(props) {

        //if we have the props we need
        if(props.table.body) {

            const body = props.table.body

            if(this.state.data && this.state.data[0]) {
                    return this.state.data.map((data, index) => {
                        return (
                                <tr key={index}> 
                                    {
                                        Object.keys(body).map(function(key, index) {
                                            return  <td key={index}>{props.table.body[key](data)}</td>
                            
                                        })
                                    }
                            </tr>
        
                        )
                    })
    
                
            } else {

                return <tr>
                {
                    Object.keys(body).map(function(key, index) {

                        return  <td key={index}>{index === 0 ? 'There is no information to show yet.' : ''}</td>

                    })
                }
            </tr>
            }

             
                


        }

        return '';

    }

    render() {

        return (

            <AuxWrapper>

                <div className="table-wrapper">

                    <div className="table-header">
                        <div className="header-left">
                            <h4 className="title">{this.props.table.header.title}</h4>
                        </div>
                        {this.props.table.settings.showSearch ? <div className="header-right">
                            <input className="search" type="text" placeholder="Search Table" value={this.state.filter} onChange={(e) => this.search(e)} />
                        </div> : ''}
                    </div> 

                    <div className="table-responsive">
                        <table className="table ">
                            <thead>
                                <tr>

                                {this.createTableHead(this.props)}
                                   
                                </tr>
                            </thead>
                            <tbody>{this.createTableBody(this.props)}</tbody>
                        </table>
                    </div>

                    <div className="text-right table-footer">

                        {this.props.table.settings.showCount ? <p className="left">Showing {this.state.paginate.currentEntry} - {this.state.paginate.currentEntryEnd} of {this.state.paginate.dataCount}</p> : ''}

                        <button
                            className={this.state.paginate.hasPrevious
                            ? 'btn btn-pagination btn-prev'
                            : 'btn btn-pagination btn-prev disabled'}
                            onClick={() => this.paginatePrevious()}>
                            Previous
                        </button>
                        <button
                            className={this.state.paginate.hasNext
                            ? 'btn btn-pagination btn-prev'
                            : 'btn btn-pagination btn-prev disabled'}
                            onClick={() => this.paginateNext()}>
                            Next
                        </button>
                    </div>
                </div>

            </AuxWrapper>

        )
    }

};

const mapDispatchToProps = dispatch => {
    return {

       
    };
};

export default connect('', mapDispatchToProps)(DevSystemLogs);
