/*
Documentation

This file holds all the back end calls for users in the site making it easier

*/


import Axios from 'axios';


/*
Documentation

return a a user if they are logged in or nothing if they are not

*/
export function getCurrentUser() {
    //create promis to return updated user
    return new Promise( async (resolve, reject) => {


        try {
            const currentUser = await Axios({
              method:'get',
              url:'/api/current_user',
 
            })

            if(currentUser) {
                //return the updated user object
                resolve(currentUser.data)
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


//return if a deal is favorited for a user
export function updateUser(user) {
    //create promis to return updated user
    return new Promise( async (resolve, reject) => {


        //make sure we have a user id to give back
        if(!user.id) {
            resolve({success: false, payload: '', message: 'no user id was passed to update function'});
            return false;
        }

        try {
            const updatedUser = await Axios({
              method:'post',
              url:'/api/users/update/' + user.id,
              data: {
                ...user
              }
            })
            //return the updated user object
            resolve({success: true, payload: updatedUser.data, message: ''})
          
          } catch(e) {
          
            console.log('Error ', e)
            resolve({success: false, payload: '', message: 'error updating user'});
          
          }
    

     })

}

//gets all users

export function getUsers() {
  //create promis to return updated user
  return new Promise( async (resolve, reject) => {




      try {
          const foundUsers = await Axios({
            method:'get',
            url:'/api/users/get/all',

          })
          //return the updated user object
          resolve({success: true, payload: foundUsers.data, message: ''})
        
        } catch(e) {
        
          console.log('Error ', e)
          resolve({success: false, payload: '', message: 'error updating user'});
        
        }
  

   })

}

//get one user

export function getUser(id) {
  //create promis to return updated user
  return new Promise( async (resolve, reject) => {




      try {
          const foundUser = await Axios({
            method:'get',
            url:'/api/users/get/' + id,

          })
          //return the updated user object
          resolve({success: true, payload: foundUser.data, message: ''})
        
        } catch(e) {
        
          console.log('Error ', e)
          resolve({success: false, payload: '', message: 'error finding user'});
        
        }
  

   })

}