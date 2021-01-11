import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ResultsTables = (props) => {


    if(props.table === 'users') {
        
        return (

            <table className="table" >
                <thead>
                    <tr>
                        <td className="check-td"><input className="check" type="checkbox" /></td>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {(props.objects.length) ? props.objects.map((object, index) => {

                    return (
                        <tr id={"id_row_" + object.id} key={index}>
                            <td><input className="check" type="checkbox" /></td>
                            <td> <img src={object.picture_url} />  </td>
                            <td> {(object.family_name) ? object.givenName + ' ' + object.family_name : object.name}  </td>
                            <td> {object.email}</td>
                            <td> {object.phone}</td>
                            <td> {object.id}</td>
                            <td>
                                <Link 
                                    to={"/admin/db/table/"+props.table+"/" + object.id} 
                                    className="btn btn-success" 
                                    style={{marginRight: 10}}>
                                    View
                                </Link>
                                <button 
                                onClick={() => props.onConfirmDelete(object.id, object.id)} 
                                className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )


                    }) : (<tr><td></td><td>You Dont Have Any Data In This Table</td><td></td><td></td><td></td><td></td></tr>)}
                    
                </tbody>
            </table>

        )

    } else {

        return (
        
            <table className="table" >
                <thead>
                    <tr>
                        <td className="check-td"><input className="check" type="checkbox" /></td>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Updated At</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {(props.objects.length) ? props.objects.map((object, index) => {

                    return (
                        <tr id={"id_row_" + object.id} key={index}>
                            <td><input className="check" type="checkbox" /></td>
                            <td> {object.id}  </td>
                            <td> {(object.family_name) ? object.givenName + ' ' + object.family_name : object.name}  </td>
                            <td> {moment.unix(object.updated_at).format("MM/DD/YYYY hh:mm A")}</td>
                            <td> {moment.unix(object.created_at).format("MM/DD/YYYY hh:mm A")}</td>
                            <td>
                                <Link 
                                    to={"/admin/db/table/"+props.table+"/" + object.id} 
                                    className="btn btn-success" 
                                    style={{marginRight: 10}}>
                                    View
                                </Link>
                                <button 
                                onClick={() => props.onConfirmDelete(object.id, object.id)} 
                                className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )


                    }) : (<tr><td></td><td>You Dont Have Any Data In This Table</td><td></td><td></td><td></td><td></td></tr>)}
                    
                </tbody>
            </table>

        )

    }

}

export default ResultsTables;