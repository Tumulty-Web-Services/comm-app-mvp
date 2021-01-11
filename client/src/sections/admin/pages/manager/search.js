/*
Documentation

this function goes through a table object and returns values that we want to add to our search function
this process manual to reduce load times and increase search accuracy

*/
export function getSearchArray(object) {


    let possibleFilters = []    

    if(object) {
        if (object.hasOwnProperty('family_name')) {
            possibleFilters.push('family_name');
        }
    
        if (object.hasOwnProperty('givenName')) {
            possibleFilters.push('givenName');
        }
    
        if (object.hasOwnProperty('email')) {
            possibleFilters.push('email');
        }
    
        if (object.hasOwnProperty('phone')) {
            possibleFilters.push('phone');
        }
    
        if (object.hasOwnProperty('name')) {
            possibleFilters.push('name');
        }
    
        if (object.hasOwnProperty('text')) {
            possibleFilters.push('text');
        }
    
        if (object.hasOwnProperty('amount')) {
            possibleFilters.push('amount');
        }

    }

    //add id as a fallback to search for
    possibleFilters.push('id')

    return(possibleFilters)

}

/*
Documentation

This function return the placeholder of our table for easy user searchability

*/
export function getSearchPlaceholder (array) {

    let searchPlaceholder = 'Search By ';

    if(array.includes('family_name') || array.includes('givenName') || array.includes('name')) {
        searchPlaceholder += (searchPlaceholder === 'Search By ') ?  'Name' : ', Name'
    }

    if(array.includes('email')) {
        searchPlaceholder += (searchPlaceholder === 'Search By ') ?  'Email' : ', Email'
    }

    if(array.includes('phone')) {
        searchPlaceholder += (searchPlaceholder === 'Search By ') ?  'Phone' : ', Phone'
    }

    if(array.includes('text')) {
        searchPlaceholder += (searchPlaceholder === 'Search By ') ?  'Text' : ', Text'
    }

    if(array.includes('amount')) {
        searchPlaceholder += (searchPlaceholder === 'Search By ') ?  'Amount' : ', Amount'
    }

    if(array.includes('id')) {
        searchPlaceholder += (searchPlaceholder === 'Search By ') ?  'ID' : ', ID'
    }

    return searchPlaceholder;

}