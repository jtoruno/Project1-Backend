const buildResponse = require('../utils/buildResponse');
module.exports.handler = (event) => {
    return new Promise(async (resolve, reject) => {
        try{
            const uid = event.requestContext.authorizer.uid;
            const response = buildResponse(200, { uid });
            resolve(response);
        } catch(err) {
            console.error('Error in getSession.js function', err);
            const response = buildResponse(500, {error: err.message});
            reject(response);
        }
    });
};