export function getExampleData(column_name, data_type) {

    let example = '';
   
    if(column_name === 'family_name') {

        example = 'John';

    } else if(column_name === 'name') {

        example = 'My Awesome Name';

    } else if(column_name === 'given_name') {

        example = 'Doe';

    } else if(column_name === 'picture_url') {

        example = 'https://lh3.googleusercontent.com/-FyZ1u8gn8mU/AAAAAAAAAAI/AAAAAAAAAAd/YPLtTV1T57E/s50/photo.jpg';

    } else if(column_name === 'email') {

        example = 'johndoe@gmail.com';

    } else if(column_name === 'phone') {

        example = '5555555555';

    } else if(column_name === 'address_line_1') {

        example = '23 New York Ave';

    } else if(column_name === 'city') {

        example = 'Manhattan';

    } else if(column_name === 'state') {

        example = 'New York';

    }  else if(column_name === 'country') {

        example = 'USA';

    } else if(column_name === 'postal_code') {

        example = '12345';

    } else if(column_name === 'company_id') {

        example = 1;

    } else if(column_name === 'website') {

        example = 'johndoe.com';

    } else if(column_name === 'google_id') {

        example = '23423jsdf......';

    } else if(column_name === 'facebook_id') {

        example = 'jhashdflkasdf......';

    } else if(column_name === 'linkedin_id') {

        example = '8jasdf6......';

    } else if(column_name === 'paid') {

        example = true;

    } else if(column_name === 'referred_by') {

        example = 126;

    } else if(column_name === 'member_tier') {

        example = 30;

    } else if(column_name === 'created_at') {

        example = 1552601970;

    } else if(column_name === 'updated_at') {

        example = 1552901970;

    } else if(column_name === 'last_login') {

        example = 1552901970;

    } else if(column_name === 'name') {

        example = 'my awesome nae';

    } else if(column_name === '_id') {

        example = '5ce5609ab32e53f6ac98508f';

    } else if(column_name === 'name') {

        example = 'my awesome nae';

    } else if(data_type === 'boolean') {

        example = true;

    }  else if(data_type === 'String') {

        example = 'STRING';

    } else if(data_type === 'Number') {

        example = 'INTEGER';

    } else if(data_type === 'ObjectID') {

        example = 'OBJECT_ID';

    } else {

        example = null;

    }

    return example;

  }