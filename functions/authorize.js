const authorizer = require('../utils/authorizer');
const getCookie = require('../utils/getCookie');

module.exports.handler = async (event, context, callback) => {
    try{
        console.log("Cookie Header", event.headers.Cookie);
        const token = getCookie(event.headers.Cookie, 'jwt');
        console.log("Token Cookie", token);
        const chunk = event.methodArn.substr(0, event.methodArn.indexOf('/'));
        const resource = `${chunk}/*`;
        const policy =  authorizer.generatePolicy(token,resource);
        callback(null,policy);
    }catch(err){
        console.error('Error in authorize.js function', err);
        callback(err.message);
    }
};