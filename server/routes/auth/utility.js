const passport = require('passport');

module.exports = (app) => {

    
    //logout a user who was logged in through passport
    app.get('/api/logout', (req, res) => {
        //logout a user
        req.logout();
        res.redirect('/login');
    });

    //return a users info if they are logged in
    app.get('/api/current_user', (req, res) => { 

        res.send(req.user) 
    });
    


   
    

 
};

         