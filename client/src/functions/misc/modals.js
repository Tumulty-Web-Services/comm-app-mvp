import Axios from 'axios';
import {CriticalError} from '../misc//errorLogging';
import {createNotificationStandard} from './notifications';
import moment from 'moment';

//show a modal and set up event listeners to hide it
export function createModal(modalId) {

    const modal = document.getElementById(modalId);

    modal.style.display = 'block';
    modal.style.opacity = 1;

    createModalBackground(modalId);

    document
        .body
        .classList
        .add("stop-scrolling");

}

//create holder for appending a modal
export function createDivHolder() {
    var divHolder = document.createElement('div');
    divHolder.id = "aos__modalHolder";
    document
        .body
        .appendChild(divHolder);
}

/***********************************************************************************
Documentation
creates a div with id of #aos__modalBackground to act as the background for a modal
on click of this it will close the modal it was opened with
requires id of the modal it was opened with
***********************************************************************************/
function createModalBackground(modalId) {
    //create background for modal
    var div = document.createElement('div');

    div.id = "aos__modalBackground";

    document
        .body
        .appendChild(div);

    document
        .getElementById('aos__modalBackground')
        .addEventListener('click', function () {
            console.log(`hide`);
            destroyModal()
        });

    var modalDestroyListeners = document.getElementsByClassName("aos__destroyModal");

    for (var i = 0; i < modalDestroyListeners.length; i++) {
        modalDestroyListeners[i].addEventListener('click', () => {
            destroyModal()
        }, false);

    }
}

/************************************************************************************
Documentation

removes the div with the id of #aos__modalBackground
hides a modal with the id passed into it

*********************************************************************************** */

export function destroyModal() {

    var modal = document.getElementById('aos__modalHolder');
    modal
        .parentNode
        .removeChild(modal);

    var background = document.getElementById("aos__modalBackground");
    background
        .parentNode
        .removeChild(background);

    document
        .body
        .classList
        .remove("stop-scrolling");

}

/************************************************************************************
Documentation
this is a legacy model used on old projects us onCreateDeleteModal Instead


returns delete modal Id that can confirm or delete

Example use

**********************
**call function here**
**********************
<i
    onClick={() => {this.onConfirmDelete(user.id, user.name)}}
    className="material-icons text-danger">
    delete
</i>

**********************
** Create The Modal **
**********************
onConfirmDelete(userId, name) {

    const modal= createDeleteModal();

    //run confirmation modal tweaks

    modal.toDeleteId.value = userId;
    modal.title.innerHTML = 'Delete User: <span class="text-danger">'+name+'</span>';
    modal.text.innerHTML = 'Are you sure you wish to delete this user from the Goldfingr system? This cannot be undone.'

    modal.buttonConfirm.addEventListener('click', function () {
        this.onDeleteWasConfirmed()
    }.bind(this));


}
**********************
**   on confirmed   **
**********************
onDeleteWasConfirmed() {

    const id = document.getElementById('aos__toDeleteId').value;
    destroyModal();

    //run delete functionality

}
*************************************************************************************/
export function createDeleteModal() {

    const modalId = 'aos__createDeleteModal';

    var modal = '';
    modal += ' <div id="' + modalId + '" class="aos__modal">';

    modal += '      <div class="aos__modalContainer">';
    modal += '          <div class="aos__modalHeader">';
    modal += '              <h3 id="aos__modalTitle" class="aos__modalTitle"></h3>';
    modal += '          </div>';

    modal += '          <div class="aos__modalBody">';
    modal += '               <p id="aos__modalText"></p>';
    modal += '               <div class="text-right">';
    modal += '                   <button id="aos__modalButtonDestroy" class="aos__destroyModal' +
            ' btn btn-danger">Cancel</button>';
    modal += '                   <button id="aos__modalButtonConfirm" class="btn btn-success">' +
            'Proceed</button>';
    modal += '               </div>';
    modal += '           </div>';
    modal += '      </div>';
    modal += '      <input id="aos__toDeleteId" type="hidden"  />';
    modal += '      <input id="aos__toDeletePrefix" type="hidden"  />';
    modal += '  </div>';

    //create holder for appending div
    createDivHolder();
    document
        .getElementById('aos__modalHolder')
        .innerHTML = modal

    createModal(modalId);

    return {
        modalId,
        modal: document.getElementById(modalId),
        toDeleteId: document.getElementById('aos__toDeleteId'),
        toDeletePrefix: document.getElementById('aos__toDeletePrefix'),
        title: document.getElementById('aos__modalTitle'),
        text: document.getElementById('aos__modalText'),
        buttonDestroy: document.getElementById('aos__modalButtonDestroy'),
        buttonConfirm: document.getElementById('aos__modalButtonConfirm')
    };
}

/*************************************************************************************

createDBSelectModal


creates a modal that will query a database and return and id and name of what
was selected in the modal

Example use

**********************
**call function here**
**********************
onClick={(event) => this.onCompanySearch(event)}

**********************
** Create The Modal **
**********************

onCompanySearch = () => {

    //this.onSearch must be specified under the class functions
    const modal = createDBSelectModal(this.onSearch);

    //set the modals title
    modal.title.innerHTML = 'Search Companies'
}

**********************
**   onSearch       **
**********************

this function is called whenever the input that is created in the modal has a key stroke pressed
make a call to an outside database and display all results inside of resultDiv

//result div is the div to place results
//select button class is given to anything that you can click to fire finish function
//search input is the input you seach in
//fireSelectListeners needs to be called after results are added to screen
onSearch = async (resultDiv, selectButtonsClass, searchInput, fireSelectListeners) => {

    const valueToSet = searchInput.value;
    let resultSet = ''

    //make search call
    if(valueToSet) {
        resultSet = await Axios.get('/v1/company/getall?name=' + valueToSet);
        resultSet = resultSet.data;
    }

    //if input has a value
    if(valueToSet) {

        //if we have results
        if(resultSet[0]) {

            //create search results
            let searchResultsHTML = resultSet.map((company) => {

                let result = '<div class="row" style="padding-top: 15px; padding-bottom: 15px">';

                result += '<div class="col-sm-3">';
                result += '<img src="'+company.picture_url+'" style="width: 100%">';
                result += '<button data-result-name="'+company.name+'" data-id="' + company.id +'" class="'+selectButtonsClass+' btn btn-success btn-block" style="margin-top: 5px" >Select</button>';
                result += '</div>';

                result += '<div class="col-sm-9">';
                result += '<h5 style="margin-top: 0 ">'+company.name+'</h5>';
                result += '<h6>'+company.industry+'</h6>';
                result += '<small>'+company.description.slice(0,150)+'....</small>';

                result += '</div>';

                result += '</div>';

                return result;
            })

            //set results to query set, join array that comes back from mapping
            resultDiv.innerHTML = searchResultsHTML.join('');

        } else { //no results were found | show no results found

            resultDiv.innerHTML = 'no results fund ';

        }

    } else { //search input is empty | set empty result div

        resultDiv.innerHTML = '';

    }

    //must be called to end function
    fireSelectListeners(this.onFinish);

}


**********************
**   onFinish       **
**********************

this function has an id and resultName passed back to it
use it so set state, update a db etc
this is called after a button with the select class specified
under createDBSelectModal() is clicked

//what happens when a button result is choosen
//id is the id of the result choosen aka the data-id
//name is the name of the result choosen, can be any identifier
onFinish = (id, resultName) =>  {

    const newUser = Object.assign({}, this.state.user);
    newUser.companyName = resultName;
    newUser.companyId = id;

    this.setState({user: newUser })
}

***********************************************************************************/

export function createDBSelectModal(onSearch) {

    const modalId = 'createDBSelectModal';

    var modal = '';
    modal += ' <div id="' + modalId + '" class="aos__modal">';

    modal += '    <div class="aos__modalContainer">';
    modal += '         <div class="aos__modalHeader">';
    modal += '             <h3 id="aos__modalTitle" class="aos__modalTitle"></h3>';
    modal += '          </div>';

    modal += '          <div class="aos__modalBody">';
    modal += '              <p id="aos__modalText"></p>';
    modal += '              <input id="aos_modalSearchInput" type="text" class="form-control" ' +
            'placeholder="Search...">';

    modal += '              <div id="aos_resultDiv"></div>';

    modal += '              <div class="text-right" style="margin-top: 10px;">';
    modal += '                      <button id="aos__modalButtonDestroy" class="aos__destroyMo' +
            'dal btn btn-danger">Close</button>';
    modal += '              </div>';

    modal += '          </div>';
    modal += '      </div>';
    modal += '  </div>';

    createDivHolder();
    document
        .getElementById('aos__modalHolder')
        .innerHTML = modal

    createModal(modalId);

    //add event listener for seach
    const input = document.getElementById('aos_modalSearchInput');
    const resultsDiv = document.getElementById('aos_resultDiv');
    const selectButtonsClass = 'aos__selectResultSelect';
    const searchInput = document.getElementById('aos_modalSearchInput');

    //add listeners for on click of .aos__selectResultSelect
    function fireSelectListeners(onFinish) {

        //get all elements with a class of: selectButtonsClass
        var selectElements = document.getElementsByClassName(selectButtonsClass);

        ///old
         //for each elements add the event listener
        //  for (var i = 0; i < selectElements.length; i++) {
        //     selectElements[i].addEventListener('click', (e) => onSelect(e, onFinish), false);
        // }

        //new
        function addListener(element) {
            element.addEventListener('click', (e) => onSelect(e, onFinish), false);
        }


        //for each elements add the event listener
        for (var i = 0; i < selectElements.length; i++) {
            addListener(selectElements[i])
        }

        //when a button given this class is selected
        var onSelect = function (e, onFinsih) {

            //get its data id
            const id = e
                .target
                .getAttribute('data-id');

            //get its result name
            const resultName = e
                .target
                .getAttribute('data-result-name');

            //if we dont have an id to bring back
            if (id === null) {
                CriticalError('Could not read the data-id attribute of the button clicked, please make sure you' +
                        ' have specified it to the id that you want to query for your given object or ite' +
                        'm.');
                return false;
            }

            //fire on finish function
            onFinish(id, resultName);
            //destroy the modal
            destroyModal();

        };

    }

    console.log(resultsDiv)
    console.log(selectButtonsClass)
    console.log(searchInput)
    console.log(fireSelectListeners)
    //run the search lister and display results from
    input.addEventListener('keyup', () => {
        onSearch(resultsDiv, selectButtonsClass, searchInput, fireSelectListeners);
    })

    //return the created modal
    return {
        modalId,
        input,
        resultsDiv: document.getElementById('aos_modalSearchResults'),
        modal: document.getElementById(modalId),
        title: document.getElementById('aos__modalTitle'),
        text: document.getElementById('aos__modalText'),
        buttonDestroy: document.getElementById('aos__modalButtonDestroy')
    };

}

/*
Documentation

this is the new function for creating a delete modal

textHeadline: the headline of the modal to display
textSub: the text in the modal body
urlToDelete is the url we are posting for our function call
rowIdToRemove is the id of the table row that we with to remove it here.

We remove this through plain js as to give a feel of 0 second load time.

//optional
onSuccess = {
    this function is what to do if we successfully delete an object in the database
    as of now we should be splicing out or setting a new state of the mapped object we are renderin gin our table

}

//optional
onFailure = {
    what do do on failure
}

onCreateDeleteModal({
    textHeadline: 'Delete Note: <span className="text-danger text-capitalize">'+name+'</span>',
    textSub: 'Are you sure you wish to delete this note from the system? This cannot be undone.',
    urlToDelete: '/api/project_notes/delete/' + id,
    rowIdToRemove: 'note_' + id,
    onSuccess: () => {

        const toSplice = this.state.project.notes;

        for (let i = 0; i < toSplice.length; i++) {
            const obj = toSplice[i];

            if (obj.id === id) {
                toSplice.splice(i, 1);
            }
        }
    },
    onFailure: () => {
        // optional comment out onFailure if not required
    }
})

*/

/*
Documentation

this creates a modal with an array of field values that can be set to update a database object

input object fields:

{
    id: the id of the object to iupdate
    textHeadline: the headlin text of the modal
    textSub: the modal body text to be shown
    urlToUpdate: the url we are going to send a post request to on proceeding
    fields: [ an array of values that we will render as update fields
        name: the exact name of the object field in the database ex: family_name
        type: either text, textarea, select, or date
        value: a value to set for that input

        ** if type === select
        options[
            an array of values we will render as options for the select
        ]

        ** if type === date
        convertToUnix: true / false should be convert the final value to unix time

        onSuccess(objectUpdated) {
            a function to fire on success of the update
            objectUpdate is the returned object after its been updated
        }

        onFailure(error) {
            a function to fire if we encounter an error
            error is the passed in error object
        }

    ]

}

onCreateUpdateModal({
            id: expectation.id,
            textHeadline: 'Update Expectation: ' + expectation.name,
            textSub: 'Change any fields you wish to update below.',
            urlToUpdate: '/api/project_expectations/update/' + expectation.id,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    value: expectation.name,
                    required: true
                }, {
                    name: 'description',
                    type: 'textarea',
                    value: expectation.description,
                    required: true
                }, {
                    name: 'link',
                    type: 'select',
                    value: expectation.description,
                    required: true,
                    options: [
                        true,
                        false,
                    ]
                }, {
                    name: 'end_unix',
                    type: 'date',
                    value: expectation.end_unix,
                    required: true,
                    convertToUnix: true
                }
            ],
            onSuccess: async () => {
                let project = await Axios({
                    method:'get',
                    url:'/api/v1/projects/find/' + this.props.match.params.project_id,
                })

                project = project.data

                this.setState({project})
            }
        })

*/

export async function onCreateDeleteModal(object) {

    const modalId = 'aos__createDeleteModal';

    var modal = '';
    modal += ' <div id="' + modalId + '" class="aos__modal">';

    modal += '      <div class="aos__modalContainer">';
    modal += '          <div class="aos__modalHeader">';
    modal += '              <h3 id="aos__modalTitle" class="aos__modalTitle">' + object.textHeadline + '</h3>';
    modal += '          </div>';

    modal += '          <div class="aos__modalBody">';
    modal += '               <p id="aos__modalText">' + object.textSub + '</p>';
    modal += '               <div class="text-right">';
    modal += '                   <button id="aos__modalButtonDestroy" class="aos__destroyModal' +
            ' btn btn-danger">Cancel</button>';
    modal += '                   <button id="aos__modalButtonConfirm" class="btn btn-success">' +
            'Proceed</button>';
    modal += '               </div>';
    modal += '           </div>';
    modal += '      </div>';
    modal += '      <input id="aos__toDeleteId" type="hidden"  />';
    modal += '      <input id="aos__toDeletePrefix" type="hidden"  />';
    modal += '  </div>';

    //create holder for appending div
    createDivHolder();

    //set modal html
    document
        .getElementById('aos__modalHolder')
        .innerHTML = modal

    //create the modal
    createModal(modalId);

    //add listen for delete confirmation
    document
        .getElementById('aos__modalButtonConfirm')
        .addEventListener('click', async function () {

            // document.getElementById(object.rowIdToRemove).style.display = 'none'
            // rowToRemove.parentNode.removeChild(rowToRemove);
            destroyModal();

            try {

                //run delete call
                let result = await Axios({method: 'post', url: object.urlToDelete})

                // create notification on success createNotificationStandard('Delete Successful',
                // '<span class="text-success">Successfully Deleted Object: ' + object.id + '
                // </span>', 2000);

                result = result.data;

                console.log(result)

                if (result.success) {
                    if (object.onSuccess) {
                        object.onSuccess();
                    }
                } else {
                    if (object.onFailure) {
                        console.log(result.message)
                        object.onFailure(result.message);
                    }
                }

            } catch (e) {
                console.log(e)
                console.log(object.onFailure)

                // create notification on error createNotificationStandard('Error Deleting',
                // '<span class="text-danger">Error Deleting ' + this.props.match.params.table +
                // ' object: ' + object.id + ' </span>', 2000);

                if (object.onFailure) {
                    object.onFailure(e);
                }

            }

        });

}

export async function onCreateUpdateModal(object) {

    if (!object.fields || object.fields.length === 0) {
        CriticalError('You must add a fields array to onCreateUpdateModal.');
        return false;
    }

    const modalId = 'aos__createUpdateModal';

    var fields = '';

    //loop through fields and add them to the fields variable
    for (let i = 0; i < object.fields.length; i++) {

        let field = object.fields[i];

        if (field.type === 'text') {
            fields += '<p className="text-capitalize">' + field.name + '</p>'
            fields += '<input data-aos-modal-field="true" type="text" value="' + field.value + '" name="' + field.name + '">'
        }

        if (field.type === 'textarea') {
            fields += '<p className="text-capitalize">' + field.name + '</p>'
            fields += '<textarea data-aos-modal-field="true" type="text" value="' + field.value + '" name="' + field.name + '">' + field.value + '</textarea>'
        }

        if (field.type === 'date') {

            let timestamp = field.value

            //convert unix time to a html 5 input readable date
            if (!isNaN(field.value)) {
                timestamp = moment
                    .unix(field.value)
                    .format("YYYY-MM-DD");
            }

            fields += '<p className="text-capitalize">' + field.name + '</p>'
            // fields += '<input  data-aos-modal-field="true" type="date" value="2019-01-02"
            // name="'+field.name+'"></input>'
            fields += '<input  data-aos-modal-field="true" type="date" value="' + timestamp + '" name="' + field.name + '"></input>'
        }

        if (field.type === 'select') {

            if (!field.options || field.options.length === 0) {
                CriticalError('You must add an options array to a select field on onCreateUpdateModal.');
                return false;
            }

            fields += '<p className="text-capitalize">' + field.name + '</p>'
            fields += '<select data-aos-modal-field="true" name="' + field.name + '">';

            //for each field of a select loop though it and create an option
            for (let ii = 0; ii < field.options.length; ii++) {

                let option = field.options[ii];
                if (field.value === option) {
                    fields += '<option selected="true" value="' + option + '" >' + option + '</option>';
                } else {
                    fields += '<option  value="' + option + '" >' + option + '</option>';
                }

            }

            fields += '</select>'
        }

    }

    var modal = '';
    modal += ' <div id="' + modalId + '" class="aos__modal">';

    modal += '      <div class="aos__modalContainer">';
    modal += '          <div class="aos__modalHeader">';
    modal += '              <h3 id="aos__modalTitle" class="aos__modalTitle">' + object.textHeadline + '</h3>';
    modal += '          </div>';

    modal += '          <div class="aos__modalBody">';
    modal += '               <p id="aos__modalText">' + object.textSub + '</p>';
    modal += '                 <div class="aos__modalFields">';

    modal += fields;

    modal += '               </div>';
    modal += '               <div class="text-right">';
    modal += '                   <button id="aos__modalButtonDestroy" class="aos__destroyModal' +
            ' btn btn-danger">Cancel</button>';
    modal += '                   <button id="aos__modalButtonConfirm" class="btn btn-success">' +
            'Proceed</button>';
    modal += '               </div>';
    modal += '           </>';
    modal += '      </div>';
    modal += '      <input id="aos__toUpdateId" type="hidden"  />';
    modal += '      <input id="aos__toUpdatePrefix" type="hidden"  />';
    modal += '  </div>';

    //create holder for appending div
    createDivHolder();

    //set modal html
    document
        .getElementById('aos__modalHolder')
        .innerHTML = modal

    //create the modal
    createModal(modalId);

    //add listen for delete confirmation
    document
        .getElementById('aos__modalButtonConfirm')
        .addEventListener('click', async function () {

            let objectToUpdate = {};
            objectToUpdate['id'] = object.id;

            for (let i = 0; i < object.fields.length; i++) {

                let field = object.fields[i];

                if (field.required) {

                    let fieldValue = document
                        .body
                        .querySelector('[data-aos-modal-field="true"][name="' + field.name + '"]')
                        .value;

                    if (!fieldValue) {
                        createNotificationStandard('<span class="text-danger">Error</span>', 'Please add a value for the "' + field.name + '" field.', 2000);
                        return false;
                    }

                    if (field.type === 'date') {
                        if (field.convertToUnix) {
                            fieldValue = moment(fieldValue).unix()
                        }
                    }

                    objectToUpdate[field.name] = fieldValue;

                }

            }

            try {

                destroyModal();

                const updated = await Axios({
                    method: 'post',
                    url: object.urlToUpdate,
                    data: {
                        ...objectToUpdate
                    }
                })

                if (object.onSuccess) {
                    object.onSuccess(updated);
                }

            } catch (e) {

                if (object.onFailure) {
                    object.onFailure(e);
                }

            }

        });

}

/*
Documentation

examplea

sync onDelete(_id, name) {
    deleteWithCallback({

        name,
        object: 'article',
        showNotifications: true,
                    
        delete: async () => {

            return await Axios({
                method:'post',
                url:'/api/articles/delete/' + _id,
            })

        },

        onSuccess: () => { refreshSystemArticles() },

        onFailure: (e) => {}

    })
}

*/
export function deleteWithCallback(settings) {
    

    console.log(settings);

    const modal= createDeleteModal();



    modal.title.innerHTML = 'Delete '+settings.object+': <span className="text-danger">'+settings.name+'</span>';
    modal.text.innerHTML = 'Are you sure you wish to delete the '+settings.object+': "'+settings.name+'" from the system? This cannot be undone.';
   
    modal.buttonConfirm.addEventListener('click', function () {
        runDelete(settings)
    });
    

    const runDelete = async (settings) => {

        console.log(settings)

        try {
            const x = await settings.delete()

            console.log(x)

            if(settings.onSuccess) {
                settings.onSuccess()
            }

            

            if(settings.showNotifications) {
                createNotificationStandard('<span class="text-success">Delete Successful</span>', 'Successfully deleted '+settings.object+'. ', 2000);
            }

        } catch(e) {
            if(settings.onFailure) {
                settings.onFailure(e)
            }

           

            if(settings.showNotifications) {
                createNotificationStandard('<span class="text-danger">Error Deleting </span>', 'Error deleting article please contact support');
            }
            
        }

        destroyModal();
        
        
        

    }

       
       

}