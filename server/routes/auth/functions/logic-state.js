
runStateLogic = async (user, req, res) => {
    return new Promise( async (resolve, reject) => {

        let toReturn = {
            redirect: ''
        };

        if(user.is_admin) {
            toReturn.redirect = '/admin/dashboard';
      
        } else {
            toReturn.redirect = '/dashboard';
        }
       

        const user_companyId = user.companyId;
        const state = req.query.state

        //if params were sent
        if (state) {
            //get state and split by "|" into an array

            let stateArray = state.split('|');

            //loop through state  array and assign all array values to an object by splitting at "_"
            let reqObject = {};
            for (let i = 0; i < stateArray.length; i++) {

                let property = stateArray[i];
                property = property.split('_')

                reqObject[property[0]] = property[1]

            }

           
            //if we have a redirect param redirect them their else we will redirect below
            if (reqObject.redirect) {
                toReturn.redirect = reqObject.redirect
            }
        }



        resolve(toReturn);

        // res.redirect('/personality-test');

    })

}

module.exports = runStateLogic;