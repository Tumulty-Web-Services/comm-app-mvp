/*
Documentation

this file handles the creation of notifications
by default all notifications appear on the top right hand corner of the screen
css values can be changed in /assets/cssapp.scss

*/

// import { CriticalError } from './errorLogging';

//create holder for appending a notification to the dom
export function createNotificationHolder() {
    var createNotificationHolder = document.createElement('div');
    createNotificationHolder.id = "aos__notificationHolder";
    document.body.appendChild(createNotificationHolder);
}

const CriticalError = '';


/************************************************************************************
Documentation

creates a simple notification to be displayed
title is the notification title
text is the notification text
time till removed is time in milliseconds till we remove the notification | optional

ex use:
createNotificationStandard('<span class="text-success">Update Was Successful!</span>','Something goes here and maybe even more text', 1000)

*************************************************************************************/
export function createNotificationStandard(title, text, timeTillRemoved) {

    if(!title) {
        CriticalError('You must pass a title param to create notification.');
        return false;
    }

    if(!text) {
        CriticalError('You must pass a text param to create notification.');
        return false;
    }

    timeTillRemoved = timeTillRemoved || '';

    //create notification holder if it does not exist
    if(!document.getElementById('aos__notificationHolder')) {
        //create holder for appending div
        var divHolder = document.createElement('div');
        divHolder.id = "aos__notificationHolder";
        document.body.appendChild(divHolder);
    }

    //get timestamp to identify notfication for deletion
    const timestamp = Date.now();

    //create the notification
    let notification = '';
    
    notification += ' <h6 class="aos__notificationTitle">'+title+'</h6>'
    notification += ' <p class="aos__notificationText">'+text+'</p>'
    notification += ' <button type="button" class="aos__notificationRemove"><i class="material-icons">clear</i></button>'


   //create a notification wrapper as a div
   var newNotificationWrapper = document.createElement('div');
   //set its data-identifier attribute
   newNotificationWrapper.setAttribute('data-identifier', 'aos__notificationIdentifier'+timestamp);
   //add the correct class
   newNotificationWrapper.classList.add('aos__notification')

   //set the correct new notificaiton html
   newNotificationWrapper.innerHTML = notification;

   //append the new notification the the notification holder
   const holder = document.getElementById('aos__notificationHolder');
   holder.appendChild(newNotificationWrapper)

   //get the newly created notification
   const createdNotification = document.querySelectorAll('[data-identifier="aos__notificationIdentifier'+timestamp+'"]')[0]

    //wait for dom to mount and then create animation to open notification
    setTimeout(function() {
        createdNotification.classList.add('open');
    }, 50)

    //set timeout if one was passed
    if(typeof timeTillRemoved === 'number') {
        setNotificationTimeout(timeTillRemoved, timestamp)
    }

    //set listener to remove a notification on click
    document.querySelectorAll('[data-identifier="aos__notificationIdentifier'+timestamp+'"] > .aos__notificationRemove')[0].addEventListener("click", function() {
        destroyNotification(this.parentNode)
    });

}

/*
Documentation
this function sets a timeout to remove a notification based on a timestamp
allowing for multiple notifications to be shown
*/
function setNotificationTimeout(timeTillRemove, timestamp) {

    setTimeout(function() {

        //notification may not exist if its been erased

        let notification = '';

        try {
            notification = document.querySelectorAll('[data-identifier="aos__notificationIdentifier'+timestamp+'"]');
        } catch(e) {

        }
        

        if(notification && notification.length) {
            destroyNotification(notification)
        }
       

    }, timeTillRemove)

}


/************************************************************************************ 
Documentation

removes the div with the id of #aos__notificationHolder
removes a notification

*********************************************************************************** */



export function destroyNotification(notification) {
    console.log(notification)

    //if passed in by setTimeout
    if(notification[0]) {

        notification[0].classList.remove('open');
        setTimeout(function() {

            let parentNode = '';
            
            //parent node may not exist if manually deleted
            try {
                parentNode = notification[0].parentNode;
            } catch(e) {

            }

            if(parentNode) {
                parentNode.removeChild(notification[0]);
            }
            
        }, 1000)
    } else {

        //if passed in by click listener
        try {

            notification.classList.remove('open');

            setTimeout(function() {
                const parentNode = notification.parentNode;
    
                parentNode.removeChild(notification);
            }, 1000)

        } catch(e) {
            console.log(e)
        }
    }
       
}


