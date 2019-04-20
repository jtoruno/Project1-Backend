'use strict';
const jwt = require('jsonwebtoken');
const KEY = 'randomkey';

module.exports.generatePolicy = (token, methodArn) => {
    const payload = this.decodeToken(token);
    if(payload != null) {
        return generatePolicy('user', 'Allow', methodArn, payload, token);

    } else {
        const error = new Error('Unauthorized');
        throw error;
    }
};

module.exports.generateToken = jsonToSign => {
    var token = jwt.sign(jsonToSign, KEY);
    return token;
};

module.exports.decodeToken = token => {
    try {
        let decoded = jwt.verify(token, KEY);
        return decoded;
    } catch(error){
        return null;
    }
};


const generatePolicy = (principalId, effect, resource, payload, token) => {
    let authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        let policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        let statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        uid: payload.user,
        token
    };
    return authResponse;
};