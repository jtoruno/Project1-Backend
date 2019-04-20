const AWS = require('aws-sdk');
const buildResponse = require('../utils/buildResponse');
const Users = require('../model/User');
const users = new Users();
const code = 3450;

module.exports.handler = (event) => {
    return new Promise(async(resolve) => {
        try{
            const body = JSON.parse(event.body)
            const email = body.email

            const userTemp = await users.get({email})
            if(userTemp == undefined){
                response = buildResponse(401,{errorMessage: "User not Exist"});
                resolve(response);
            }
            if(email == undefined){
                response = buildResponse(401,{errorMessage: "Missing Params"});
                resolve(response);
            }
            else{
                const params = {
                    Destination: {
                        ToAddresses: [
                            email,
                        ]
                    },
                    Message: {
                        Body: {
                            Text: {
                                Charset: 'UTF-8',
                                Data: `Code to reset your password :  ${code}`,
                            }
                        },
                        Subject: {
                            Charset: 'UTF-8',
                            Data: 'Reset Password'
                        }
                    },
                    Source: 'r10jtoru@gmail.com',
                };
                const ses = new AWS.SES({ apiVersion: '2010-12-01' });
                const notificationData = await ses.sendEmail(params).promise();
                const response = buildResponse(200, { notificationData });
                resolve(response);
            }
        } catch(err) {
            const response = buildResponse(400, {error : err.message})
            resolve(response)
        }
    })
}