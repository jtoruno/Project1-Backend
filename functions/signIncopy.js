'use strict';
const AWS = require('aws-sdk');
const TABLE_NAME = process.env.USERS_DYNAMODB_TABLE;
const buildResponse = require('../utils/buildResponse');
const Users = require('../model/User');
const userClass = new Users();
const authorizer = require('../utils/authorizer');

module.exports.handler = (event) => {
    return new Promise(async(resolve, reject)=>{
        let response;
        const body = JSON.parse(event.body);
        const email = body.email;
        const password = body.password;
        
        try
        {
            const userTemp = await userClass.get({email});
            if(userTemp.password == password){
                const payload = { email };  
                const token = authorizer.generateToken(payload);
                //cookie handler
                const cookieString = `jwt=${token}; path=/; HttpOnly`;
                response = buildResponse(200, {Message: "Correct signIn"}, cookieString);
                resolve(response);
            }
            else{
                response = buildResponse(401,{errorMessage: "Password no match"});
                resolve(response);
            }
        }
        catch(e){
            console.log(e)
            response = buildResponse(400,{ errorMessage: e.message});
            resolve(response)
        }
    });
};