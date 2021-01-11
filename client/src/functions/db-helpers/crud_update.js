import Axios from 'axios';
import { CriticalError } from '../misc/errorLogging';


/*
Documentation

Updates a db table
table is the exact name of the table, id is an object representing the values to update. 
data have an id property associated as this is what gets passed in for us to find ex: id: 123.

*/
export function crud_update(table, data) {
    //create promis to return updated user
    return new Promise( async (resolve, reject) => {

        if(!data._id) {
            CriticalError('crud_update function requires that an id property is passed in. ex: {_id: _123}');
            reject({error: 'No id was sent to crud_update'})
        }

        console.log(data)


        try {
            const updated = await Axios({
              method:'post',
              url:'/api/'+table+'/update/' + data._id,
              data: {
                  ...data
              }
            })

            if(updated) {
                //return the updated user object
                resolve(updated.data)
            } else {
                //return blank
                resolve({})
            }
           
          
          } catch(error) {

            if (error.response) {
   
                reject(error.response.data)
                
              } 
          
          
            reject(error)
            // console.log('Error ', e)
            // reject({success: false, payload: '', message: e});
          
          }

    })

}

/*
Documentation

creates an object inside a db table
table is the exact name of the table, id is an object representing the values to update. 
data is the values that you wish to create on this object ex:

data = {
    family_name: 'Doe',
    givenName: 'John',
    phone: 1234567899,
    etc....
}

*/

export function crud_create(table, data) {
    //create promis to return updated user
    return new Promise( async (resolve, reject) => {


        try {
            const created = await Axios({
              method:'post',
              url:'/api/'+table+'/create/',
              data: {
                  ...data
              }
            })

            if(created) {
                //return the created user object
                resolve(created.data)
            } else {
                //return blank
                resolve({})
            }
           
          
          } catch(e) {
          
            console.log('Error ', e)
            resolve({success: false, payload: '', message: 'Error fetching user.'});
          
          }

    })

}

/*
Documentation

deletes an object inside a db table
table is the exact name of the table, id is an object representing the values to update. 
id is the id of the table object you wish to delete

*/

export function crud_delete(table, id) {
    //create promis to return updated user
    return new Promise( async (resolve, reject) => {


        try {
            const deleted = await Axios({
              method:'post',
              url:'/api/'+table+'/delete/' + id,

            })

            if(deleted) {
                //return the deleted user object
                resolve(deleted.data)
            } else {
                //return blank
                resolve({})
            }
           
          
          } catch(e) {
          
            console.log('Error ', e)
            resolve({success: false, payload: '', message: 'Error fetching user.'});
          
          }

    })

}