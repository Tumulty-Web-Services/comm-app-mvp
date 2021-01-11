
// import io from 'socket.io-client';
// import { createNotificationStandard } from '../functions/misc/notifications';

// import { refreshSystemLogs  } from '../store/reducers/systemLogReducer';
// import { refreshSupportTickets } from '../store/reducers/supportTicketsReducer';
// import { refreshSystemPayments } from '../store/reducers/paymentsReducer';
// import { refreshSystemComments } from '../store/reducers/commentsReducer';
// import { refreshSystemUsers } from '../store/reducers/userReducer';
// import { refreshDbTables } from '../store/reducers/dbReducer';
// import { refreshSystemModules } from '../store/reducers/moduleReducer';

// import store  from '../index';

// const socket = io('http://localhost:4000');

// // const state = store.getState();
// let state = '';
// let userIsAdmin = false;

// //set user data based on current state
// function refreshUser(state) {
    
//     if(state.user) {
//         if(state.user.user) {
//             if(state.user.user.is_admin) {
//                 userIsAdmin = true;
//             }
//         }
//     }

// }

// /*
// Documentation
// Connections
// */



// socket.on('new connection', () => {
//     console.log('new user')

//     state = store.getState();
//     refreshUser(state);
    

// })

// /*
// Documentation
// Admin Redux Action
// */




// /*
// Documentation

// Admin Redux Settings

// */

// //this should send a notification to all system admins that a new log was created
// // will refresh admin redux settings
// export function ADMIN_refreshSystemLogs() {
//     socket.emit('refreshSystemLogs'); 
// }

// //refresh system logs if user is an admin
// socket.on('refreshSystemLogs', () => {
   
//     //only set system logs for admins
//     if(userIsAdmin) {
       
//         createNotificationStandard('<span class="text-danger">System Alert</span>', 'A new system log was created.')

        

//         refreshSystemLogs();

//         console.log('herere')
//         // window.location.replace("http://www.w3schools.com");
//         // window.location.href
//         // window.location.href = "/admin/payments";


//     }

// });


// //this should send a notification to all system admins that a new support ticket was created
// // will refresh admin redux settings
// export function ADMIN_refreshSupportTickets() {
//     socket.emit('refreshSupportTickets'); 
// }
// socket.on('refreshSupportTickets', () => {
//     if(userIsAdmin) {
       
//         createNotificationStandard('<span class="text-warning">New Notification</span>', 'You have a new support ticket.', 3000)

//         refreshSupportTickets();
//     }
    

// });



// socket.on('refreshSystemPayments', () => {
//     refreshSystemPayments();
//     console.log('refreshSystemPayments')

// });


// socket.on('refreshSystemComments', () => {
//     refreshSystemComments();
//     console.log('refreshSystemComments')

// });
// socket.on('refreshSystemUsers', () => {
//     refreshSystemUsers();
//     console.log('refreshSystemUsers')

// });
// socket.on('refreshDbTables', () => {
//     refreshDbTables();
//     console.log('refreshDbTables')

// });
// socket.on('refreshSystemModules', () => {
//     refreshSystemModules();
//     console.log('refreshSystemModules')

// });