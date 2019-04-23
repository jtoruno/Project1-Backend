'use strict';
const AWS = require('aws-sdk');
const TABLE_NAME = process.env.USERS_DYNAMODB_TABLE;
const buildResponse = require('../utils/buildResponse');
const Users = require('../model/User');
const userClass = new Users();
const authorizer = require('../utils/authorizer');

module.exports.handler = (event) => {
    return new Promise(async(resolve)=>{
        let response;
        const body = JSON.parse(event.body);
        const email = body.email;
        const password = body.password;
        
        try
        {
            const userTemp = await userClass.get({email});
            if(userTemp == undefined){
                response = buildResponse(401,{errorMessage: "User not Exist"});
                resolve(response);
            }
            if(userTemp.password == password && userTemp.admin === true){
                const payload = { email };  
                const token = authorizer.generateToken(payload);
                //cookie handler
                const cookieString = `jwt=${token}; path=/; HttpOnly`;
                response = buildResponse(200, {Message: "Correct admin signIn"}, cookieString);
                resolve(response);
            }
            else{
                response = buildResponse(401,{errorMessage: "Password no match or not admin user"});
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