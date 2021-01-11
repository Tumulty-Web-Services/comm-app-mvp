/*************************************************************
This file is used to solve errors with development domains
looked for automatically by http-proxy-middleware
localhost:3000 (the client side)
localhost:5000 (the server side)


*** after changing this file the react server must be restarted | cd client then npm start


*************************************************************/

const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    // app.use(proxy('/auth/google', { target: 'http://localhost:5000' }))
    app.use(proxy('/auth/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/auth/*/*', { target: 'http://localhost:5000' }))

    app.use(proxy('/twilio/call/form', { target: 'http://localhost:5000' }))


    app.use(proxy('/api/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/*/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/*/*/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/*/*/*/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/v1/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/v1/*/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/v1/*/*/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/v1/*/*/*/*', { target: 'http://localhost:5000' }))
    


    //socket io
    //these are required for socket io to work
    app.use(proxy('/socket.io', { target: 'http://localhost:4000' }))
    app.use(proxy('/socket.io/*', { target: 'http://localhost:4000' }))

    //may not be necessary but used incase
    app.use(proxy('/socket.io/*/*', { target: 'http://localhost:4000' }))
    

}