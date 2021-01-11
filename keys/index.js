/*
Documentation

this file exports all keys for our react app

add production keys to prodKeys file
add dev keys to devKeys file

do not use any real keys inside of our code, get them from this file by importing it

*/


if(process.env.NODE_ENV === 'production') {
    //in production | require prod keys
    module.exports = require('./keysProd');
} else {
    //in development mode | require dev keys
    module.exports = require('./keysDev');
}

