const buildResponse = require('../utils/buildResponse');
module.exports.handler = (event) => {
    return new Promise(async (resolve, reject) => {
        try{
            const token = event.requestContext.authorizer.token;
            const cookie= `jwt=${token}; path=/; Expires=Wed, 21 Oct 2015 07:28:00 GMT; HttpOnly`;
            const response = buildResponse(200,{},cookie);
            resolve(response);
        } catch(err) {
            console.error('Error in signOut.js function', err);
            const response = buildResponse(500, {error: err.message});
            reject(response);
        }
    });
};